import React from "react";
import {
    MdOutlineNotificationAdd,
    MdOutlinePersonAddAlt,
    MdOutlinePalette,
    MdOutlineImage,
    MdOutlineArchive,
    MdOutlineMoreVert,
    MdOutlineUnarchive,
} from "react-icons/md";
import { NotesType } from "./KeepApp";

type Props = {
    index: number;
    notes: NotesType[];
    setNotes: React.Dispatch<React.SetStateAction<NotesType[]>>;
};

const NoteControls = ({ index, notes, setNotes }: Props) => {
    const moveToTrash = (index: number) => {
        const updatedNotes = notes.map((note, i) => {
            if (i === index) {
                note.isTrash = true;
                if (note.isPinned) {
                    note.isPinned = false;
                }
                if (note.isArchived) {
                    note.isArchived = false;
                }
                return note;
            } else {
                return note;
            }
        });
        setNotes([...updatedNotes]);
    };

    const moveToArchive = (index: number) => {
        const updatedNotes = notes.map((note, i) => {
            if (i === index) {
                note.isArchived = true;
                if (note.isPinned) {
                    note.isPinned = false;
                }
                return note;
            } else {
                return note;
            }
        });
        setNotes([...updatedNotes]);
    };

    const unArchiveNote = (index: number) => {
        const updatedNotes = notes.map((note, i) => {
            if (i === index) {
                note.isArchived = false;
                return note;
            } else {
                return note;
            }
        });
        setNotes([...updatedNotes]);
    };

    return (
        <div className="flex opacity-0 hover:opacity-100">
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Remind me"
            >
                <button className="btn-sm btn-circle btn border-none bg-inherit ">
                    <MdOutlineNotificationAdd className="text-lg" />
                </button>
            </div>
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Collaborator"
            >
                <button
                    className="btn-sm btn-circle btn border-none bg-inherit disabled:cursor-not-allowed disabled:bg-inherit"
                    disabled
                >
                    <MdOutlinePersonAddAlt className="text-lg" />
                </button>
            </div>
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Background options"
            >
                <button className="btn-sm btn-circle btn border-none bg-inherit ">
                    <MdOutlinePalette className="text-lg" />
                </button>
            </div>
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="Add image"
            >
                <button className="btn-sm btn-circle btn border-none bg-inherit ">
                    <MdOutlineImage className="text-lg" />
                </button>
            </div>
            {/* if the note is archived, then change the archive button for an unarchive button */}
            {notes[index].isArchived ? (
                <div
                    className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                    data-tip="Unarchive"
                >
                    <button
                        className="btn-sm btn-circle btn border-none bg-inherit "
                        onClick={() => unArchiveNote(index)}
                    >
                        <MdOutlineUnarchive className="text-lg" />
                    </button>
                </div>
            ) : (
                <div
                    className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                    data-tip="Archive"
                >
                    <button
                        className="btn-sm btn-circle btn border-none bg-inherit "
                        onClick={() => moveToArchive(index)}
                    >
                        <MdOutlineArchive className="text-lg" />
                    </button>
                </div>
            )}
            <div
                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                data-tip="More"
            >
                <div className="dropdown-end dropdown">
                    <label
                        tabIndex={0}
                        className=" btn-sm btn-circle btn border-none bg-inherit"
                    >
                        <MdOutlineMoreVert className="text-lg" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content w-max cursor-pointer bg-base-100 py-2 text-left shadow-inner drop-shadow-lg"
                    >
                        <li
                            className="py-1 px-4 hover:bg-gray-200"
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
