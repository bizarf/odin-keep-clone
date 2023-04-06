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
        <div className="mx-60 my-8 rounded-lg border-[1px] border-solid px-4 shadow-md">
            {noteComposerOpen ? (
                <div className="flex flex-col">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Title"
                            className="flex-1 bg-inherit font-semibold focus:outline-none"
                            id="noteTitle"
                        />
                        <div
                            className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black"
                            id="pinBtn"
                            onClick={() => setIsPinned((state) => !state)}
                        >
                            {isPinned ? (
                                <MdPushPin className="text-2xl" />
                            ) : (
                                <MdOutlinePushPin className="text-2xl" />
                            )}
                        </div>
                    </div>
                    <TextareaResize
                        placeholder="Take a note..."
                        className="resize-none bg-inherit text-sm focus:outline-none"
                        id="noteContent"
                        maxRows={20}
                    ></TextareaResize>
                    <div className="flex items-center justify-between py-2">
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
                                <button
                                    className="btn-sm btn-circle btn border-none bg-inherit"
                                    disabled
                                >
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
                                <button
                                    className="btn-sm btn-circle btn border-none bg-inherit"
                                    disabled
                                >
                                    <MdOutlineUndo className="text-lg" />
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
                                    <MdOutlineRedo className="text-lg" />
                                </button>
                            </div>
                        </div>
                        <div
                            className="btn-sm btn border-none bg-inherit px-6 text-slate-500 hover:bg-slate-100 hover:text-black"
                            onClick={closeNote}
                        >
                            Close
                        </div>
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
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineCheckBox className="text-2xl" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="New note with drawing"
                        >
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineBrush className="text-2xl" />
                            </button>
                        </div>
                        <div
                            className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                            data-tip="New note with image"
                        >
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineImage className="text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteComposer;
