import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebaseSetup";

type Props = {
    gridView: boolean;
    setGridView: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setMainMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    refreshBtn: () => void;
};

const Header = ({
    gridView,
    setGridView,
    user,
    setMainMenuOpen,
    theme,
    setTheme,
    setUser,
    refreshBtn,
}: Props) => {
    const location = useLocation();

    const toggleNoteLayout = () => {
        setGridView((view) => !view);
    };

    const toggleMainMenuView = () => {
        setMainMenuOpen((setting) => !setting);
    };

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

    const navigate = useNavigate();

    const googleSignOut = async () => {
        const auth = getAuth(app);
        await signOut(auth)
            .then(() => {
                // set the user state back to null and send the user back to the splash page
                setUser(null);
                navigate("../");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <header className="sticky top-0 col-span-full grid grid-cols-[auto_1fr_auto] items-center justify-between border-b-[1px] border-solid">
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
                        <span className="sr-only">Hamburger menu</span>
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
            <div className="searchBar flex w-8/12 items-center justify-self-center rounded-lg border-[1px] bg-slate-100">
                <button className=" btn-sm btn-circle btn m-2 border-none bg-inherit">
                    <MdOutlineSearch className="text-2xl" />
                </button>
                <label htmlFor="search-input" className="sr-only">
                    Search
                </label>
                <input
                    type="search"
                    placeholder="Search"
                    className="searchBar input w-full rounded-l-none bg-slate-100"
                    id="search-input"
                    aria-label="Search"
                />
            </div>
            <div className="flex items-center">
                <div className="flex p-2 ">
                    <div
                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                        data-tip="Refresh"
                    >
                        <button
                            className="btn-circle btn border-none bg-inherit"
                            onClick={refreshBtn}
                        >
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
                                {/* dark mode toggle */}
                                {theme === "light" ? (
                                    <li
                                        className="py-1 px-4 hover:bg-gray-200"
                                        onClick={() => {
                                            localStorage.setItem(
                                                "theme",
                                                "dark"
                                            );
                                            setTheme("dark");
                                        }}
                                    >
                                        <div className="text-sm">
                                            Enable dark theme
                                        </div>
                                    </li>
                                ) : (
                                    <li
                                        className="py-1 px-4 hover:bg-gray-200"
                                        onClick={() => {
                                            localStorage.setItem(
                                                "theme",
                                                "light"
                                            );
                                            setTheme("light");
                                        }}
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
                        <div className="dropdown-end dropdown">
                            <label
                                tabIndex={0}
                                className="btn-sm btn-circle avatar btn border-none bg-inherit"
                            >
                                <div className="rounded-full">
                                    {user?.photoURL && (
                                        <img
                                            src={user?.photoURL}
                                            alt="user avatar"
                                            referrerPolicy="no-referrer"
                                        />
                                    )}
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content w-max cursor-pointer rounded-2xl bg-base-200 py-2 text-left shadow-inner drop-shadow-lg"
                            >
                                <div className="bg-base-100">
                                    <div className="flex items-center py-1 px-4">
                                        <div className="avatar m-2">
                                            <div className="w-16 rounded-full">
                                                {user?.photoURL && (
                                                    <img
                                                        src={user?.photoURL}
                                                        alt="user avatar"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">{`${user?.displayName}`}</div>
                                            <div className="text-xs">{`${user?.email}`}</div>
                                        </div>
                                    </div>
                                    <div className="divider m-0"></div>
                                    <li className="py-1 px-4 hover:bg-gray-200">
                                        <div className="text-sm">
                                            Add another account
                                        </div>
                                    </li>
                                </div>
                                <li
                                    className="py-1 px-4 hover:bg-gray-200"
                                    onClick={googleSignOut}
                                >
                                    <div className="text-sm">Sign out</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
