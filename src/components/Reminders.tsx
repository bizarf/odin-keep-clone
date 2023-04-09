import React, { SetStateAction } from "react";
import NoteComposer from "./NoteComposer";
import { NotesType } from "./KeepApp";
import { MdNotificationsNone } from "react-icons/md";

type Props = {
    notes: NotesType[];
    setNotes: React.Dispatch<SetStateAction<NotesType[]>>;
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

const Reminders = ({
    notes,
    setNotes,
    noteComposerOpen,
    setNoteComposerOpen,
    addNote,
}: Props) => {
    return (
        <div className="overflow-y-auto">
            <NoteComposer
                noteComposerOpen={noteComposerOpen}
                setNoteComposerOpen={setNoteComposerOpen}
                addNote={addNote}
            />
            {notes.every(({ isTrash }) => !isTrash) && (
                <div key={"empty"} className="flex h-3/4 justify-center">
                    <div className="flex h-3/4 flex-col items-center justify-center">
                        <div>
                            <MdNotificationsNone className="text-9xl text-slate-200" />
                        </div>
                        <div className="text-xl">
                            Notes with upcoming reminders appear here
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reminders;
