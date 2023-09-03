import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    signInWithPopup,
} from "firebase/auth";
import { app } from "./firebaseSetup";
import { User } from "../App";
// import workspaceImage from "../assets/workspace.jpg";
import { FaGithub } from "react-icons/fa";
import keepCloneNoteScreenshot from "../assets/keep-clone-note.webp";
import keepCloneComposerScreenshot from "../assets/keep-clone-note-composer.webp";
import keepCloneEditorScreenshot from "../assets/keep-clone-note-editor.webp";
import keepCloneArchiveScreenshot from "../assets/keep-clone-note-archive.webp";
import keepCloneListDarkScreenshot from "../assets/keep-clone-note-list-dark.webp";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const Splash = ({ setUser }: Props) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    // this function works on chrome, but not on firefox
    // const googleSignInRedirect = () => {
    // if the user is already logged in, then we will send them to the main app. if not then we run the google sign in with redirect function
    // if (auth.currentUser) {
    //     navigate("/keep/");
    // } else {
    // this custom parameter allows prompt users to select which google account to log into. The account that had logged in previously will auto login if this parameter is not provided.
    //         provider.setCustomParameters({ prompt: "select_account" });
    //         signInWithRedirect(auth, provider);
    //     }
    // };

    // best sign in method for browsers that block third party cookies
    const googleSignInPopup = async () => {
        if (auth.currentUser) {
            navigate("/keep/");
        } else {
            provider.setCustomParameters({ prompt: "select_account" });
            signInWithPopup(auth, provider).then((result) => {
                if (result) {
                    setLoadingSpinner((state) => !state);
                    setTimeout(() => navigate("/keep/"), 1000);
                }
            });
        }
    };

    // useEffect(() => {
    // after the redirect sign in happens, the app mounts again so this code section will run. we check with auth to see with there is any result. if there is, then we'll send the user to the app.
    //     getRedirectResult(auth).then((result) => {
    //         if (result) {
    //             setLoadingSpinner((state) => !state);
    //             setTimeout(() => navigate("/keep/"), 1000);
    //         }
    //     });
    // }, []);

    const [loadingSpinner, setLoadingSpinner] = useState(false);

    const demoUser = {
        displayName: "demo",
        email: "demo@demo.com",
        emailVerified: false,
        isAnonymous: false,
        metadata: { demo: "demo" },
        phoneNumber: "0",
        photoURL: "../assets/demo-avatar.webp",
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
            <header className="sticky top-0 z-20 flex justify-between">
                <div className="relative left-4 top-2 text-3xl text-white">
                    Keep Clone
                </div>
                <Link to={"https://github.com/bizarf"}>
                    <FaGithub
                        className="relative right-4 top-2 text-3xl text-white"
                        aria-hidden
                        focusable
                    />
                    <span className="sr-only">Bizarf&apos;s Github page</span>
                </Link>
            </header>
            <section
                className={`relative -mt-12 h-[32rem] w-full bg-[url('./assets/workspace.webp')] bg-cover`}
            >
                <div className="absolute left-10 top-44 z-10 w-80 sm:left-40 sm:w-6/12 md:left-56 lg:left-64">
                    <h1 className="text-3xl text-white md:text-4xl lg:text-5xl">
                        Save your thoughts, wherever you are
                    </h1>
                    <div className="mt-6">
                        <button
                            className="btn mr-6 rounded-sm border-0 !bg-blue-600 !text-white shadow-sm shadow-black"
                            onClick={handleDemoLogin}
                        >
                            Demo mode
                        </button>
                        <button
                            className="btn rounded-sm border-0 !bg-blue-600 !text-white shadow-sm shadow-black"
                            onClick={googleSignInPopup}
                        >
                            Google sign in
                        </button>
                    </div>
                </div>
            </section>
            <section className="mt-12">
                <h2 className="mb-6 text-center text-xl font-bold">
                    Welcome to my Keep Clone app!
                </h2>
                <div className="mx-3 flex flex-col sm:mx-11 md:flex-row md:justify-between">
                    <div>
                        <p>
                            This is a project to demonstrate all the skills I
                            have learned so far from studying with The Odin
                            Project by recreating a website as close as
                            possible.
                        </p>
                        <div className="mt-6">
                            <h3 className="text-lg font-bold">
                                Tools and technologies used:
                            </h3>
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
                            <h3 className="text-lg font-bold">
                                What&#39;s implemented:
                            </h3>
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
                            <h3 className="text-lg font-bold">
                                What hasn&#39;t been implemented:
                            </h3>
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
                    <Carousel
                        className="mt-4 h-fit border-2 md:mt-0 md:w-1/2 md:min-w-[50%]"
                        infiniteLoop
                    >
                        <div className="carousel-item relative w-full">
                            <img src={keepCloneNoteScreenshot} alt="" />
                            <a
                                href={keepCloneNoteScreenshot}
                                className="legend"
                            >
                                Preview of the note area
                            </a>
                        </div>
                        <div className="carousel-item relative w-full">
                            <img src={keepCloneComposerScreenshot} alt="" />
                            <a
                                href={keepCloneComposerScreenshot}
                                className="legend"
                            >
                                Preview of the note composer
                            </a>
                        </div>
                        <div className="carousel-item relative w-full">
                            <img src={keepCloneEditorScreenshot} alt="" />
                            <a
                                href={keepCloneEditorScreenshot}
                                className="legend"
                            >
                                Preview of the note editor
                            </a>
                        </div>
                        <div className="carousel-item relative w-full">
                            <img src={keepCloneArchiveScreenshot} alt="" />
                            <a
                                href={keepCloneArchiveScreenshot}
                                className="legend"
                            >
                                Preview of the archive area
                            </a>
                        </div>
                        <div className="carousel-item relative w-full">
                            <img src={keepCloneListDarkScreenshot} alt="" />
                            <a
                                href={keepCloneListDarkScreenshot}
                                className="legend"
                            >
                                Preview of dark mode support and list viewing
                                mode
                            </a>
                        </div>
                    </Carousel>
                </div>
            </section>
            {loadingSpinner && (
                <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
        </div>
    );
};

export default Splash;
