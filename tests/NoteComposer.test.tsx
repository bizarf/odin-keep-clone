import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import NoteComposer from "../src/components/NoteComposer";

describe("note composer rendering tests", () => {
    it("the composer placeholder renders", () => {
        render(
            <NoteComposer
                noteComposerOpen={false}
                setNoteComposerOpen={undefined}
                addNote={function (
                    title: string | null | undefined,
                    noteContent: string | null | undefined,
                    isPinned: boolean,
                    isArchived: boolean,
                    isTrash: boolean
                ): void {
                    throw new Error("Function not implemented.");
                }}
            />
        );
        const composerPlaceholder = screen.getByText("Take a note...");
        expect(composerPlaceholder).toBeInTheDocument();
    });
});
