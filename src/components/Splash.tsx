import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
} from "firebase/auth";
import { app } from "./firebaseSetup";
import { User } from "../App";
import workspaceImage from "../assets/workspace.jpg";
import { GoMarkGithub } from "react-icons/go";
import keepCloneNoteScreenshot from "../assets/keep-clone-note.png";
import keepCloneComposerScreenshot from "../assets/keep-clone-note-composer.png";
import keepCloneEditorScreenshot from "../assets/keep-clone-note-editor.png";
import keepCloneArchiveScreenshot from "../assets/keep-clone-note-archive.png";
import keepCloneListDarkScreenshot from "../assets/keep-clone-note-list-dark.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const Splash = ({ setUser }: Props) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const googleSignInRedirect = () => {
        // if the user is already logged in, then we will send them to the main app. if not then we run the google sign in with redirect function
        if (auth.currentUser) {
            navigate("/keep/");
        } else {
            // this custom parameter allows prompt users to select which google account to log into. The account that had logged in previously will auto login if this parameter is not provided.
            provider.setCustomParameters({ prompt: "select_account" });
            signInWithRedirect(auth, provider);
        }
    };

    useEffect(() => {
        // after the redirect sign in happens, the app mounts again so this code section will run. we check with auth to see with there is any result. if there is, then we'll send the user to the app.
        getRedirectResult(auth).then((result) => {
            if (result) {
                setLoadingSpinner((state) => !state);
                setTimeout(() => navigate("/keep/"), 1000);
            }
        });
    }, []);

    const [loadingSpinner, setLoadingSpinner] = useState(false);

    const demoUser = {
        displayName: "demo",
        email: "demo@demo.com",
        emailVerified: false,
        isAnonymous: false,
        metadata: { demo: "demo" },
        phoneNumber: "0",
        photoURL: "../assets/demo-avatar.png",
        providerData: [{ demo: "demo" }],
        providerId: "",
        tenantId: "",
        uid: "demo",
        refreshToken: "",
    };

    const handleDemoLogin = () => {
        setUser(demoUser);
        navigate("/keep/");
    };

    return (
        <div>
            <div className="sticky top-0 z-20 flex justify-between">
                <div className="relative top-2 left-4 text-3xl text-white">
                    Keep Clone
                </div>
                <Link to={"https://github.com/bizarf"}>
                    <GoMarkGithub className="relative top-2 right-4 text-3xl text-white" />
                </Link>
            </div>
            <div className="relative -mt-12 h-[32rem] w-full">
                <img
                    src={workspaceImage}
                    alt="header banner image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute top-44 left-64 z-10 w-6/12">
                <h2 className="text-5xl text-white">
                    Save your thoughts, wherever you are
                </h2>
                <div className="mt-6">
                    <button
                        className="btn mr-6 rounded-sm border-0 !bg-blue-500 !text-white shadow-sm shadow-black"
                        onClick={handleDemoLogin}
                    >
                        Demo mode
                    </button>
                    <button
                        className="btn rounded-sm border-0 !bg-blue-500 !text-white shadow-sm shadow-black"
                        onClick={googleSignInRedirect}
                    >
                        Google sign in
                    </button>
                </div>
            </div>
            <div className="mt-12 flex flex-col items-center">
                <h3 className="mb-6 text-xl">Welcome to my Keep Clone app!</h3>
                <div className="mx-11 flex justify-between">
                    <div>
                        <p>
                            This is a project to demonstrate all the skills I
                            have learned so far from studying with The Odin
                            Project by recreating a website as close as
                            possible.
                        </p>
                        <div className="mt-6">
                            <div className="text-lg font-bold">
                                Tools and technologies used:
                            </div>
                            <ul className="list-inside list-disc">
                                <li>React</li>
                                <li>React Router</li>
                                <li>Vite</li>
                                <li>Typescript</li>
                                <li>VS Code</li>
                                <li>Prettier</li>
                                <li>ESlint</li>
                                <li>Vitest</li>
                                <li>Tailwind CSS</li>
                                <li>DaisyUI</li>
                                <li>React Icons</li>
                                <li>
                                    Firebase - Authentication, Firestore
                                    Database
                                </li>
                                <li>react-textarea-autosize</li>
                                <li>react-responsive-carousel</li>
                            </ul>
                        </div>
                        <div className="mt-6">
                            <div className="text-lg font-bold">
                                What&#39;s implemented:
                            </div>
                            <ul className="list-inside list-disc">
                                <li>
                                    Demo mode: Limited, as it doesn&#39;t have
                                    localstorage or persistent state (Redux)
                                    support
                                </li>
                                <li>Google auth sign-in</li>
                                <li>Logout function</li>
                                <li>
                                    Firestore storage: Data is stored in a
                                    Firestore Database
                                </li>
                                <li>Note composing</li>
                                <li>Note editor</li>
                                <li>Archive</li>
                                <li>
                                    Trash: Users can restore notes or
                                    permanently delete notes in this section
                                </li>
                                <li>
                                    Note viewing styles: Notes can be viewed as
                                    a list or in a grid
                                </li>
                                <li>
                                    Refresh feature: Fetches current notes for
                                    that user&#39;s from Firebase database
                                </li>
                                <li>Dark mode toggle</li>
                            </ul>
                        </div>
                        <div className="mt-6">
                            <div className="text-lg font-bold">
                                What hasn&#39;t been implemented:
                            </div>
                            <ul className="list-inside list-disc">
                                <li>Reminders</li>
                                <li>Labeling</li>
                                <li>
                                    Automatic empty of the Trash after seven
                                    days
                                </li>
                                <li>Add image to note</li>
                                <li>Draw a note</li>
                                <li>Background options</li>
                                <li>Undo and redo functions</li>
                                <li>Masonry grid layout</li>
                                <li>Draggable grid</li>
                                <li>
                                    The ability to turn a note into a checklist
                                </li>
                                <li>Search bar functions</li>
                            </ul>
                        </div>
                    </div>
                    <Carousel className="h-fit w-1/2 min-w-[50%] border-2">
                        <div className="carousel-item relative w-full">
                            <img
                                src={keepCloneNoteScreenshot}
                                alt="A screenshot of the note area"
                            />
                        </div>
                        <div className="carousel-item relative w-full">
                            <img
                                src={keepCloneComposerScreenshot}
                                alt="A screenshot of the note area"
                            />
                        </div>
                        <div className="carousel-item relative w-full">
                            <img
                                src={keepCloneEditorScreenshot}
                                alt="A screenshot of the note area"
                            />
                        </div>
                        <div className="carousel-item relative w-full">
                            <img
                                src={keepCloneArchiveScreenshot}
                                alt="A screenshot of the note area"
                            />
                        </div>
                        <div className="carousel-item relative w-full">
                            <img
                                src={keepCloneListDarkScreenshot}
                                alt="A screenshot of the note area"
                            />
                        </div>
                    </Carousel>
                </div>
            </div>
            {loadingSpinner && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
        </div>
    );
};

export default Splash;
