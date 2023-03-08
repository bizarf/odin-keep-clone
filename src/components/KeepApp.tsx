import { React, useState, useEffect } from "react";
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

    useEffect(() => {
        // if user is logged in, then send the data to the user state. if not then send them back to the splash page.
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate("../");
            }
        });
    }, []);

    const [notes, setNotes] = useState<
        Array<{
            title: string | null | undefined;
            noteContent: string | null | undefined;
            isPinned: boolean;
            isArchived: boolean;
        }>
    >([]);

    const addNote = (
        title: string | null | undefined,
        noteContent: string | null | undefined,
        isPinned: boolean,
        isArchived: boolean
    ) => {
        const newNote = {
            title: title,
            noteContent: noteContent,
            isPinned: isPinned,
            isArchived: isArchived,
        };

        setNotes([...notes, newNote]);
    };

    const deleteNote = (index: number) => {
        const updatedNotes = notes;
        updatedNotes.splice(index, 1);
        setNotes([...updatedNotes]);
    };

    const [gridView, setGridView] = useState(true);

    const [isEdit, setIsEdit] = useState(false);

    const fetchUserData = async () => {
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
    };

    useEffect(() => {
        console.log(user);
        fetchUserData();
    }, [user]);

    // whenever the notes array is update, we'll write to firestore
    useEffect(() => {
        setDoc(doc(collection(db, "keep-data"), `${user?.uid}`), {
            notes: notes,
        });
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
                            deleteNote={deleteNote}
                        />
                    }
                />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/trash" element={<Trash />} />
            </Routes>
        </div>
    );
};

export default KeepApp;
