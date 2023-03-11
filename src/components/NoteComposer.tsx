import { React, useState } from "react";
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

type Props = {
    isEdit: boolean;
    setIsEdit: React.dispatch<React.SetStateAction<boolean>>;
    addNote: (
        title: string | null | undefined,
        noteContent: string | null | undefined,
        isPinned: boolean,
        isArchived: boolean,
        isTrash: boolean
    ) => void;
};

const NoteComposer = ({ isEdit, setIsEdit, addNote }: Props) => {
    const [isPinned, setIsPinned] = useState(false);

    const closeNote = () => {
        const noteTitle = document.querySelector("#noteTitle")?.value;
        const noteContent = document.querySelector("#noteContent")?.value;

        addNote(noteTitle, noteContent, isPinned, false, false);
        setIsEdit(false);
    };

    return (
        <div className="mx-60 my-8 border-2 border-solid px-4">
            {isEdit ? (
                <div className="flex flex-col">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Title"
                            className="flex-1 focus:outline-none"
                            id="noteTitle"
                        />
                        <button
                            className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black"
                            id="pinBtn"
                        >
                            {isPinned ? (
                                <MdPushPin className="text-2xl" />
                            ) : (
                                <MdOutlinePushPin className="text-2xl" />
                            )}
                        </button>
                    </div>
                    <textarea
                        placeholder="Take a note..."
                        className="focus:outline-none"
                        id="noteContent"
                    ></textarea>
                    <div className="flex justify-between">
                        <div className="flex w-4/6 justify-between">
                            <div
                                className="tooltip tooltip-bottom text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                                data-tip="Remind me"
                            >
                                <button className="btn-sm btn-circle btn text-slate-500 hover:bg-slate-200 hover:text-black">
                                    <MdOutlineNotificationAdd className="text-lg" />
                                </button>
                            </div>
                            <div
                                className="tooltip tooltip-bottom text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                                data-tip="Collaborator"
                            >
                                <button
                                    className="btn-sm btn-circle btn text-slate-500 hover:bg-slate-200 hover:text-black"
                                    disabled
                                >
                                    <MdOutlinePersonAddAlt className="text-lg" />
                                </button>
                            </div>
                            <div
                                className="tooltip tooltip-bottom text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                                data-tip="Background options"
                            >
                                <button className="btn-sm btn-circle btn text-slate-500 hover:bg-slate-200 hover:text-black">
                                    <MdOutlinePalette className="text-lg" />
                                </button>
                            </div>
                            <div
                                className="tooltip tooltip-bottom text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                                data-tip="Add image"
                            >
                                <button className="btn-sm btn-circle btn text-slate-500 hover:bg-slate-200 hover:text-black">
                                    <MdOutlineImage className="text-lg" />
                                </button>
                            </div>
                            <div
                                className="tooltip tooltip-bottom text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                                data-tip="Archive"
                            >
                                <button className="btn-sm btn-circle btn text-slate-500 hover:bg-slate-200 hover:text-black">
                                    <MdOutlineArchive className="text-lg" />
                                </button>
                            </div>
                            <div
                                className="tooltip tooltip-bottom text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                                data-tip="More"
                            >
                                <button className="btn-sm btn-circle btn text-slate-500 hover:bg-slate-200 hover:text-black">
                                    <MdOutlineMoreVert className="text-lg" />
                                </button>
                            </div>
                            <div
                                className="tooltip tooltip-bottom text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                                data-tip="Undo"
                            >
                                <button className="btn-sm btn-circle btn text-slate-500 hover:bg-slate-200 hover:text-black">
                                    <MdOutlineUndo className="text-lg" />
                                </button>
                            </div>
                            <div
                                className="tooltip tooltip-bottom text-xs before:opacity-0 hover:before:w-max hover:before:rounded hover:before:bg-zinc-600 hover:before:py-1 hover:before:px-2 hover:before:text-white hover:before:opacity-100"
                                data-tip="Redo"
                            >
                                <button className="btn-sm btn-circle btn text-slate-500 hover:bg-slate-200 hover:text-black">
                                    <MdOutlineRedo className="text-lg" />
                                </button>
                            </div>
                        </div>
                        <div
                            className="btn-sm btn px-6 hover:bg-slate-100"
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
                        onClick={() => setIsEdit(true)}
                    >
                        Take a note...
                    </div>
                    <div className="flex">
                        <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                            <MdOutlineCheckBox className="text-2xl" />
                        </button>
                        <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                            <MdOutlineBrush className="text-2xl" />
                        </button>
                        <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                            <MdOutlineImage className="text-2xl" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteComposer;
