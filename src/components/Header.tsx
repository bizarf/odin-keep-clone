import React from "react";
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

    return (
        <div className="col-span-full flex items-center justify-between shadow-[0_1px_0_1px_rgba(241,245,249,1)]">
            <div className="flex items-center pl-3">
                <div
                    className="tooltip tooltip-bottom [--tooltip-tail:0px] before:left-3/4 before:text-xs"
                    data-tip="Main menu"
                >
                    <button
                        className="btn-circle btn border-none bg-inherit text-slate-600 hover:bg-slate-100 hover:text-black"
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
            <div className="input-group-md input-group flex justify-center">
                <button className="btn-circle btn">
                    <MdOutlineSearch className="text-2xl" />
                </button>
                <input
                    type="text"
                    placeholder="Search"
                    className="input w-1/2 bg-slate-100"
                />
            </div>
            <div className="flex items-center">
                <div className="flex p-2 ">
                    <div
                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                        data-tip="Refresh"
                    >
                        <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black">
                            <MdRefresh className="text-2xl" />
                        </button>
                    </div>
                    {gridView ? (
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="List view"
                        >
                            <button
                                className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black"
                                onClick={toggleNoteLayout}
                            >
                                <span>
                                    <MdOutlineViewAgenda className="rounded-2xl text-2xl hover:bg-gray-200" />
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Grid view"
                        >
                            <button
                                className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black"
                                onClick={toggleNoteLayout}
                            >
                                <span>
                                    <MdGridView className="rounded-2xl text-2xl hover:bg-gray-200" />
                                </span>
                            </button>
                        </div>
                    )}
                    <div
                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                        data-tip="Settings"
                    >
                        <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black">
                            <MdOutlineSettings className="rounded-2xl text-2xl hover:bg-gray-200" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center pr-4">
                    <div
                        className="tooltip tooltip-bottom whitespace-pre-line text-start [--tooltip-tail:0px] before:-left-12 before:text-xs"
                        data-tip={`Google account
                        ${user?.displayName}
                        ${user?.email}`}
                    >
                        <button className="btn-sm btn-circle avatar btn hover:bg-slate-100">
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
