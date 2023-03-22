import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    MdMenu,
    MdRefresh,
    MdOutlineViewAgenda,
    MdGridView,
    MdOutlineSettings,
    MdOutlineSearch,
    MdTask,
} from "react-icons/md";
import { User } from "../App";

type Props = {
    gridView: boolean;
    setGridView: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setMainMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ gridView, setGridView, user, setMainMenuOpen }: Props) => {
    const location = useLocation();

    const toggleNoteLayout = () => {
        setGridView((view) => !view);
    };

    const toggleMainMenuView = () => {
        setMainMenuOpen((setting) => !setting);
    };

    const [theme, setTheme] = useState("dark");

    // useEffect to handle the dark mode toggle option
    useEffect(() => {
        const themeElement =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            document.querySelector<HTMLElement>(`[data-theme]`)!;

        if (theme === "dark") {
            themeElement.dataset.theme = "dark";
        } else {
            themeElement.dataset.theme = "light";
        }
    }, [theme]);

    return (
        <div className="col-span-full flex items-center justify-between border-b-[1px] border-solid">
            {/* hamburg menu */}
            <div className="flex items-center pl-3">
                <div
                    className="tooltip tooltip-bottom [--tooltip-tail:0px] before:left-3/4 before:text-xs"
                    data-tip="Main menu"
                >
                    <button
                        className="btn-circle btn border-none bg-inherit text-slate-600 hover:bg-slate-200 hover:text-black"
                        onClick={toggleMainMenuView}
                    >
                        <MdMenu className="text-2xl" />
                    </button>
                </div>
                {location.pathname === "/keep/notes" && (
                    <div className="flex items-center">
                        <MdTask className="text-5xl text-yellow-400" />
                        <div className="text-xl">Keep</div>
                    </div>
                )}
                {location.pathname === "/keep/" && (
                    <div className="flex items-center">
                        <MdTask className="text-5xl text-yellow-400" />
                        <div className="text-xl">Keep</div>
                    </div>
                )}
                {location.pathname === "/keep/reminders" && (
                    <div className="text-xl">Reminders</div>
                )}
                {location.pathname === "/keep/archive" && (
                    <div className="text-xl">Archive</div>
                )}
                {location.pathname === "/keep/trash" && (
                    <div className="text-xl">Trash</div>
                )}
            </div>
            {/* search bar. non-functioning */}
            <div className="input-group-md input-group flex justify-center">
                <div>
                    <button className="btn-circle btn">
                        <MdOutlineSearch className="text-2xl" />
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="input w-1/2 bg-slate-200"
                />
            </div>
            <div className="flex items-center">
                <div className="flex p-2 ">
                    <div
                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                        data-tip="Refresh"
                    >
                        <button className="btn-circle btn border-none bg-inherit">
                            <MdRefresh className="text-2xl" />
                        </button>
                    </div>
                    {/* note layout controls */}
                    {gridView ? (
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="List view"
                        >
                            <button
                                className="btn-circle btn border-none bg-inherit"
                                onClick={toggleNoteLayout}
                            >
                                <MdOutlineViewAgenda className="rounded-2xl text-2xl" />
                            </button>
                        </div>
                    ) : (
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Grid view"
                        >
                            <button
                                className="btn-circle btn border-none bg-inherit"
                                onClick={toggleNoteLayout}
                            >
                                <MdGridView className="rounded-2xl text-2xl" />
                            </button>
                        </div>
                    )}
                    {/* settings area */}
                    <div
                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                        data-tip="Settings"
                    >
                        <div className="dropdown-end dropdown">
                            <label
                                tabIndex={0}
                                className="btn-circle btn border-none bg-inherit"
                            >
                                <MdOutlineSettings className="rounded-2xl text-2xl" />
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content w-max cursor-pointer bg-base-100 py-2 text-left shadow-inner drop-shadow-lg"
                            >
                                <li className="py-1 px-4 hover:bg-gray-200">
                                    <div className="text-sm">Settings</div>
                                </li>
                                {theme === "light" ? (
                                    <li
                                        className="py-1 px-4 hover:bg-gray-200"
                                        onClick={() => setTheme("dark")}
                                    >
                                        <div className="text-sm">
                                            Enable dark theme
                                        </div>
                                    </li>
                                ) : (
                                    <li
                                        className="py-1 px-4 hover:bg-gray-200"
                                        onClick={() => setTheme("light")}
                                    >
                                        <div className="text-sm">
                                            Disable dark theme
                                        </div>
                                    </li>
                                )}
                                <li className="py-1 px-4 hover:bg-gray-200">
                                    <div className="text-sm">Send feedback</div>
                                </li>
                                <li className="py-1 px-4 hover:bg-gray-200">
                                    <div className="text-sm">Help</div>
                                </li>
                                <li className="py-1 px-4 hover:bg-gray-200">
                                    <div className="text-sm">App downloads</div>
                                </li>
                                <li className="py-1 px-4 hover:bg-gray-200">
                                    <div className="text-sm">
                                        Keyboard shortcuts
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* user avatar area */}
                <div className="flex items-center pr-4">
                    <div
                        className="tooltip tooltip-bottom whitespace-pre-line text-start [--tooltip-tail:0px] before:-left-12 before:text-xs"
                        data-tip={`Google account
                        ${user?.displayName}
                        ${user?.email}`}
                    >
                        <button className="btn-sm btn-circle avatar btn hover:bg-slate-200">
                            <div className="rounded-full">
                                <img
                                    src={user?.photoURL}
                                    alt="user avatar"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
