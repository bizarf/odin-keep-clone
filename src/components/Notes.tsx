import React, { useState } from "react";
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
import NoteEditor from "./NoteEditor";

type Props = {
    noteComposerOpen: boolean;
    setNoteComposerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    notes: {
        title: string | null | undefined;
        noteContent: string | null | undefined;
        isPinned: boolean;
        isArchived: boolean;
        isTrash: boolean;
    }[];
    setNotes: React.Dispatch<
        React.SetStateAction<
            Array<{
                title: string | null | undefined;
                noteContent: string | null | undefined;
                isPinned: boolean;
                isArchived: boolean;
                isTrash: boolean;
            }>
        >
    >;
    addNote: (
        title: string | null | undefined,
        noteContent: string | null | undefined,
        isPinned: boolean,
        isArchived: boolean,
        isTrash: boolean
    ) => void;
    moveToTrash: (index: number) => void;
    editNote: boolean;
    setEditNote: React.Dispatch<React.SetStateAction<boolean>>;
};

const Notes = ({
    noteComposerOpen,
    setNoteComposerOpen,
    notes,
    setNotes,
    addNote,
    moveToTrash,
    editNote,
    setEditNote,
}: Props) => {
    const [currentNote, setCurrentNote] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const editNoteBtn = (note: object, index: number) => {
        setCurrentNote(note);
        setCurrentIndex(index);
        setEditNote((state) => !state);
    };

    return (
        <div>
            <NoteComposer
                noteComposerOpen={noteComposerOpen}
                setNoteComposerOpen={setNoteComposerOpen}
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
                                <div
                                    className="tooltip tooltip-bottom float-right [--tooltip-tail:0px] before:text-xs"
                                    data-tip="Pin note"
                                >
                                    <button
                                        className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black"
                                        onClick={() => console.log("pin")}
                                    >
                                        <MdOutlinePushPin className="text-lg" />
                                    </button>
                                </div>
                                <div
                                    className="cursor-pointer whitespace-pre-wrap break-all p-3"
                                    onClick={() =>
                                        // setEditNote((state) => !state)
                                        editNoteBtn(note, index)
                                    }
                                >
                                    <div className="font-semibold">
                                        {note.title}
                                    </div>
                                    <div>{note.noteContent}</div>
                                </div>
                                <div>
                                    <NoteEditor
                                        currentNote={currentNote}
                                        currentIndex={currentIndex}
                                        setCurrentNote={setCurrentNote}
                                        editNote={editNote}
                                        setEditNote={setEditNote}
                                        notes={notes}
                                        setNotes={setNotes}
                                    />
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
                                            className="dropdown-content w-max bg-base-100 py-2 shadow-lg"
                                        >
                                            <li
                                                className="cursor-pointer py-1 px-4 hover:bg-gray-200"
                                                onClick={() =>
                                                    moveToTrash(index)
                                                }
                                            >
                                                <div className="text-sm">
                                                    Delete note
                                                </div>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <div className="text-sm">
                                                    Add label
                                                </div>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <div className="text-sm">
                                                    Add drawing
                                                </div>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <div className="text-sm">
                                                    Make a copy
                                                </div>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <div className="text-sm">
                                                    Show checkboxes
                                                </div>
                                            </li>
                                            <li className="py-1 px-4 hover:bg-gray-200">
                                                <div className="text-sm">
                                                    Copy to Google Docs
                                                </div>
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
