import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
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
        await waitFor(() => userEvent.click(notesTab));
        const composerPlaceholder = screen.getByText("Take a note...");
        await waitFor(() => userEvent.click(composerPlaceholder));
        const textarea = screen.getByPlaceholderText("Take a note...");
        await waitFor(() => userEvent.type(textarea, "This is a test note"));
        await waitFor(() => userEvent.click(screen.getByText("Close")));
        await waitFor(() =>
            expect(screen.getByText("This is a test note")).toBeInTheDocument()
        );
    });

    it("if the title and textcontent are empty, then the note won't be added", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await waitFor(() => userEvent.click(composerPlaceholder));
        await waitFor(() => userEvent.click(screen.getByText("Close")));
        expect(<KeepApp user={user} setUser={undefined} />).toMatchSnapshot();
    });

    it("the note will be posted if the title has text, but the textcontent is empty", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await waitFor(() => userEvent.click(composerPlaceholder));
        const titlePlaceholder = screen.getByPlaceholderText("Title");
        await waitFor(() => userEvent.click(titlePlaceholder));
        await waitFor(() =>
            userEvent.type(titlePlaceholder, "This is a test title")
        );
        await waitFor(() => userEvent.click(screen.getByText("Close")));
        await waitFor(() =>
            expect(screen.getByText("This is a test title")).toBeInTheDocument()
        );
    });

    it("the note will be posted if the textcontent has text, but the title is empty", async () => {
        render(<KeepApp user={user} setUser={undefined} />, {
            wrapper: BrowserRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await waitFor(() => userEvent.click(composerPlaceholder));
        const textarea = screen.getByPlaceholderText("Take a note...");
        await waitFor(() => userEvent.type(textarea, "This is a test note"));
        await waitFor(() => userEvent.click(screen.getByText("Close")));
        await waitFor(() => {
            expect(screen.getByText("This is a test note")).toBeInTheDocument();
        });
    });
});

// describe("note editing", () => {
//     it("user edits the title of a note", async () => {
//         render(<KeepApp user={user} setUser={undefined} />, {
//             wrapper: BrowserRouter,
//         });
//         const composerPlaceholder = screen.getByText("Take a note...");
//         await waitFor(() => userEvent.click(composerPlaceholder));
//         const titlePlaceholder = screen.getByPlaceholderText("Title");
//         await waitFor(() => userEvent.click(titlePlaceholder));
//         await waitFor(() =>
//             userEvent.type(titlePlaceholder, "This is a test title")
//         );
//         await waitFor(() => userEvent.click(screen.getByText("Close")));
//         await waitFor(() =>
//             userEvent.click(screen.getByText("This is a test title"))
//         );
//         await waitFor(() =>
//             userEvent.type(screen.getByText("This is a test title"), " edited")
//         );
//         await waitFor(() => userEvent.click(screen.getByText("Close")));
//         await waitFor(() =>
//             expect(
//                 screen.getByText("This is a test title edited")
//             ).toBeInTheDocument()
//         );
//     });
// });
