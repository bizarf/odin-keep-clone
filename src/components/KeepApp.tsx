import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
} from "firebase/firestore";
import { app } from "./firebaseSetup";
import Header from "./Header";
import Nav from "./Nav";
import Notes from "./Notes";
import Reminders from "./Reminders";
import Archive from "./Archive";
import Trash from "./Trash";
import NoteEditor from "./NoteEditor";
import { User } from "../App";

type Props = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type NotesType = {
    title: string | undefined;
    noteContent: string | undefined;
    isPinned: boolean;
    isArchived: boolean;
    isTrash: boolean;
};

const KeepApp = ({ user, setUser }: Props) => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const navigate = useNavigate();

    const [notes, setNotes] = useState<NotesType[]>([]);

    const addNote = (
        title: string | undefined,
        noteContent: string | undefined,
        isPinned: boolean,
        isArchived: boolean,
        isTrash: boolean
    ) => {
        const newNote = {
            title: title,
            noteContent: noteContent,
            isPinned: isPinned,
            isArchived: isArchived,
            isTrash: isTrash,
        };
        if (title != "" && noteContent != "") {
            setNotes([...notes, newNote]);
        }

        if (
            (title === "" && noteContent != "") ||
            (title != "" && noteContent === "")
        ) {
            setNotes([...notes, newNote]);
        }
    };

    const pinNote = (index: number, pin: boolean) => {
        const updatedNotes = notes.map((note, i) => {
            if (i === index && !pin) {
                note.isPinned = true;
                if (note.isArchived) {
                    note.isArchived = false;
                }
                return note;
            } else if (i === index && pin) {
                note.isPinned = false;
                return note;
            } else {
                return note;
            }
        });
        setNotes([...updatedNotes]);
    };

    const [theme, setTheme] = useState("light");
    // useEffect to get the theme setting from localstorage on render
    useEffect(() => {
        const localStorageTheme = localStorage.getItem("theme");
        if (localStorageTheme === "light" || localStorageTheme === null) {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }, []);

    const [gridView, setGridView] = useState(true);

    const [mainMenuOpen, setMainMenuOpen] = useState(true);
    const [noteComposerOpen, setNoteComposerOpen] = useState(false);
    const [editNote, setEditNote] = useState(false);

    const [currentNote, setCurrentNote] = useState<
        | {
              title: string | undefined;
              noteContent: string | undefined;
              isPinned: boolean;
              isArchived: boolean;
              isTrash: boolean;
          }
        | undefined
    >();
    const [currentIndex, setCurrentIndex] = useState(0);

    const editNoteBtn = (
        note: {
            title: string | undefined;
            noteContent: string | undefined;
            isPinned: boolean;
            isArchived: boolean;
            isTrash: boolean;
        },
        index: number
    ) => {
        setCurrentNote(note);
        setCurrentIndex(index);
        setEditNote((state) => !state);
    };

    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const refreshBtn = () => {
        setDataFetched((state) => !state);
        fetchUserData();
    };

    // firebase stuff
    useEffect(() => {
        // if user is logged in, then send the data to the user state. if not then send them back to the splash page.
        if (user?.uid != "demo" && user === null) {
            onAuthStateChanged(auth, (googleUser) => {
                if (googleUser) {
                    setUser(googleUser);
                    // fetchUserData();
                } else {
                    navigate("../");
                }
            });
        }
    }, []);

    // safeguard to prevent blank array being saved before firestore data is fetched
    const [dataFetched, setDataFetched] = useState(false);

    const fetchUserData = async () => {
        if (user) {
            const docRef = doc(db, "keep-data", `${user?.uid}`);
            const docSnap = await getDoc(docRef);
            setLoadingSpinner((state) => !state);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                // console.log(docSnap.data().notes);
                setNotes([...docSnap.data().notes]);
                setTimeout(() => setLoadingSpinner((state) => !state), 1000);
                setDataFetched((state) => !state);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                // create a new document that uses the user's google uid
                await setDoc(doc(collection(db, "keep-data"), `${user?.uid}`), {
                    notes: notes,
                });
                setTimeout(() => setLoadingSpinner((state) => !state), 1000);
                setDataFetched((state) => !state);
            }
        }
    };

    useEffect(() => {
        console.log(user);
        // as soon as the user state is changed, we'll fetch firestore data
        if (user != null && user?.uid != "demo") {
            fetchUserData();
        }
    }, [user]);

    // whenever the notes array is update, we'll write to firestore
    useEffect(() => {
        const saveDataToFirestore = async () => {
            await setDoc(doc(collection(db, "keep-data"), `${user?.uid}`), {
                notes: notes,
            });
        };

        // function will only work if the user is logged in
        if (user != null && dataFetched) {
            // I'm not allowing the demo data to be stored on firestore
            if (user.uid != "demo") {
                saveDataToFirestore().catch(console.error);
            }
        }
    }, [notes]);

    return (
        <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
            <Header
                gridView={gridView}
                setGridView={setGridView}
                user={user}
                setMainMenuOpen={setMainMenuOpen}
                theme={theme}
                setTheme={setTheme}
                setUser={setUser}
                refreshBtn={refreshBtn}
            />
            <Nav mainMenuOpen={mainMenuOpen} theme={theme} />
            <Routes>
                <Route
                    index
                    element={
                        <Notes
                            noteComposerOpen={noteComposerOpen}
                            setNoteComposerOpen={setNoteComposerOpen}
                            notes={notes}
                            setNotes={setNotes}
                            addNote={addNote}
                            editNote={editNote}
                            setEditNote={setEditNote}
                            currentNote={currentNote}
                            setCurrentNote={setCurrentNote}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                            editNoteBtn={editNoteBtn}
                            gridView={gridView}
                            pinNote={pinNote}
                            mainMenuOpen={mainMenuOpen}
                        />
                    }
                />
                <Route
                    path="/reminders"
                    element={
                        <Reminders
                            notes={notes}
                            setNotes={setNotes}
                            noteComposerOpen={noteComposerOpen}
                            setNoteComposerOpen={setNoteComposerOpen}
                            addNote={addNote}
                        />
                    }
                />
                <Route
                    path="/archive"
                    element={
                        <Archive
                            notes={notes}
                            setNotes={setNotes}
                            gridView={gridView}
                            mainMenuOpen={mainMenuOpen}
                            editNote={editNote}
                            setEditNote={setEditNote}
                            editNoteBtn={editNoteBtn}
                            currentNote={currentNote}
                            setCurrentNote={setCurrentNote}
                            currentIndex={currentIndex}
                        />
                    }
                />
                <Route
                    path="/trash"
                    element={
                        <Trash
                            notes={notes}
                            setNotes={setNotes}
                            gridView={gridView}
                            mainMenuOpen={mainMenuOpen}
                        />
                    }
                />
                <Route
                    path="/noteEditor"
                    element={
                        <NoteEditor
                            currentNote={currentNote}
                            currentIndex={currentIndex}
                            setCurrentNote={setCurrentNote}
                            editNote={editNote}
                            setEditNote={setEditNote}
                            notes={notes}
                            setNotes={setNotes}
                        />
                    }
                />
            </Routes>
            {loadingSpinner && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
        </div>
    );
};

export default KeepApp;
