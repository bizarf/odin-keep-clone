import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash";
import KeepApp from "./components/KeepApp";

const App = () => {
    return (
        <div>
            <BrowserRouter basename="odin-keep-clone">
                <Routes>
                    <Route path="/" element={<Splash />} />
                    <Route path="/keep/*" element={<KeepApp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
