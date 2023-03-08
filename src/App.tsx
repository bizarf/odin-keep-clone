import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash";
import KeepApp from "./components/KeepApp";
import SignIn from "./components/SignIn";

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <div>
            <BrowserRouter basename="odin-keep-clone">
                <Routes>
                    <Route path="/" element={<Splash />} />
                    <Route path="/sign-in" element={<SignIn />} />
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
