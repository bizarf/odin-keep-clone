import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { HashRouter } from "react-router-dom";
import KeepApp from "../src/components/KeepApp";
import "./setup";

const mockUser = {
    displayName: "Test",
    email: "test@test.com",
    emailVerified: true,
    isAnonymous: false,
    metadata: { object: "object" },
    phoneNumber: "",
    photoURL: "",
    providerData: [{ object: "object" }],
    providerId: "1",
    tenantId: "1",
    uid: "demo",
    refreshToken: "1",
};

describe("note deletion", () => {
    it("user sends a note to the trash", async () => {
        const user = userEvent.setup();

        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        // make a new note
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const titlePlaceholder = screen.getByPlaceholderText("Title");
        await user.type(titlePlaceholder, "This is a test title");
        const closeBtn = screen.getByRole("button", { name: "Close" });
        await user.click(closeBtn);
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
        // deleting the note from the more option button
        const noteControlsMoreOptions = screen.getByRole("button", {
            name: "note more options",
        });
        await user.click(noteControlsMoreOptions);
        const sendToTrashBtn = screen.getByRole("button", {
            name: "Delete note",
        });
        await user.click(sendToTrashBtn);
        await user.click(screen.getByRole("button", { name: "Trash" }));
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
    });

    it("user restores the note", async () => {
        const user = userEvent.setup();

        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        // head back to the notes page and make a new note
        const notesTab = screen.getByRole("button", { name: "Notes" });
        await user.click(notesTab);
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const titlePlaceholder = screen.getByPlaceholderText("Title");
        await user.type(titlePlaceholder, "This is a test title");
        const closeBtn = screen.getByRole("button", { name: "Close" });
        await user.click(closeBtn);
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
        // deleting the note from the note controls more options button
        const noteControlsMoreOptions = screen.getByRole("button", {
            name: "note more options",
        });
        await user.click(noteControlsMoreOptions);
        const sendToTrashBtn = screen.getByRole("button", {
            name: "Delete note",
        });
        await user.click(sendToTrashBtn);
        await user.click(screen.getByRole("button", { name: "Trash" }));
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
        // restore the note
        await user.click(screen.getByRole("button", { name: "Restore" }));
        await user.click(notesTab);
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
    });

    it("user deletes the note", async () => {
        const user = userEvent.setup();

        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        // head back to the notes page and make a new note
        const notesTab = screen.getByRole("button", { name: "Notes" });
        await user.click(notesTab);
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const titlePlaceholder = screen.getByPlaceholderText("Title");
        await user.type(titlePlaceholder, "This is a test title");
        const closeBtn = screen.getByRole("button", { name: "Close" });
        await user.click(closeBtn);
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
        // deleting the note from the note controls more options button
        const noteControlsMoreOptions = screen.getByRole("button", {
            name: "note more options",
        });
        await user.click(noteControlsMoreOptions);
        const sendToTrashBtn = screen.getByRole("button", {
            name: "Delete note",
        });
        await user.click(sendToTrashBtn);
        await user.click(screen.getByRole("button", { name: "Trash" }));
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
        // restore the note
        await user.click(
            screen.getByRole("button", { name: "Delete forever" })
        );
        expect(
            screen.queryByText("This is a test title")
        ).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "No notes in Trash" }));
        await user.click(notesTab);
        expect(
            screen.queryByText("This is a test title")
        ).not.toBeInTheDocument();
    });
});
