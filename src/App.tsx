import React, { useState } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash";
import KeepApp from "./components/KeepApp";

export type User = {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: object;
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: Array<object>;
    providerId: string;
    tenantId: string | null;
    uid: string;
    refreshToken: string;
};

const App = () => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <div>
            {/* <BrowserRouter basename="odin-keep-clone"> */}
            {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Splash setUser={setUser} />} />
                    <Route
                        path="/keep/*"
                        element={<KeepApp user={user} setUser={setUser} />}
                    />
                </Routes>
            </HashRouter>
            {/* </BrowserRouter> */}
        </div>
    );
};

export default App;
