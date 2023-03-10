import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth, GoogleAuthProvider } from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    onSnapshot,
} from "firebase/firestore";
import { app } from "./firebaseSetup";
import Header from "./Header";
import Nav from "./Nav";
import Notes from "./Notes";
import Reminders from "./Reminders";
import Archive from "./Archive";
import Trash from "./Trash";

type Props = {
    user: {
        accessToken: string;
        auth: object;
        displayName: string;
        email: string;
        emailVerified: boolean;
        isAnonymous: boolean;
        metadata: object;
        phoneNumber: unknown;
        photoURL: string;
        proactiveRefresh: object;
        providerData: Array<object>;
        providerId: string;
        reloadListener: unknown;
        reloadUserInfo: object;
        stsTokenManager: object;
        tenantId: unknown;
        uid: string;
        refreshToken: string;
    } | null;
    setUser: React.Dispatch<React.SetStateAction<object>>;
};

const KeepApp = ({ user, setUser }: Props) => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const navigate = useNavigate();

    const [notes, setNotes] = useState<
        Array<{
            title: string | null | undefined;
            noteContent: string | null | undefined;
            isPinned: boolean;
            isArchived: boolean;
            isTrash: boolean;
        }>
    >([]);

    const addNote = (
        title: string | null | undefined,
        noteContent: string | null | undefined,
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

    const moveToTrash = (index: number) => {
        const updatedNotes = notes.map((note, i) => {
            if (i === index) {
                note.isTrash = true;
                return note;
            } else {
                return note;
            }
        });
        setNotes([...updatedNotes]);
    };

    const [gridView, setGridView] = useState(true);

    const [isEdit, setIsEdit] = useState(false);

    // firebase stuff
    useEffect(() => {
        // if user is logged in, then send the data to the user state. if not then send them back to the splash page.
        onAuthStateChanged(auth, (googleUser) => {
            if (googleUser) {
                setUser(googleUser);
                // fetchUserData();
            } else {
                navigate("../");
            }
        });
    }, []);

    const fetchUserData = async () => {
        if (user) {
            const docRef = doc(db, "keep-data", `${user?.uid}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                // console.log(docSnap.data().notes);
                setNotes([...docSnap.data().notes]);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                // create a new document that uses the user's google uid
                await setDoc(doc(collection(db, "keep-data"), `${user?.uid}`), {
                    notes: notes,
                });
            }
        }
    };

    useEffect(() => {
        console.log(user);
        if (user?.uid != "demo") {
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
        if (user) {
            if (user.uid != "demo") {
                saveDataToFirestore().catch(console.error);
            }
        }
    }, [notes]);

    return (
        <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
            <Header gridView={gridView} setGridView={setGridView} user={user} />
            <Nav />
            <Routes>
                <Route
                    index
                    element={
                        <Notes
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            notes={notes}
                            addNote={addNote}
                            moveToTrash={moveToTrash}
                        />
                    }
                />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/archive" element={<Archive />} />
                <Route
                    path="/trash"
                    element={<Trash notes={notes} setNotes={setNotes} />}
                />
            </Routes>
        </div>
    );
};

export default KeepApp;
