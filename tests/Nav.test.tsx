import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { HashRouter } from "react-router-dom";
import Nav from "../src/components/Nav";
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

describe("Nav tabs render", () => {
    it("Notes tab should be rendered", () => {
        render(<Nav mainMenuOpen={true} theme={""} />, { wrapper: HashRouter });
        const noteEl = screen.getByText("Notes");
        expect(noteEl).toBeVisible();
        expect(noteEl).toBeInTheDocument();
    });

    it("Reminders tab should be rendered", () => {
        render(<Nav mainMenuOpen={true} theme={""} />, { wrapper: HashRouter });
        const remindersEl = screen.getByText("Reminders");
        expect(remindersEl).toBeVisible;
        expect(remindersEl).toBeInTheDocument();
    });
});

describe("tabs go to their respective pages", () => {
    it("clicking the reminders tab opens the reminders page", async () => {
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });

        const user = userEvent.setup();
        const remindersTab = screen.getByRole("button", { name: "Reminders" });
        await user.click(remindersTab);
        const remindersHeader = screen.getByRole("heading", {
            name: "Notes with upcoming reminders appear here",
        });
        expect(remindersHeader).toBeInTheDocument();
        expect(remindersHeader).toBeVisible();
    });

    it("clicking the notes tab navigates to the notes page from the reminders page", async () => {
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });

        const user = userEvent.setup();
        const remindersTab = screen.getByRole("button", { name: "Reminders" });
        await user.click(remindersTab);
        const remindersHeader = screen.getByRole("heading", {
            name: "Notes with upcoming reminders appear here",
        });
        expect(remindersHeader).toBeInTheDocument();

        const notesTab = screen.getByRole("button", { name: "Notes" });
        await user.click(notesTab);
        const notePlaceHolder = screen.getByText("Take a note...");
        expect(notePlaceHolder).toBeInTheDocument();
        expect(notePlaceHolder).toBeVisible();
    });

    it("clicking the archive tab opens the archive page", async () => {
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });

        const user = userEvent.setup();
        const archiveTab = screen.getByRole("button", { name: "Archive" });
        await user.click(archiveTab);
        const archiveHeader = screen.getByRole("heading", {
            name: "Your archived notes appear here",
        });
        expect(archiveHeader).toBeInTheDocument();
        expect(archiveHeader).toBeVisible();
    });

    it("clicking the trash tab opens the trash page", async () => {
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });

        const user = userEvent.setup();
        const trashTab = screen.getByRole("button", { name: "Trash" });
        await user.click(trashTab);
        const trashHeader = screen.getByRole("heading", {
            name: "No notes in Trash",
        });
        const trashSevenDaysNote = screen.getByText(
            "Notes in Trash are deleted after 7 days."
        );
        expect(trashHeader).toBeInTheDocument();
        expect(trashHeader).toBeVisible();
        expect(trashSevenDaysNote).toBeInTheDocument();
        expect(trashSevenDaysNote).toBeVisible();
    });
});
