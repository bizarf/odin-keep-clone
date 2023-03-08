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
};

const Header = ({ gridView, setGridView, user }: Props) => {
    const location = useLocation();

    const toggleNoteLayout = () => {
        setGridView((view) => !view);
    };

    return (
        <div className="col-span-full flex items-center justify-between px-4 shadow-[0_1px_0_1px_rgba(241,245,249,1)]">
            <div className="flex items-center">
                <button className="btn-circle btn border-none bg-inherit text-slate-600 hover:bg-slate-100 hover:text-black ">
                    <MdMenu className="text-2xl" />
                </button>
                {location.pathname === "/keep/notes" && (
                    <div className="flex items-center">
                        <MdLibraryBooks className="text-2xl text-yellow-400" />
                        <div className="text-xl">Keep</div>
                    </div>
                )}
                {location.pathname === "/keep/" && (
                    <div className="flex items-center">
                        <MdLibraryBooks className="text-2xl text-yellow-400" />
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
                    <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black">
                        <MdRefresh className="text-2xl" />
                    </button>
                    {gridView ? (
                        <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black">
                            <span onClick={toggleNoteLayout}>
                                <MdGridView className="rounded-2xl text-2xl hover:bg-gray-200" />
                            </span>
                        </button>
                    ) : (
                        <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black">
                            <span onClick={toggleNoteLayout}>
                                <MdOutlineViewAgenda className="rounded-2xl text-2xl hover:bg-gray-200" />
                            </span>
                        </button>
                    )}
                    <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black">
                        <MdOutlineSettings className="rounded-2xl text-2xl hover:bg-gray-200" />
                    </button>
                </div>
                <div className="flex items-center">
                    <button className="btn-sm btn-circle avatar btn hover:bg-slate-100">
                        <div className="rounded-full">
                            <img src={user?.photoURL} alt="user avatar" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
