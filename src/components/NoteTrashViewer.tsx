import React from "react";
import { NotesType } from "./KeepApp";
import TextareaAutoresize from "react-textarea-autosize";
import { MdDeleteForever, MdRestoreFromTrash } from "react-icons/md";

type Props = {
    viewTrashNote: boolean;
    setViewTrashNote: React.Dispatch<React.SetStateAction<boolean>>;
    trashIndex: number;
    notes: NotesType[];
    deleteNote: (trashIndex: number) => void;
    restoreNote: (trashIndex: number) => void;
};

const NoteTrashViewer = ({
    viewTrashNote,
    setViewTrashNote,
    trashIndex,
    notes,
    deleteNote,
    restoreNote,
}: Props) => {
    if (!viewTrashNote) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setViewTrashNote((state) => !state)}
        >
            <div
                className="flex w-full flex-col rounded-lg border-[1px] border-solid bg-base-100 p-2 sm:max-w-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex">
                    <label htmlFor="noteTitleTrash" className="sr-only">
                        Note Title
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full bg-inherit px-2 font-semibold focus:outline-none"
                        id="noteTitleTrash"
                        value={notes[trashIndex].title}
                        readOnly
                    />
                </div>
                <label htmlFor="noteContentTrash" className="sr-only">
                    Note Content
                </label>
                <TextareaAutoresize
                    placeholder="Take a note..."
                    className="resize-none bg-inherit p-2 focus:outline-none"
                    id="noteContentTrash"
                    value={notes[trashIndex].noteContent}
                    maxRows={20}
                    readOnly
                ></TextareaAutoresize>
                {/* controls for the trash note viewer */}
                <div className="flex justify-between">
                    <div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Delete forever"
                        >
                            <button
                                className="btn-sm btn-circle btn border-none bg-inherit"
                                onClick={() => deleteNote(trashIndex)}
                            >
                                <MdDeleteForever
                                    className="text-base"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">Delete forever</span>
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Restore"
                        >
                            <button
                                className="btn-sm btn-circle btn border-none bg-inherit"
                                onClick={() => restoreNote(trashIndex)}
                            >
                                <MdRestoreFromTrash
                                    className="text-base"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">Restore</span>
                            </button>
                        </div>
                    </div>
                    <button
                        className="btn-sm btn border-none bg-inherit px-6"
                        onClick={() => setViewTrashNote((state) => !state)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteTrashViewer;
