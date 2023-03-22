import React from "react";
import {
    MdOutlineDelete,
    MdDeleteForever,
    MdRestoreFromTrash,
} from "react-icons/md";
import { NotesType } from "./KeepApp";

type Props = {
    notes: NotesType[];
    setNotes: React.Dispatch<React.SetStateAction<NotesType[]>>;
    gridView: boolean;
    mainMenuOpen: boolean;
};

const Trash = ({ notes, setNotes, gridView, mainMenuOpen }: Props) => {
    let viewClass = "grid";

    if (gridView && mainMenuOpen) {
        viewClass +=
            " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[5%] m-2 gap-x-4 gap-y-4";
    } else if (gridView && !mainMenuOpen) {
        viewClass +=
            " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-[5%] m-2 gap-x-4 gap-y-4";
    } else {
        viewClass += " mx-[25%] gap-y-4";
    }

    const deleteNote = (index: number) => {
        const updatedNotes = notes;
        updatedNotes.splice(index, 1);
        setNotes([...updatedNotes]);
    };

    const restoreNote = (index: number) => {
        const updatedNotes = notes.map((note, i) => {
            if (i === index) {
                note.isTrash = false;
                return note;
            } else {
                return note;
            }
        });
        setNotes([...updatedNotes]);
    };

    return (
        <div>
            <div className="flex justify-center p-6 italic">
                Notes in Trash are deleted after 7 days.
            </div>
            <div className={viewClass}>
                {notes.map(
                    (note, index) =>
                        note.isTrash && (
                            <div
                                key={index}
                                className="h-max border-2 border-solid"
                            >
                                <div className="whitespace-pre-wrap break-all p-3">
                                    <div className="text-sm font-semibold">
                                        {note.title}
                                    </div>
                                    <div className="max-h-72 overflow-hidden text-sm">
                                        {note.noteContent}
                                    </div>
                                </div>
                                {/* delete note controls */}
                                <div className="opacity-0 hover:opacity-100">
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="Delete forever"
                                    >
                                        <button
                                            className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black "
                                            onClick={() => deleteNote(index)}
                                        >
                                            <MdDeleteForever className="text-base" />
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="Restore"
                                    >
                                        <button
                                            className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black"
                                            onClick={() => restoreNote(index)}
                                        >
                                            <MdRestoreFromTrash className="text-base" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                )}
            </div>

            {notes.every(({ isTrash }) => !isTrash) && (
                <div key={"empty"} className="h-full">
                    <div className="flex h-3/4 flex-col items-center justify-center">
                        <div>
                            <MdOutlineDelete className="text-9xl text-slate-200" />
                        </div>
                        <div className="text-xl">No notes in Trash</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trash;
