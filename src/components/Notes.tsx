import React, { SetStateAction } from "react";
import {
    MdOutlineNotificationAdd,
    MdOutlinePersonAddAlt,
    MdOutlinePalette,
    MdOutlineImage,
    MdOutlineArchive,
    MdOutlineMoreVert,
    MdOutlinePushPin,
    MdPushPin,
} from "react-icons/md";
import NoteComposer from "./NoteComposer";
import NoteEditor from "./NoteEditor";
import NoteControls from "./NoteControls";

type Props = {
    noteComposerOpen: boolean;
    setNoteComposerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    notes: {
        title: string | undefined;
        noteContent: string | undefined;
        isPinned: boolean;
        isArchived: boolean;
        isTrash: boolean;
    }[];
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
    addNote: (
        title: string | undefined,
        noteContent: string | undefined,
        isPinned: boolean,
        isArchived: boolean,
        isTrash: boolean
    ) => void;
    moveToTrash: (index: number) => void;
    editNote: boolean;
    setEditNote: React.Dispatch<SetStateAction<boolean>>;
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
        SetStateAction<
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
    setCurrentIndex: React.Dispatch<SetStateAction<number>>;
    gridView: boolean;
    pinNote: (index: number, pin: boolean) => void;
};

const Notes = ({
    noteComposerOpen,
    setNoteComposerOpen,
    notes,
    setNotes,
    addNote,
    moveToTrash,
    editNote,
    setEditNote,
    currentNote,
    setCurrentNote,
    editNoteBtn,
    currentIndex,
    gridView,
    pinNote,
}: Props) => {
    let viewClass = "flex";

    if (gridView) {
        viewClass += " flex-wrap";
    } else {
        viewClass += " mx-60 flex-col";
    }

    return (
        <div className="">
            <NoteComposer
                noteComposerOpen={noteComposerOpen}
                setNoteComposerOpen={setNoteComposerOpen}
                addNote={addNote}
            />
            <div>
                <div className="">
                    {notes.some((note) => note.isPinned) && <div>Pinned</div>}
                    <div className={viewClass}>
                        {notes.map(
                            (note, index) =>
                                note.isPinned && (
                                    <div
                                        key={index}
                                        className="m-2 h-max w-60 border-2 border-solid"
                                    >
                                        <div
                                            className="tooltip tooltip-bottom float-right [--tooltip-tail:0px] before:text-xs"
                                            data-tip="Pin note"
                                        >
                                            <button
                                                className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black"
                                                onClick={() =>
                                                    pinNote(
                                                        index,
                                                        note.isPinned
                                                    )
                                                }
                                            >
                                                {note.isPinned ? (
                                                    <MdPushPin className="text-lg" />
                                                ) : (
                                                    <MdOutlinePushPin className="text-lg" />
                                                )}
                                            </button>
                                        </div>
                                        <div
                                            className="cursor-pointer whitespace-pre-wrap break-all p-3"
                                            onClick={() =>
                                                editNoteBtn(note, index)
                                            }
                                        >
                                            <div className="font-semibold">
                                                {note.title}
                                            </div>
                                            <div>{note.noteContent}</div>
                                        </div>
                                        <NoteControls
                                            index={index}
                                            moveToTrash={moveToTrash}
                                        />
                                    </div>
                                )
                        )}
                    </div>
                    {notes.some((note) => note.isPinned) && <div>Others</div>}
                </div>
            </div>
            <div className={viewClass}>
                {notes.map(
                    (note, index) =>
                        !note.isTrash &&
                        !note.isPinned && (
                            <div
                                key={index}
                                className="m-2 h-max w-60 border-2 border-solid"
                            >
                                <div
                                    className="tooltip tooltip-bottom float-right [--tooltip-tail:0px] before:text-xs"
                                    data-tip="Pin note"
                                >
                                    <button
                                        className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black"
                                        onClick={() =>
                                            pinNote(index, note.isPinned)
                                        }
                                    >
                                        <MdOutlinePushPin className="text-lg" />
                                    </button>
                                </div>
                                <div
                                    className="cursor-pointer whitespace-pre-wrap break-all p-3"
                                    onClick={() => editNoteBtn(note, index)}
                                >
                                    <div className="font-semibold">
                                        {note.title}
                                    </div>
                                    <div>{note.noteContent}</div>
                                </div>
                                <NoteControls
                                    index={index}
                                    moveToTrash={moveToTrash}
                                />
                                {/* <div className="flex justify-evenly opacity-0 hover:opacity-100">
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="Remind me"
                                    >
                                        <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                                            <MdOutlineNotificationAdd className="text-base" />
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="Collaborator"
                                    >
                                        <button
                                            className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black disabled:cursor-not-allowed disabled:bg-inherit"
                                            disabled
                                        >
                                            <MdOutlinePersonAddAlt className="text-base" />
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="Background options"
                                    >
                                        <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                                            <MdOutlinePalette className="text-base" />
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="Add image"
                                    >
                                        <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                                            <MdOutlineImage className="text-base" />
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="Archive"
                                    >
                                        <button className="btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black ">
                                            <MdOutlineArchive className="text-base" />
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-bottom [--tooltip-tail:0px] before:text-xs"
                                        data-tip="More"
                                    >
                                        <div className="dropdown-end dropdown">
                                            <label
                                                tabIndex={0}
                                                className=" btn-sm btn-circle btn border-none bg-inherit text-slate-500 hover:bg-slate-200 hover:text-black "
                                            >
                                                <MdOutlineMoreVert className="text-base" />
                                            </label>
                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content w-max bg-base-100 py-2 shadow-lg"
                                            >
                                                <li
                                                    className="cursor-pointer py-1 px-4 hover:bg-gray-200"
                                                    onClick={() =>
                                                        moveToTrash(index)
                                                    }
                                                >
                                                    <div className="text-sm">
                                                        Delete note
                                                    </div>
                                                </li>
                                                <li className="py-1 px-4 hover:bg-gray-200">
                                                    <div className="text-sm">
                                                        Add label
                                                    </div>
                                                </li>
                                                <li className="py-1 px-4 hover:bg-gray-200">
                                                    <div className="text-sm">
                                                        Add drawing
                                                    </div>
                                                </li>
                                                <li className="py-1 px-4 hover:bg-gray-200">
                                                    <div className="text-sm">
                                                        Make a copy
                                                    </div>
                                                </li>
                                                <li className="py-1 px-4 hover:bg-gray-200">
                                                    <div className="text-sm">
                                                        Show checkboxes
                                                    </div>
                                                </li>
                                                <li className="py-1 px-4 hover:bg-gray-200">
                                                    <div className="text-sm">
                                                        Copy to Google Docs
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}
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
