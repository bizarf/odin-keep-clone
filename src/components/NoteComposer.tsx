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
                        <div>
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineNotificationAdd className="text-2xl" />
                            </button>
                            <button
                                className="disabled btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black disabled:bg-inherit"
                                disabled
                            >
                                <MdOutlinePersonAddAlt className="text-2xl" />
                            </button>
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlinePalette className="text-2xl" />
                            </button>
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineImage className="text-2xl" />
                            </button>
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineArchive className="text-2xl" />
                            </button>
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineMoreVert className="text-2xl" />
                            </button>
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineUndo className="text-2xl" />
                            </button>
                            <button className="btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-100 hover:text-black ">
                                <MdOutlineRedo className="text-2xl" />
                            </button>
                        </div>
                        <div className="btn-ghost btn" onClick={closeNote}>
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
