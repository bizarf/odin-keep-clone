import React, { useState } from "react";
import {
    MdOutlineDelete,
    MdDeleteForever,
    MdRestoreFromTrash,
} from "react-icons/md";
import { NotesType } from "./KeepApp";
import NoteTrashViewer from "./NoteTrashViewer";

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
        if (viewTrashNote) {
            setViewTrashNote((state) => !state);
        }

        const updatedNotes = notes;
        updatedNotes.splice(index, 1);
        setNotes([...updatedNotes]);
    };

    const restoreNote = (index: number) => {
        if (viewTrashNote) {
            setViewTrashNote((state) => !state);
        }

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

    const [viewTrashNote, setViewTrashNote] = useState(false);
    const [trashIndex, setTrashIndex] = useState(0);

    const viewTrashNoteBtn = (index: number) => {
        setTrashIndex(index);
        setViewTrashNote((state) => !state);
    };

    return (
        <div className="overflow-y-auto">
            <div className="flex justify-center p-6 italic">
                Notes in Trash are deleted after 7 days.
            </div>
            <div className={viewClass}>
                {notes.map(
                    (note, index) =>
                        note.isTrash && (
                            <div
                                key={index}
                                className="h-max rounded-lg border-[1px] border-solid"
                            >
                                <div
                                    className="whitespace-pre-wrap break-all p-3"
                                    onClick={() => viewTrashNoteBtn(index)}
                                >
                                    <div className="text-sm font-semibold">
                                        {note.title}
                                    </div>
                                    <div className="note--textarea clear-right overflow-hidden overflow-ellipsis text-sm">
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
                                            className="btn-sm btn-circle btn border-none bg-inherit "
                                            onClick={() => deleteNote(index)}
                                        >
                                            <MdDeleteForever
                                                className="text-base"
                                                aria-hidden
                                                focusable
                                            />
                                            <span className="sr-only">
                                                Delete forever
                                            </span>
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="Restore"
                                    >
                                        <button
                                            className="btn-sm btn-circle btn border-none bg-inherit"
                                            onClick={() => restoreNote(index)}
                                        >
                                            <MdRestoreFromTrash
                                                className="text-base"
                                                aria-hidden
                                                focusable
                                            />
                                            <span className="sr-only">
                                                Restore
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <NoteTrashViewer
                                    viewTrashNote={viewTrashNote}
                                    setViewTrashNote={setViewTrashNote}
                                    trashIndex={trashIndex}
                                    notes={notes}
                                    deleteNote={deleteNote}
                                    restoreNote={restoreNote}
                                />
                            </div>
                        )
                )}
            </div>

            {notes.every(({ isTrash }) => !isTrash) && (
                <div key={"empty"} className="h-full">
                    <div className="flex h-3/4 flex-col items-center justify-center">
                        <div>
                            <MdOutlineDelete
                                className="text-9xl text-slate-200"
                                aria-hidden
                            />
                        </div>
                        <div className="text-xl">No notes in Trash</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trash;
