import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Nav from "../src/components/Nav";
import KeepApp from "../src/components/KeepApp";

const user = {
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
        render(<Nav mainMenuOpen={true} />, { wrapper: BrowserRouter });
        const noteEl = screen.getByText("Notes");
        expect(noteEl).toBeInTheDocument();
    });

    it("Reminders tab should be rendered", () => {
        render(<Nav mainMenuOpen={true} />, { wrapper: BrowserRouter });
        const remindersEl = screen.getByText("Reminders");
        expect(remindersEl).toBeInTheDocument();
    });
});

describe("tabs go to their respective pages", () => {
    it("clicking the notes tab opens the notes page", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await waitFor(() => userEvent.click(composerPlaceholder));
        const textarea = screen.getByPlaceholderText("Take a note...");
        await waitFor(() => userEvent.type(textarea, "This is a test note"));
        await waitFor(() => userEvent.click(screen.getByText("Close")));
        const remindersEl = screen.getByText("Reminders");
        await waitFor(() => userEvent.click(remindersEl));
        const noteEl = screen.getByText("Notes");
        await waitFor(() => userEvent.click(noteEl));
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
    });

    it("clicking the trash tab opens the trash page", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const trashEl = screen.getByText("Trash");
        await waitFor(() => userEvent.click(trashEl));
        const trashText = screen.getByText(
            "Notes in Trash are deleted after 7 days."
        );
        expect(trashText).toBeInTheDocument();
    });
});
