import React from "react";
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
    theme: string;
};

const Nav = ({ mainMenuOpen, theme }: Props) => {
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

    // button navigation class switching feature
    let noteNavBtnClass = "";
    let remindersNavBtnClass = "";
    let archiveNavBtnClass = "";
    let trashNavBtnClass = "";

    if (theme === "light") {
        if (location.pathname === "/keep/") {
            noteNavBtnClass += " !bg-amber-200";
        } else {
            noteNavBtnClass += " hover:bg-gray-200";
        }

        if (location.pathname === "/keep/reminders") {
            remindersNavBtnClass += " !bg-amber-200";
        } else {
            remindersNavBtnClass += " hover:bg-gray-200";
        }

        if (location.pathname === "/keep/archive") {
            archiveNavBtnClass += " !bg-amber-200";
        } else {
            archiveNavBtnClass += " hover:bg-gray-200";
        }

        if (location.pathname === "/keep/trash") {
            trashNavBtnClass += " !bg-amber-200";
        } else {
            trashNavBtnClass += " hover:bg-gray-200";
        }
    }

    if (theme === "dark") {
        if (location.pathname === "/keep/") {
            noteNavBtnClass += " !bg-amber-900 ";
        } else {
            noteNavBtnClass += " hover:bg-[#E8EAED] hover:!bg-opacity-[0.08]";
        }

        if (location.pathname === "/keep/reminders") {
            remindersNavBtnClass += " !bg-amber-900";
        } else {
            remindersNavBtnClass +=
                " hover:bg-[#E8EAED] hover:!bg-opacity-[0.08]";
        }

        if (location.pathname === "/keep/archive") {
            archiveNavBtnClass += " !bg-amber-900";
        } else {
            archiveNavBtnClass +=
                " hover:bg-[#E8EAED] hover:!bg-opacity-[0.08]";
        }

        if (location.pathname === "/keep/trash") {
            trashNavBtnClass += " !bg-amber-900";
        } else {
            trashNavBtnClass += " hover:bg-[#E8EAED] hover:!bg-opacity-[0.08]";
        }
    }

    return (
        <nav className="py-2">
            {mainMenuOpen ? (
                <div className="hidden sm:block">
                    <button
                        className={`${noteNavBtnClass} flex w-full cursor-pointer items-center rounded-r-3xl !bg-opacity-50 py-3 pr-24 pl-6`}
                        onClick={openNotes}
                        id="noteNavLong"
                    >
                        <MdLightbulbOutline className="text-2xl" />
                        <span className="pl-5">Notes</span>
                    </button>
                    <button
                        className={`${remindersNavBtnClass} flex w-full cursor-pointer items-center  rounded-r-3xl !bg-opacity-50 py-3 pr-24 pl-6`}
                        onClick={openReminders}
                        id="remindersNavLong"
                    >
                        <MdNotificationsNone className="text-2xl" />
                        <span className="pl-5">Reminders</span>
                    </button>
                    <button className="navEdit--label flex w-full cursor-pointer items-center rounded-r-3xl !bg-opacity-50 py-3 pr-24 pl-6">
                        <MdOutlineModeEditOutline className="text-2xl" />
                        <span className="pl-5">Edit Labels</span>
                    </button>
                    <button
                        className={`${archiveNavBtnClass} flex w-full cursor-pointer items-center rounded-r-3xl !bg-opacity-50 py-3 pr-24 pl-6`}
                        onClick={openArchive}
                        id="archiveNavLong"
                    >
                        <MdOutlineArchive className="text-2xl" />
                        <span className="pl-5">Archive</span>
                    </button>
                    <button
                        className={`${trashNavBtnClass} flex w-full cursor-pointer items-center rounded-r-3xl !bg-opacity-50 py-3 pr-24 pl-6`}
                        onClick={openTrash}
                        id="trashNavLong"
                    >
                        <MdOutlineDelete className="text-2xl" />
                        <span className="pl-5">Trash</span>
                    </button>
                </div>
            ) : (
                <div>
                    <div className="pl-3">
                        <button
                            className={`${noteNavBtnClass} btn-circle btn border-none !bg-opacity-50`}
                            onClick={openNotes}
                            id="noteNavSmall"
                        >
                            <MdLightbulbOutline className="text-2xl" />
                        </button>
                    </div>
                    <div className="pl-3">
                        <button
                            className={`${remindersNavBtnClass} btn-circle btn border-none !bg-opacity-50`}
                            onClick={openReminders}
                            id="reminderNavSmall"
                        >
                            <MdNotificationsNone className="text-2xl" />
                        </button>
                    </div>
                    <div className="pl-3">
                        <button className="btn-circle btn border-none !bg-opacity-50">
                            <MdOutlineModeEditOutline className="text-2xl" />
                        </button>
                    </div>
                    <div className="pl-3">
                        <button
                            className={`${archiveNavBtnClass} btn-circle btn border-none !bg-opacity-50`}
                            onClick={openArchive}
                            id="archiveNavSmall"
                        >
                            <MdOutlineArchive className="text-2xl" />
                        </button>
                    </div>
                    <div className="pl-3">
                        <button
                            className={`${trashNavBtnClass} btn-circle btn border-none !bg-opacity-50`}
                            onClick={openTrash}
                            id="trashNavSmall"
                        >
                            <MdOutlineDelete className="text-2xl" />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;
