import React from "react";
import {
    MdOutlineNotificationAdd,
    MdOutlinePersonAddAlt,
    MdOutlinePalette,
    MdOutlineImage,
    MdOutlineArchive,
    MdOutlineMoreVert,
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
    }[];
    addNote: (
        title: string | null | undefined,
        noteContent: string | null | undefined,
        isPinned: boolean,
        isArchived: boolean
    ) => void;
};

const Notes = ({ isEdit, setIsEdit, notes, addNote }: Props) => {
    return (
        <div>
            <NoteComposer
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                addNote={addNote}
            />
            <div className="flex flex-wrap">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="m-2 h-max w-60 border-2 border-solid"
                    >
                        <div className="whitespace-pre-wrap p-3">
                            <div>{note.title}</div>
                            <div>{note.noteContent}</div>
                        </div>
                        <div className="flex justify-evenly">
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineNotificationAdd className="text-base" />
                            </button>
                            <button
                                className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black disabled:bg-inherit"
                                disabled
                            >
                                <MdOutlinePersonAddAlt className="text-base" />
                            </button>
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlinePalette className="text-base" />
                            </button>
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineImage className="text-base" />
                            </button>
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineArchive className="text-base" />
                            </button>
                            <div className="dropdown-end dropdown">
                                <label
                                    tabIndex={0}
                                    className=" btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black "
                                >
                                    <MdOutlineMoreVert className="text-base" />
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu w-52 bg-base-100 p-2 shadow"
                                >
                                    <li>
                                        <button>Delete note</button>
                                    </li>
                                    <li>
                                        <button>Add label</button>
                                    </li>
                                    <li>
                                        <button>Add drawing</button>
                                    </li>
                                    <li>
                                        <button>Make a copy</button>
                                    </li>
                                    <li>
                                        <button>Show checkboxes</button>
                                    </li>
                                    <li>
                                        <button>Copy to Google Docs</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
