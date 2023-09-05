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

describe("note archiving", () => {
    it("user archives a note", async () => {
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
        const archiveButton = screen.getByLabelText("archive button");
        await user.click(archiveButton);
        const archiveTab = screen.getByRole("button", { name: "Archive" });
        await user.click(archiveTab);
        expect(screen.getByText("This is a test title"));
    });

    it("user unarchives a note", async () => {
        const user = userEvent.setup();

        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        // go back to the notes page and make a new note
        const notesTab = screen.getByRole("button", { name: "Notes" });
        await user.click(notesTab);
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const titlePlaceholder = screen.getByPlaceholderText("Title");
        await user.type(titlePlaceholder, "This is a test title");
        const closeBtn = screen.getByRole("button", { name: "Close" });
        await user.click(closeBtn);
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
        // archive the note
        const archiveButton = screen.getByLabelText("archive button");
        await user.click(archiveButton);
        const archiveTab = screen.getByRole("button", { name: "Archive" });
        await user.click(archiveTab);
        expect(screen.getByText("This is a test title"));
        // unarchive that note
        const unarchiveButton = screen.getByRole("button", {
            name: "Unarchive",
        });
        await user.click(unarchiveButton);
        await user.click(notesTab);
        expect(screen.getByText("This is a test title"));
    });
});
