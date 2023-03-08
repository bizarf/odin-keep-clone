import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    onAuthStateChanged,
    getRedirectResult,
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
        //  we use this function to check if the user has logged in after the sign in redirect. if they haven't then we run the google sign in redirect function, otherwise we send the user into the keep app page
        getRedirectResult(auth).then((result) => {
            if (result) {
                navigate("/keep/");
            } else {
                googleSignInRedirect();
            }
        });
    }, []);

    return null;
};

export default SignIn;
