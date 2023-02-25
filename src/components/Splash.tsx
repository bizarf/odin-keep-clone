import React from "react";
import { Link } from "react-router-dom";

const Splash = () => {
    return (
        <div>
            <h3>Splash screen goes here</h3>
            <Link to={"/keep/"}>
                <button>Enter</button>
            </Link>
        </div>
    );
};

export default Splash;
