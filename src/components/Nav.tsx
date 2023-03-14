import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    MdLightbulbOutline,
    MdNotificationsNone,
    MdOutlineModeEditOutline,
    MdOutlineArchive,
    MdOutlineDelete,
} from "react-icons/md";

type Props = {
    mainMenuOpen: boolean;
};

const Nav = ({ mainMenuOpen }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const openNotes = () => {
        navigate("./");
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

    const openTest = () => {
        navigate("./noteEditor");
    };

    useEffect(() => {
        const noteNavLong = document.querySelector("#noteNavLong");
        const remindersNavLong = document.querySelector("#remindersNavLong");
        const archiveNavLong = document.querySelector("#archiveNavLong");
        const trashNavLong = document.querySelector("#trashNavLong");

        const noteNavSmall = document.querySelector("#noteNavSmall");
        const reminderNavSmall = document.querySelector("#reminderNavSmall");
        const archiveNavSmall = document.querySelector("#archiveNavSmall");
        const trashNavSmall = document.querySelector("#trashNavSmall");

        if (mainMenuOpen) {
            noteNavLong?.classList.remove("bg-amber-100");
            remindersNavLong?.classList.remove("bg-amber-100");
            archiveNavLong?.classList.remove("bg-amber-100");
            trashNavLong?.classList.remove("bg-amber-100");
            noteNavLong?.classList.add("hover:bg-gray-200");
            remindersNavLong?.classList.add("hover:bg-gray-200");
            archiveNavLong?.classList.add("hover:bg-gray-200");
            trashNavLong?.classList.add("hover:bg-gray-200");

            switch (location.pathname) {
                case "/keep/":
                    noteNavLong?.classList.add("bg-amber-100");
                    noteNavLong?.classList.remove("hover:bg-gray-200");
                    break;
                case "/keep/reminders":
                    remindersNavLong?.classList.add("bg-amber-100");
                    remindersNavLong?.classList.remove("hover:bg-gray-200");
                    break;
                case "/keep/archive":
                    archiveNavLong?.classList.add("bg-amber-100");
                    archiveNavLong?.classList.remove("hover:bg-gray-200");
                    break;
                case "/keep/trash":
                    trashNavLong?.classList.add("bg-amber-100");
                    trashNavLong?.classList.remove("hover:bg-gray-200");
                    break;
            }
        } else {
            noteNavSmall?.classList.remove("bg-amber-100");
            reminderNavSmall?.classList.remove("bg-amber-100");
            archiveNavSmall?.classList.remove("bg-amber-100");
            trashNavSmall?.classList.remove("bg-amber-100");
            noteNavSmall?.classList.add("bg-inherit");
            reminderNavSmall?.classList.add("bg-inherit");
            archiveNavSmall?.classList.add("bg-inherit");
            trashNavSmall?.classList.add("bg-inherit");
            noteNavSmall?.classList.remove("hover:bg-amber-100");
            reminderNavSmall?.classList.remove("hover:bg-amber-100");
            archiveNavSmall?.classList.remove("hover:bg-amber-100");
            trashNavSmall?.classList.remove("hover:bg-amber-100");
            noteNavSmall?.classList.add("hover:bg-gray-200");
            reminderNavSmall?.classList.add("hover:bg-gray-200");
            archiveNavSmall?.classList.add("hover:bg-gray-200");
            trashNavSmall?.classList.add("hover:bg-gray-200");

            switch (location.pathname) {
                case "/keep/":
                    noteNavSmall?.classList.remove("bg-inherit");
                    noteNavSmall?.classList.add("bg-amber-100");
                    noteNavSmall?.classList.remove("hover:bg-gray-200");
                    noteNavSmall?.classList.add("hover:bg-amber-100");
                    break;
                case "/keep/reminders":
                    reminderNavSmall?.classList.remove("bg-inherit");
                    reminderNavSmall?.classList.add("bg-amber-100");
                    reminderNavSmall?.classList.remove("hover:bg-gray-200");
                    reminderNavSmall?.classList.add("hover:bg-amber-100");
                    break;
                case "/keep/archive":
                    archiveNavSmall?.classList.remove("bg-inherit");
                    archiveNavSmall?.classList.add("bg-amber-100");
                    archiveNavSmall?.classList.remove("hover:bg-gray-200");
                    archiveNavSmall?.classList.add("hover:bg-amber-100");
                    break;
                case "/keep/trash":
                    trashNavSmall?.classList.remove("bg-inherit");
                    trashNavSmall?.classList.add("bg-amber-100");
                    trashNavSmall?.classList.remove("hover:bg-gray-200");
                    trashNavSmall?.classList.add("hover:bg-amber-100");
                    break;
            }
        }
    }, [location.pathname, mainMenuOpen]);

    return (
        <div className="py-2">
            {mainMenuOpen ? (
                <div>
                    <div
                        className="flex cursor-pointer items-center rounded-r-3xl py-3 pr-24 pl-6"
                        onClick={openNotes}
                        id="noteNavLong"
                    >
                        <MdLightbulbOutline className="text-2xl" />
                        <span className="pl-5">Notes</span>
                    </div>
                    <div
                        className="flex cursor-pointer items-center rounded-r-3xl py-3 pr-24 pl-6"
                        onClick={openReminders}
                        id="remindersNavLong"
                    >
                        <MdNotificationsNone className="text-2xl" />
                        <span className="pl-5">Reminders</span>
                    </div>
                    <div className="flex cursor-pointer items-center rounded-r-3xl py-3 pr-24 pl-6 hover:bg-gray-200">
                        <MdOutlineModeEditOutline className="text-2xl" />
                        <span className="pl-5">Edit Labels</span>
                    </div>
                    <div
                        className="flex cursor-pointer items-center rounded-r-3xl py-3 pr-24 pl-6"
                        onClick={openArchive}
                        id="archiveNavLong"
                    >
                        <MdOutlineArchive className="text-2xl" />
                        <span className="pl-5">Archive</span>
                    </div>
                    <div
                        className="flex cursor-pointer items-center rounded-r-3xl py-3 pr-24 pl-6"
                        onClick={openTrash}
                        id="trashNavLong"
                    >
                        <MdOutlineDelete className="text-2xl" />
                        <span className="pl-5">Trash</span>
                    </div>
                    <div
                        className="flex cursor-pointer items-center rounded-r-3xl py-3 pr-24 pl-6"
                        onClick={openTest}
                        id="trashNavLong"
                    >
                        <MdOutlineDelete className="text-2xl" />
                        <span className="pl-5">Note editor test</span>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="pl-3">
                        <div
                            className="btn-circle btn flex items-center border-none text-slate-500"
                            onClick={openNotes}
                            id="noteNavSmall"
                        >
                            <MdLightbulbOutline className="text-2xl" />
                        </div>
                        {/* )} */}
                    </div>
                    <div className="pl-3">
                        <div
                            className="btn-circle btn flex items-center border-none text-slate-500"
                            onClick={openReminders}
                            id="reminderNavSmall"
                        >
                            <MdNotificationsNone className="text-2xl" />
                        </div>
                    </div>
                    <div className="pl-3">
                        <div className="btn-circle btn flex items-center border-none bg-inherit text-slate-500 hover:bg-gray-200">
                            <MdOutlineModeEditOutline className="text-2xl" />
                        </div>
                    </div>
                    <div className="pl-3">
                        <div
                            className="btn-circle btn flex items-center border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black"
                            onClick={openArchive}
                            id="archiveNavSmall"
                        >
                            <MdOutlineArchive className="text-2xl" />
                        </div>
                    </div>
                    <div className="pl-3">
                        <div
                            className="btn-circle btn flex items-center border-none text-slate-500"
                            onClick={openTrash}
                            id="trashNavSmall"
                        >
                            <MdOutlineDelete className="text-2xl" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
