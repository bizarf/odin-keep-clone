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

describe("note editing", () => {
    it("user edits the title of a note", async () => {
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
        await user.click(screen.getByText("This is a test title"));
        // editing the note
        const titleInput = screen.getByRole("textbox", { name: "Note Title" });
        await user.type(titleInput, " edited");
        expect(titleInput).toHaveValue("This is a test title edited");
        await user.click(screen.getByText("Close"));
        expect(
            screen.getByText("This is a test title edited")
        ).toBeInTheDocument();
    });

    it("user edits the text content of a note", async () => {
        const user = userEvent.setup();

        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        // make a new note
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const textarea = screen.getByPlaceholderText("Take a note...");
        await user.type(textarea, "This is a test note");
        await user.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
        await user.click(screen.getByText("This is a test note"));
        // editing the note
        const noteContentInput = screen.getByRole("textbox", {
            name: "Note Content",
        });
        await user.type(noteContentInput, " edited");
        expect(noteContentInput).toHaveValue("This is a test note edited");
        await user.click(screen.getByText("Close"));
        expect(
            screen.getByText("This is a test note edited")
        ).toBeInTheDocument();
    });
});
