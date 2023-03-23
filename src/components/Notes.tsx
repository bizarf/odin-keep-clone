import React from "react";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import NoteComposer from "./NoteComposer";
import NoteEditor from "./NoteEditor";
import NoteControls from "./NoteControls";
import { NotesType } from "./KeepApp";

type Props = {
    noteComposerOpen: boolean;
    setNoteComposerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    notes: NotesType[];
    setNotes: React.Dispatch<React.SetStateAction<NotesType[]>>;
    addNote: (
        title: string | undefined,
        noteContent: string | undefined,
        isPinned: boolean,
        isArchived: boolean,
        isTrash: boolean
    ) => void;
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
    editNoteBtn: (
        note: {
            title: string | undefined;
            noteContent: string | undefined;
            isPinned: boolean;
            isArchived: boolean;
            isTrash: boolean;
        },
        index: number
    ) => void;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    gridView: boolean;
    pinNote: (index: number, pin: boolean) => void;
    mainMenuOpen: boolean;
};

const Notes = ({
    noteComposerOpen,
    setNoteComposerOpen,
    notes,
    setNotes,
    addNote,
    editNote,
    setEditNote,
    currentNote,
    setCurrentNote,
    editNoteBtn,
    currentIndex,
    gridView,
    pinNote,
    mainMenuOpen,
}: Props) => {
    // grid and list view css
    let viewClass = "grid";

    if (gridView && mainMenuOpen) {
        viewClass +=
            " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[5%] m-2 gap-x-4 gap-y-4";
    } else if (gridView && !mainMenuOpen) {
        viewClass +=
            " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-[5%] m-2 gap-x-4 gap-y-4";
    } else {
        viewClass += " mx-[25%] gap-y-4";
    }

    return (
        <div>
            <NoteComposer
                noteComposerOpen={noteComposerOpen}
                setNoteComposerOpen={setNoteComposerOpen}
                addNote={addNote}
            />
            <div>
                <div>
                    {notes.some((note) => note.isPinned) && (
                        <div className={`${viewClass} text-sm`}>PINNED</div>
                    )}
                    <div className={viewClass}>
                        {notes.map(
                            (note, index) =>
                                note.isPinned && (
                                    <div
                                        key={index}
                                        className="h-max rounded-lg border-[1px] border-solid"
                                    >
                                        <div
                                            className="tooltip tooltip-bottom float-right [--tooltip-tail:0px] before:text-xs"
                                            data-tip="Pin note"
                                        >
                                            {/* -0.5rem margin gets rid of the margin and allows textarea to properly fill the width */}
                                            <button
                                                className="= btn-sm btn-circle btn float-right -m-2 mt-2 mr-2 border-none bg-inherit"
                                                onClick={() =>
                                                    pinNote(
                                                        index,
                                                        note.isPinned
                                                    )
                                                }
                                            >
                                                {note.isPinned ? (
                                                    <MdPushPin className="text-2xl" />
                                                ) : (
                                                    <MdOutlinePushPin className="text-2xl" />
                                                )}
                                            </button>
                                        </div>
                                        <div
                                            className="cursor-pointer whitespace-pre-wrap break-all p-3 "
                                            onClick={() =>
                                                editNoteBtn(note, index)
                                            }
                                        >
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
                    {notes.some((note) => note.isPinned) && (
                        <div className={`${viewClass} pt-10 text-sm`}>
                            OTHERS
                        </div>
                    )}
                </div>
            </div>
            <div className={`${viewClass}`}>
                {notes.map(
                    (note, index) =>
                        !note.isTrash &&
                        !note.isPinned &&
                        !note.isArchived && (
                            <div
                                key={index}
                                className="h-fit rounded-lg border-[1px] border-solid"
                            >
                                <div
                                    className="tooltip tooltip-bottom float-right [--tooltip-tail:0px] before:text-xs"
                                    data-tip="Pin note"
                                >
                                    {/* -0.5rem margin gets rid of the margin and allows textarea to properly fill the width */}
                                    <button
                                        className="= btn-sm btn-circle btn float-right -m-2 mt-2 mr-2 border-none bg-inherit opacity-0 hover:opacity-100"
                                        onClick={() =>
                                            pinNote(index, note.isPinned)
                                        }
                                    >
                                        <MdOutlinePushPin className="text-2xl" />
                                    </button>
                                </div>
                                <div
                                    className="whitespace-pre-wrap break-words p-3"
                                    onClick={() => editNoteBtn(note, index)}
                                >
                                    <div className="text-sm font-semibold">
                                        {note.title}
                                    </div>
                                    {/* max height of 6rem for now. I wanted a masonry grid, but the implementation might be messy especially with the view switching system */}
                                    <div className="note--textarea overflow-hidden overflow-ellipsis text-sm">
                                        {note.noteContent}
                                    </div>
                                </div>
                                <NoteControls
                                    index={index}
                                    notes={notes}
                                    setNotes={setNotes}
                                />
                                <div>
                                    <NoteEditor
                                        currentNote={currentNote}
                                        currentIndex={currentIndex}
                                        setCurrentNote={setCurrentNote}
                                        editNote={editNote}
                                        setEditNote={setEditNote}
                                        notes={notes}
                                        setNotes={setNotes}
                                    />
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Notes;
