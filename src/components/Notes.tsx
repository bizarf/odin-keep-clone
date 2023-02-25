import React from "react";
import NoteComposer from "./NoteComposer";

type Props = {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    notes: {
        title: string | null | undefined;
        noteContent: string | null | undefined;
        isPinned: boolean;
        isArchived: boolean;
    }[];
    addNote: (
        title: string | null | undefined,
        noteContent: string | null | undefined,
        isPinned: boolean,
        isArchived: boolean
    ) => void;
};

const Notes = ({ isEdit, setIsEdit, notes, addNote }: Props) => {
    return (
        <div>
            <NoteComposer
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                addNote={addNote}
            />
            <div className="flex flex-wrap">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="m-2 h-max w-60 border-2 border-solid p-3"
                    >
                        <div>{note.title}</div>
                        <div>{note.noteContent}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
