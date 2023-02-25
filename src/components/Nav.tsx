import React from "react";
import { useNavigate } from "react-router-dom";
import {
    MdLightbulbOutline,
    MdNotificationsNone,
    MdOutlineModeEditOutline,
    MdOutlineArchive,
    MdOutlineDelete,
} from "react-icons/md";

const Nav = () => {
    const navigate = useNavigate();

    const openNotes = () => {
        navigate("./notes");
    };

    const openReminders = () => {
        navigate("./reminders");
    };

    // const openEditLabels = () => {};

    const openArchive = () => {
        navigate("./archive");
    };

    const openTrash = () => {
        navigate("./trash");
    };

    return (
        <div className="bg-red-400 py-2">
            <div
                className="flex items-center rounded-r-3xl py-3 pr-40 pl-4	hover:bg-gray-200"
                onClick={openNotes}
            >
                <MdLightbulbOutline className="text-2xl" />
                <span className="pl-5">Notes</span>
            </div>
            <div
                className="flex items-center rounded-r-3xl py-3 pr-40 pl-4 hover:bg-gray-200"
                onClick={openReminders}
            >
                <MdNotificationsNone className="text-2xl" />
                <span className="pl-5">Reminders</span>
            </div>
            <div className="flex items-center rounded-r-3xl py-3 pr-40 pl-4 hover:bg-gray-200">
                <MdOutlineModeEditOutline className="text-2xl" />
                <span className="pl-5">Edit Labels</span>
            </div>
            <div
                className="flex items-center rounded-r-3xl py-3 pr-40 pl-4 hover:bg-gray-200"
                onClick={openArchive}
            >
                <MdOutlineArchive className="text-2xl" />
                <span className="pl-5">Archive</span>
            </div>
            <div
                className="flex items-center rounded-r-3xl py-3 pr-40 pl-4 hover:bg-gray-200"
                onClick={openTrash}
            >
                <MdOutlineDelete className="text-2xl" />
                <span className="pl-5">Trash</span>
            </div>
        </div>
    );
};

export default Nav;
