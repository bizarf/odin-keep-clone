import React from "react";
import {
    MdOutlineDelete,
    MdDeleteForever,
    MdRestoreFromTrash,
} from "react-icons/md";

type Props = {
    notes: {
        title: string | null | undefined;
        noteContent: string | null | undefined;
        isPinned: boolean;
        isArchived: boolean;
        isTrash: boolean;
    }[];
    setNotes: React.Dispatch<
        React.SetStateAction<
            {
                title: string | null | undefined;
                noteContent: string | null | undefined;
                isPinned: boolean;
                isArchived: boolean;
                isTrash: boolean;
            }[]
        >
    >;
};

const Trash = ({ notes, setNotes }: Props) => {
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
            <div className="flex flex-wrap">
                {notes.map(
                    (note, index) =>
                        note.isTrash && (
                            <div
                                key={index}
                                className="m-2 h-max w-60 border-2 border-solid"
                            >
                                <div className="whitespace-pre-wrap p-3">
                                    <div>{note.title}</div>
                                    <div>{note.noteContent}</div>
                                </div>
                                <div>
                                    <div
                                        className="tooltip tooltip-bottom"
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
                                        className="tooltip tooltip-bottom"
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
                    {/* <div className="flex justify-center pt-6 italic">
                        Notes in Trash are deleted after 7 days.
                    </div> */}
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
