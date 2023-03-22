import React, { ChangeEvent } from "react";
import {
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
                className="flex w-full flex-col rounded-lg border-[1px] border-solid bg-base-100 pl-2 sm:max-w-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full bg-inherit px-2 font-semibold focus:outline-none"
                        id="noteTitleEdit"
                        value={currentNote?.title}
                        onChange={editTitle}
                    />
                    <div
                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                        data-tip="Pin note"
                    >
                        <button
                            className="btn-circle btn border-none bg-inherit"
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
                <TextareaAutoresize
                    placeholder="Take a note..."
                    className="resize-none bg-inherit p-2 focus:outline-none"
                    id="noteContentEdit"
                    value={currentNote?.noteContent}
                    onChange={editNoteContent}
                    maxRows={20}
                ></TextareaAutoresize>
                <div className="flex justify-between">
                    <div className="flex w-4/6 justify-between">
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Remind me"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlineNotificationAdd className="text-lg" />
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
                                <MdOutlinePersonAddAlt className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Background options"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlinePalette className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Add image"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlineImage className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Archive"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlineArchive className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="More"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlineMoreVert className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Undo"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlineUndo className="text-lg" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="Redo"
                        >
                            <button className="btn-sm btn-circle btn border-none bg-inherit">
                                <MdOutlineRedo className="text-lg" />
                            </button>
                        </div>
                    </div>
                    <div
                        className="btn-sm btn border-none bg-inherit px-6"
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
