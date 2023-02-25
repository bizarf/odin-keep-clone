import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Notes from "./Notes";
import Reminders from "./Reminders";
import Archive from "./Archive";
import Trash from "./Trash";

const KeepApp = () => {
    const [notes, setNotes] = useState<
        Array<{
            title: string | null | undefined;
            noteContent: string | null | undefined;
            isPinned: boolean;
            isArchived: boolean;
        }>
    >([]);

    const addNote = (
        title: string | null | undefined,
        noteContent: string | null | undefined,
        isPinned: boolean,
        isArchived: boolean
    ) => {
        const newNote = {
            title: title,
            noteContent: noteContent,
            isPinned: isPinned,
            isArchived: isArchived,
        };

        setNotes([...notes, newNote]);
    };

    const [gridView, setGridView] = useState(true);

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
            <Header gridView={gridView} setGridView={setGridView} />
            <Nav />
            <Routes>
                <Route
                    index
                    element={
                        <Notes
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            notes={notes}
                            addNote={addNote}
                        />
                    }
                />
                <Route
                    path="/notes"
                    element={
                        <Notes
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            notes={notes}
                            addNote={addNote}
                        />
                    }
                />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/trash" element={<Trash />} />
            </Routes>
        </div>
    );
};

export default KeepApp;
