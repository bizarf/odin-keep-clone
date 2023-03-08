import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
// import { googleSignOut } from "./google_auth";
import { app } from "./firebaseSetup";

const Splash = () => {
    const googleSignOut = () => {
        const auth = getAuth(app);
        signOut(auth)
            .then(() => {
                console.log("signed out");
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error);
                // An error happened.
            });
    };

    return (
        <div>
            <h3>Splash screen goes here</h3>
            <Link to={"/keep/"}>
                <button className="btn">Enter</button>
            </Link>
            <Link to={"/sign-in/"}>
                <button className="btn">Sign in test 2</button>
            </Link>
            <button onClick={googleSignOut} className="btn">
                sign out
            </button>
        </div>
    );
};

export default Splash;
