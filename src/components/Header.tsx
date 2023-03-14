import React, { SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import {
    MdMenu,
    MdLibraryBooks,
    MdRefresh,
    MdOutlineViewAgenda,
    MdGridView,
    MdOutlineSettings,
    MdOutlineSearch,
    MdTask,
} from "react-icons/md";

type Props = {
    gridView: boolean;
    setGridView: React.Dispatch<React.SetStateAction<boolean>>;
    user: {
        accessToken: string;
        auth: object;
        displayName: string;
        email: string;
        emailVerified: boolean;
        isAnonymous: boolean;
        metadata: object;
        phoneNumber: unknown;
        photoURL: string;
        proactiveRefresh: object;
        providerData: Array<object>;
        providerId: string;
        reloadListener: unknown;
        reloadUserInfo: object;
        stsTokenManager: object;
        tenantId: unknown;
        uid: string;
        refreshToken: string;
    } | null;
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
                    // className="tooltip tooltip-bottom before:text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                    // data-tip="Main menu"
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
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black">
                                <span onClick={toggleNoteLayout}>
                                    <MdOutlineViewAgenda className="rounded-2xl text-2xl hover:bg-gray-200" />
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Grid view"
                        >
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black">
                                <span onClick={toggleNoteLayout}>
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
                        // className="tooltip whitespace-pre-line text-xs before:bottom-auto before:left-auto before:-right-20 before:top-[var(--tooltip-offset)] before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                        className="tooltip tooltip-bottom whitespace-pre-line text-start [--tooltip-tail:0px] before:-left-12 before:text-xs"
                        data-tip={`Google account
                        ${user?.displayName}
                        ${user?.email}`}
                    >
                        <button className="btn-sm btn-circle avatar btn hover:bg-slate-100">
                            <div className="rounded-full">
                                <img src={user?.photoURL} alt="user avatar" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
