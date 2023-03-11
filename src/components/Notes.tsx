import React from "react";
import {
    MdOutlineNotificationAdd,
    MdOutlinePersonAddAlt,
    MdOutlinePalette,
    MdOutlineImage,
    MdOutlineArchive,
    MdOutlineMoreVert,
    MdOutlinePushPin,
    MdPushPin,
} from "react-icons/md";
import NoteComposer from "./NoteComposer";

type Props = {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    notes: {
        title: string | null | undefined;
        noteContent: string | null | undefined;
        isPinned: boolean;
        isArchived: boolean;
        isTrash: boolean;
    }[];
    addNote: (
        title: string | null | undefined,
        noteContent: string | null | undefined,
        isPinned: boolean,
        isArchived: boolean,
        isTrash: boolean
    ) => void;
    moveToTrash: (index: number) => void;
    // deleteNote: (index: number) => void;
};

const Notes = ({ isEdit, setIsEdit, notes, addNote, moveToTrash }: Props) => {
    return (
        <div>
            <NoteComposer
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                addNote={addNote}
            />
            <div className="flex flex-wrap">
                {notes.map(
                    (note, index) =>
                        !note.isTrash && (
                            <div
                                key={index}
                                className="m-2 h-max w-60 border-2 border-solid"
                            >
                                <div className="whitespace-pre-wrap break-all p-3">
                                    <div className="btn-sm btn-circle btn float-right hover:bg-slate-200">
                                        <MdOutlinePushPin className="text-lg" />
                                    </div>
                                    <div className="font-semibold">
                                        {note.title}
                                    </div>
                                    <div>{note.noteContent}</div>
                                </div>
                                <div className="flex justify-evenly">
                                    <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                                        <MdOutlineNotificationAdd className="text-base" />
                                    </button>
                                    <button
                                        className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black disabled:cursor-not-allowed disabled:bg-inherit"
                                        disabled
                                    >
                                        <MdOutlinePersonAddAlt className="text-base" />
                                    </button>
                                    <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                                        <MdOutlinePalette className="text-base" />
                                    </button>
                                    <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                                        <MdOutlineImage className="text-base" />
                                    </button>
                                    <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                                        <MdOutlineArchive className="text-base" />
                                    </button>
                                    <div className="dropdown-end dropdown">
                                        <label
                                            tabIndex={0}
                                            className=" btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black "
                                        >
                                            <MdOutlineMoreVert className="text-base" />
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu w-max bg-base-100 py-2 shadow-lg"
                                        >
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <button
                                                    onClick={() =>
                                                        moveToTrash(index)
                                                    }
                                                    className="text-sm"
                                                >
                                                    Delete note
                                                </button>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <button className="text-sm">
                                                    Add label
                                                </button>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <button className="text-sm">
                                                    Add drawing
                                                </button>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <button className="text-sm">
                                                    Make a copy
                                                </button>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <button className="text-sm">
                                                    Show checkboxes
                                                </button>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <button className="text-sm">
                                                    Copy to Google Docs
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Notes;
