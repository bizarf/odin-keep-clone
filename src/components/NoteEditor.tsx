import React, { ChangeEvent } from "react";
import {
    MdOutlineImage,
    MdPushPin,
    MdOutlinePushPin,
    MdOutlineNotificationAdd,
    MdOutlinePersonAddAlt,
    MdOutlinePalette,
    MdOutlineArchive,
    MdOutlineUnarchive,
    MdOutlineMoreVert,
    MdOutlineUndo,
    MdOutlineRedo,
} from "react-icons/md";
import TextareaAutoresize from "react-textarea-autosize";

type Props = {
    editNote: boolean;
    setEditNote: React.Dispatch<React.SetStateAction<boolean>>;
    currentNote:
        | {
              title: string | undefined;
              noteContent: string | undefined;
              isPinned: boolean;
              isArchived: boolean;
              isTrash: boolean;
          }
        | undefined;
    currentIndex: number;
    setCurrentNote: React.Dispatch<
        React.SetStateAction<
            | {
                  title: string | undefined;
                  noteContent: string | undefined;
                  isPinned: boolean;
                  isArchived: boolean;
                  isTrash: boolean;
              }
            | undefined
        >
    >;
    setNotes: React.Dispatch<
        React.SetStateAction<
            Array<{
                title: string | undefined;
                noteContent: string | undefined;
                isPinned: boolean;
                isArchived: boolean;
                isTrash: boolean;
            }>
        >
    >;
    notes: {
        title: string | undefined;
        noteContent: string | undefined;
        isPinned: boolean;
        isArchived: boolean;
        isTrash: boolean;
    }[];
};

const NoteEditor = ({
    editNote,
    setEditNote,
    currentNote,
    currentIndex,
    setCurrentNote,
    setNotes,
    notes,
}: Props) => {
    const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (currentNote) {
            setCurrentNote({ ...currentNote, title: e.target?.value });
        }
    };

    const editNoteContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (currentNote) {
            setCurrentNote({
                ...currentNote,
                noteContent: e.target?.value,
            });
        }
    };

    const closeEdit = () => {
        const updatedNotes = notes.map((note, i) => {
            if (i === currentIndex) {
                note.title = currentNote?.title;
                note.noteContent = currentNote?.noteContent;
                return note;
            } else {
                return note;
            }
        });
        setNotes([...updatedNotes]);
        setEditNote((state) => !state);
    };

    if (!editNote) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-20"
            onClick={closeEdit}
        >
            <div
                className="flex w-full flex-col rounded-lg border-[1px] border-solid bg-base-100 p-2 sm:max-w-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex">
                    <label htmlFor="noteTitleEdit" className="sr-only">
                        Note Title
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full bg-inherit px-2 font-semibold focus:outline-none"
                        id="noteTitleEdit"
                        value={currentNote?.title}
                        onChange={editTitle}
                        // aria-label="Note Title"
                    />
                    <div
                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                        data-tip="Pin note"
                    >
                        <button className="btn-circle btn border-none bg-inherit">
                            {currentNote?.isPinned ? (
                                <MdPushPin
                                    className="text-2xl"
                                    aria-hidden
                                    focusable
                                />
                            ) : (
                                <MdOutlinePushPin
                                    className="text-2xl"
                                    aria-hidden
                                    focusable
                                />
                            )}
                            {currentNote?.isPinned ? (
                                <span className="sr-only">Pinned note</span>
                            ) : (
                                <span className="sr-only">Unpinned note</span>
                            )}
                        </button>
                    </div>
                </div>
                <label htmlFor="noteContentEdit" className="sr-only">
                    Note Content
                </label>
                <TextareaAutoresize
                    placeholder="Take a note..."
                    className="resize-none bg-inherit p-2 focus:outline-none"
                    id="noteContentEdit"
                    value={currentNote?.noteContent}
                    onChange={editNoteContent}
                    maxRows={20}
                    // aria-label="Note content"
                ></TextareaAutoresize>
                <div className="flex justify-between">
                    <div className="flex w-4/6 justify-between">
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Remind me"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlineNotificationAdd
                                    className="text-lg"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">Set reminder</span>
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Collaborator"
                        >
                            <button
                                className="btn-sm btn-circle btn border-none bg-inherit"
                                disabled
                            >
                                <MdOutlinePersonAddAlt
                                    className="text-lg"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">
                                    Set collaborator
                                </span>
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Background options"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlinePalette
                                    className="text-lg"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">
                                    Background options
                                </span>
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Add image"
                        >
                            <button
                                className="btn-sm btn-circle btn border-none bg-inherit"
                                disabled
                            >
                                <MdOutlineImage
                                    className="text-lg"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">Add image</span>
                            </button>
                        </div>
                        {/* dynamic archive button options */}
                        {currentNote?.isArchived ? (
                            <div
                                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                data-tip="Unarchive"
                            >
                                <button
                                    className="btn-sm btn-circle btn border-none bg-inherit "
                                    // onClick={() => unArchiveNote(index)}
                                >
                                    <MdOutlineUnarchive
                                        className="text-lg"
                                        aria-hidden
                                        focusable
                                    />
                                    <span className="sr-only">Unarchive</span>
                                </button>
                            </div>
                        ) : (
                            <div
                                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                data-tip="Archive"
                            >
                                <button
                                    className="btn-sm btn-circle btn border-none bg-inherit "
                                    // onClick={() => moveToArchive(index)}
                                >
                                    <MdOutlineArchive
                                        className="text-lg"
                                        aria-hidden
                                        focusable
                                    />
                                    <span className="sr-only">Archive</span>
                                </button>
                            </div>
                        )}
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="More"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlineMoreVert
                                    className="text-lg"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">More</span>
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Undo"
                        >
                            <button
                                className="btn-sm btn-circle btn border-none bg-inherit"
                                disabled
                            >
                                <MdOutlineUndo
                                    className="text-lg"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">Undo</span>
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Redo"
                        >
                            <button
                                className="btn-sm btn-circle btn border-none bg-inherit"
                                disabled
                            >
                                <MdOutlineRedo
                                    className="text-lg"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">Redo</span>
                            </button>
                        </div>
                    </div>
                    <button
                        className="btn-sm btn border-none bg-inherit px-6"
                        onClick={closeEdit}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
