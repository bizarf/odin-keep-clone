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
            <div className="flex flex-col items-center">
                <h3 className="text-xl">Welcome to my Keep Clone app</h3>
                <p>Instructions go here</p>
            </div>
            {/* <Link to={"/keep/"}>
                <button className="btn">Enter</button>
            </Link> */}
            {/* <button onClick={googleSignInRedirect}>google sign in test</button> */}
            {loadingSpinner && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
        </div>
    );
};

export default Splash;
