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

    return (
        <div className="py-2">
            {mainMenuOpen ? (
                <div>
                    <div
                        className="flex items-center rounded-r-3xl py-3 pr-32 pl-6	hover:bg-gray-200"
                        onClick={openNotes}
                    >
                        <MdLightbulbOutline className="text-2xl" />
                        <span className="pl-5">Notes</span>
                    </div>
                    <div
                        className="flex items-center rounded-r-3xl py-3 pr-32 pl-6 hover:bg-gray-200"
                        onClick={openReminders}
                    >
                        <MdNotificationsNone className="text-2xl" />
                        <span className="pl-5">Reminders</span>
                    </div>
                    <div className="flex items-center rounded-r-3xl py-3 pr-32 pl-6 hover:bg-gray-200">
                        <MdOutlineModeEditOutline className="text-2xl" />
                        <span className="pl-5">Edit Labels</span>
                    </div>
                    <div
                        className="flex items-center rounded-r-3xl py-3 pr-32 pl-6 hover:bg-gray-200"
                        onClick={openArchive}
                    >
                        <MdOutlineArchive className="text-2xl" />
                        <span className="pl-5">Archive</span>
                    </div>
                    <div
                        className="flex items-center rounded-r-3xl py-3 pr-32 pl-6 hover:bg-gray-200"
                        onClick={openTrash}
                    >
                        <MdOutlineDelete className="text-2xl" />
                        <span className="pl-5">Trash</span>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="pl-3">
                        {location.pathname === "/keep/" ? (
                            <div
                                className="btn-circle btn flex items-center bg-amber-100"
                                onClick={openNotes}
                            >
                                <MdLightbulbOutline className="text-2xl" />
                            </div>
                        ) : (
                            <div
                                className="btn-circle btn flex items-center"
                                onClick={openNotes}
                            >
                                <MdLightbulbOutline className="text-2xl" />
                            </div>
                        )}
                        {/* {location.pathname === "/keep/notes" ? (
                            <div
                                className="btn-circle btn flex items-center bg-amber-100"
                                onClick={openNotes}
                            >
                                <MdLightbulbOutline className="text-2xl" />
                            </div>
                        ) : (
                            <div
                                className="btn-circle btn flex items-center"
                                onClick={openNotes}
                            >
                                <MdLightbulbOutline className="text-2xl" />
                            </div>
                        )} */}
                    </div>
                    <div className="pl-3">
                        {location.pathname === "/keep/reminders" ? (
                            <div
                                className="btn-circle btn flex items-center bg-amber-100"
                                onClick={openReminders}
                            >
                                <MdNotificationsNone className="text-2xl" />
                            </div>
                        ) : (
                            <div
                                className="btn-circle btn flex items-center"
                                onClick={openReminders}
                            >
                                <MdNotificationsNone className="text-2xl" />
                            </div>
                        )}
                    </div>
                    <div className="pl-3">
                        <div className="btn-circle btn flex items-center">
                            <MdOutlineModeEditOutline className="text-2xl" />
                        </div>
                    </div>
                    <div className="pl-3">
                        {location.pathname === "/keep/archive" ? (
                            <div
                                className="btn-circle btn flex items-center bg-amber-100"
                                onClick={openArchive}
                            >
                                <MdOutlineArchive className="text-2xl" />
                            </div>
                        ) : (
                            <div
                                className="btn-circle btn flex items-center"
                                onClick={openArchive}
                            >
                                <MdOutlineArchive className="text-2xl" />
                            </div>
                        )}
                    </div>
                    <div className="pl-3">
                        {location.pathname === "/keep/trash" ? (
                            <div
                                className="btn-circle btn flex items-center bg-amber-100"
                                onClick={openTrash}
                            >
                                <MdOutlineDelete className="text-2xl" />
                            </div>
                        ) : (
                            <div
                                className="btn-circle btn flex items-center"
                                onClick={openTrash}
                            >
                                <MdOutlineDelete className="text-2xl" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
