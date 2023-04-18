import React, { useState } from "react";
import {
    MdOutlineCheckBox,
    MdOutlineBrush,
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
import TextareaResize from "react-textarea-autosize";

type Props = {
    noteComposerOpen: boolean;
    setNoteComposerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addNote: (
        title: string | undefined,
        noteContent: string | undefined,
        isPinned: boolean,
        isArchived: boolean,
        isTrash: boolean
    ) => void;
};

const NoteComposer = ({
    noteComposerOpen,
    setNoteComposerOpen,
    addNote,
}: Props) => {
    const [isPinned, setIsPinned] = useState(false);

    const closeNote = () => {
        const noteTitle =
            document.querySelector<HTMLInputElement>("#noteTitle")?.value;
        const noteContent =
            document.querySelector<HTMLTextAreaElement>("#noteContent")?.value;

        addNote(noteTitle, noteContent, isPinned, false, false);
        if (isPinned) {
            setIsPinned((state) => !state);
        }
        setNoteComposerOpen((state) => !state);
    };

    return (
        <div className="mx-auto my-8 max-w-xs rounded-lg border-[1px] border-solid px-4 shadow-md sm:max-w-md md:max-w-lg">
            {noteComposerOpen ? (
                <div className="flex flex-col">
                    <div className="flex">
                        <label htmlFor="noteTitle" className="sr-only">
                            Note Title
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="flex-1 bg-inherit font-semibold focus:outline-none"
                            id="noteTitle"
                            aria-label="Note Title"
                        />
                        <button
                            className="btn-circle btn border-none bg-inherit"
                            id="pinBtn"
                            onClick={() => setIsPinned((state) => !state)}
                        >
                            {isPinned ? (
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
                            {isPinned ? (
                                <span className="sr-only">Pinned note</span>
                            ) : (
                                <span className="sr-only">Unpinned note</span>
                            )}
                        </button>
                    </div>
                    <label htmlFor="noteContent" className="sr-only">
                        Note Content
                    </label>
                    <TextareaResize
                        placeholder="Take a note..."
                        className="resize-none bg-inherit text-sm focus:outline-none"
                        id="noteContent"
                        maxRows={20}
                        aria-label="Note content"
                    ></TextareaResize>
                    <div className="flex items-center justify-between py-2">
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
                                    <span className="sr-only">
                                        Set reminder
                                    </span>
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
                            <div
                                className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                data-tip="Archive"
                            >
                                <button className="btn-sm btn-circle btn border-none bg-inherit">
                                    <MdOutlineArchive
                                        className="text-lg"
                                        aria-hidden
                                        focusable
                                    />
                                    <span className="sr-only">Archive</span>
                                </button>
                            </div>
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
                            onClick={closeNote}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between">
                    <div
                        className="flex w-full items-center"
                        onClick={() => setNoteComposerOpen(true)}
                    >
                        Take a note...
                    </div>
                    <div className="flex">
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="New list"
                        >
                            <button className="btn-circle btn border-none bg-inherit">
                                <MdOutlineCheckBox
                                    className="text-2xl"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">New list</span>
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="New note with drawing"
                        >
                            <button className="btn-circle btn border-none bg-inherit">
                                <MdOutlineBrush
                                    className="text-2xl"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">
                                    New note with drawing
                                </span>
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="New note with image"
                        >
                            <button className="btn-circle btn border-none bg-inherit">
                                <MdOutlineImage
                                    className="text-2xl"
                                    aria-hidden
                                    focusable
                                />
                                <span className="sr-only">
                                    New note with image
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteComposer;
