import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash";
import KeepApp from "./components/KeepApp";
import SignIn from "./components/SignIn";

export interface User {
    // accessToken: string;
    // auth: object;
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: object;
    phoneNumber: string | null;
    photoURL: string | null;
    // proactiveRefresh: object;
    providerData: Array<object>;
    providerId: string;
    // reloadListener: unknown;
    // reloadUserInfo: object;
    // stsTokenManager: object;
    tenantId: string | null;
    uid: string;
    refreshToken: string;
}

const App = () => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <div>
            <BrowserRouter basename="odin-keep-clone">
                <Routes>
                    <Route path="/" element={<Splash />} />
                    <Route
                        path="/sign-in"
                        element={<SignIn setUser={setUser} />}
                    />
                    <Route
                        path="/keep/*"
                        element={<KeepApp user={user} setUser={setUser} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
