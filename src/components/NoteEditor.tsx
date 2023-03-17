import React, { ChangeEvent, useEffect } from "react";
import {
    // MdOutlineCheckBox,
    // MdOutlineBrush,
    MdOutlineImage,
    MdPushPin,
    MdOutlinePushPin,
    MdOutlineNotificationAdd,
    MdOutlinePersonAddAlt,
    MdOutlinePalette,
    MdOutlineArchive,
    MdOutlineMoreVert,
    MdOutlineUndo,
    MdOutlineRedo,
} from "react-icons/md";

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

    // const textareaAutoHeight = () => {
    //     const noteContent = document.querySelector("#noteContentEdit");
    //     noteContent.style.height = "";
    //     noteContent.style.height =
    //         Math.min(noteContent?.scrollHeight, 300) + "px";
    // };

    if (!editNote) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-20"
            onClick={closeEdit}
        >
            <div
                className="flex w-2/5 flex-col rounded-lg bg-white p-2"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Title"
                        className="flex-1 focus:outline-none"
                        id="noteTitleEdit"
                        value={currentNote?.title}
                        onChange={editTitle}
                    />
                    <div
                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                        data-tip="Pin note"
                    >
                        <button
                            className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black"
                            id="pinBtn"
                        >
                            {currentNote?.isPinned ? (
                                <MdPushPin className="text-2xl" />
                            ) : (
                                <MdOutlinePushPin className="text-2xl" />
                            )}
                        </button>
                    </div>
                </div>
                <textarea
                    placeholder="Take a note..."
                    className=" h-auto resize-none overflow-visible focus:outline-none"
                    id="noteContentEdit"
                    // onInput={textareaAutoHeight}
                    value={currentNote?.noteContent}
                    onChange={editNoteContent}
                ></textarea>
                <div className="flex justify-between">
                    <div className="flex w-4/6 justify-between">
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Remind me"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black">
                                <MdOutlineNotificationAdd className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Collaborator"
                        >
                            <button
                                className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black"
                                disabled
                            >
                                <MdOutlinePersonAddAlt className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Background options"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black">
                                <MdOutlinePalette className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Add image"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black">
                                <MdOutlineImage className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Archive"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black">
                                <MdOutlineArchive className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="More"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black">
                                <MdOutlineMoreVert className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Undo"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black">
                                <MdOutlineUndo className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Redo"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black">
                                <MdOutlineRedo className="text-lg" />
                            </button>
                        </div>
                    </div>
                    <div
                        className="btn-sm btn border-none bg-inherit px-6 text-slate-500 hover:bg-slate-100 hover:text-black"
                        onClick={closeEdit}
                    >
                        Close
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
