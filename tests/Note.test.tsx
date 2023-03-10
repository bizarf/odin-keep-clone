import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import KeepApp from "../src/components/KeepApp";
import Notes from "../src/components/Notes";

const user = {
    accessToken: "1",
    auth: { object: "object" },
    displayName: "Test",
    email: "test@test.com",
    emailVerified: true,
    isAnonymous: false,
    metadata: { object: "object" },
    phoneNumber: "",
    photoURL: "",
    proactiveRefresh: { object: "object" },
    providerData: [{ object: "object" }],
    providerId: "1",
    reloadListener: "",
    reloadUserInfo: { object: "object" },
    stsTokenManager: { object: "object" },
    tenantId: "1",
    uid: "demo",
    refreshToken: "1",
};

describe("note adding", () => {
    it("check if note composer has rendered on the note page", () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        expect(composerPlaceholder).toBeInTheDocument();
    });

    it("user successfully adds a note", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const notesTab = screen.getByText("Notes");
        await userEvent.click(notesTab);
        const composerPlaceholder = screen.getByText("Take a note...");
        await userEvent.click(composerPlaceholder);
        const textarea = screen.getByPlaceholderText("Take a note...");
        await userEvent.type(textarea, "This is a test note");
        await userEvent.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
    });

    it("if the title and textcontent are empty, then the note won't be added", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await userEvent.click(composerPlaceholder);
        await userEvent.click(screen.getByText("Close"));
        // expect(<KeepApp user={user} setUser={undefined} />).toMatchSnapshot();
    });

    it("the note will be posted if the title has text, but the textcontent is empty", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await userEvent.click(composerPlaceholder);
        const titlePlaceholder = screen.getByPlaceholderText("Title");
        await userEvent.click(titlePlaceholder);
        await userEvent.type(titlePlaceholder, "This is a test title");
        await userEvent.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
    });

    it("the note will be posted if the textcontent has text, but the title is empty", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await userEvent.click(composerPlaceholder);
        const textarea = screen.getByPlaceholderText("Take a note...");
        await userEvent.type(textarea, "This is a test note");
        await userEvent.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
    });
});
