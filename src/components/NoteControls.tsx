import React from "react";
import {
    MdOutlineNotificationAdd,
    MdOutlinePersonAddAlt,
    MdOutlinePalette,
    MdOutlineImage,
    MdOutlineArchive,
    MdOutlineMoreVert,
    MdOutlinePushPin,
    // MdPushPin,
} from "react-icons/md";

type Props = {
    index: number;
    moveToTrash: (index: number) => void;
};

const NoteControls = ({ index, moveToTrash }: Props) => {
    return (
        <div className="flex justify-evenly opacity-0 hover:opacity-100">
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Remind me"
            >
                <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                    <MdOutlineNotificationAdd className="text-base" />
                </button>
            </div>
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Collaborator"
            >
                <button
                    className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black disabled:cursor-not-allowed disabled:bg-inherit"
                    disabled
                >
                    <MdOutlinePersonAddAlt className="text-base" />
                </button>
            </div>
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Background options"
            >
                <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                    <MdOutlinePalette className="text-base" />
                </button>
            </div>
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Add image"
            >
                <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                    <MdOutlineImage className="text-base" />
                </button>
            </div>
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Archive"
            >
                <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                    <MdOutlineArchive className="text-base" />
                </button>
            </div>
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="More"
            >
                <div className="dropdown-end dropdown">
                    <label
                        tabIndex={0}
                        className=" btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black "
                    >
                        <MdOutlineMoreVert className="text-base" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content w-max bg-base-100 py-2 text-left shadow-lg"
                    >
                        <li
                            className="cursor-pointer py-1 px-4 hover:bg-gray-200"
                            onClick={() => moveToTrash(index)}
                        >
                            <div className="text-sm">Delete note</div>
                        </li>
                        <li className="py-1 px-4 hover:bg-gray-200">
                            <div className="text-sm">Add label</div>
                        </li>
                        <li className="py-1 px-4 hover:bg-gray-200">
                            <div className="text-sm">Add drawing</div>
                        </li>
                        <li className="py-1 px-4 hover:bg-gray-200">
                            <div className="text-sm">Make a copy</div>
                        </li>
                        <li className="py-1 px-4 hover:bg-gray-200">
                            <div className="text-sm">Show checkboxes</div>
                        </li>
                        <li className="py-1 px-4 hover:bg-gray-200">
                            <div className="text-sm">Copy to Google Docs</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NoteControls;
