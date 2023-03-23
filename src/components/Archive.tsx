import React, { SetStateAction } from "react";
import { NotesType } from "./KeepApp";
import { MdOutlineArchive } from "react-icons/md";
import NoteControls from "./NoteControls";

type Props = {
    notes: NotesType[];
    setNotes: React.Dispatch<SetStateAction<NotesType[]>>;
    gridView: boolean;
    mainMenuOpen: boolean;
};

const Archive = ({ notes, setNotes, gridView, mainMenuOpen }: Props) => {
    // grid and list view css
    let viewClass = "grid";

    if (gridView && mainMenuOpen) {
        viewClass +=
            " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[5%] m-2 gap-x-4 gap-y-4";
    } else if (gridView && !mainMenuOpen) {
        viewClass +=
            " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-[5%] m-2 gap-x-4 gap-y-4";
    } else {
        viewClass += " mx-[25%] gap-y-4 pt-4";
    }

    return (
        <div>
            <div className={viewClass}>
                {notes.map(
                    (note, index) =>
                        note.isArchived && (
                            <div
                                key={index}
                                className="h-max border-2 border-solid"
                            >
                                <div className="whitespace-pre-wrap break-all p-3">
                                    <div className="text-sm font-semibold">
                                        {note.title}
                                    </div>
                                    <div className="note--textarea clear-right overflow-hidden overflow-ellipsis text-sm">
                                        {note.noteContent}
                                    </div>
                                </div>
                                <NoteControls
                                    index={index}
                                    notes={notes}
                                    setNotes={setNotes}
                                />
                            </div>
                        )
                )}
            </div>
            {notes.every(({ isArchived }) => !isArchived) && (
                <div key={"empty"} className="h-full">
                    <div className="flex h-3/4 flex-col items-center justify-center">
                        <div>
                            <MdOutlineArchive className="text-9xl text-slate-200" />
                        </div>
                        <div className="text-xl">
                            Your archived notes appear here
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Archive;
