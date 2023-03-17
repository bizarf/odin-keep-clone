import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebaseSetup";

const SignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const googleSignInRedirect = () => {
        onAuthStateChanged(auth, (user) => {
            // if user is logged in, then send them to the keep app
            if (user) {
                navigate("/keep/");
            } else {
                // custom parameter is to allow the user to select which google account they want to use. if this line is not here, then firestore auth will automatically sign into the last used google account
                provider.setCustomParameters({ prompt: "select_account" });
                signInWithRedirect(auth, provider);
            }
        });
    };

    useEffect(() => {
        // on render, run the google sign in redirect function. this is necessary as after the redirect, this page will re-render again.
        googleSignInRedirect();
    }, []);

    return null;
};

export default SignIn;
