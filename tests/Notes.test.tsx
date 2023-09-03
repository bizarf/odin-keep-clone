import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { HashRouter } from "react-router-dom";
import KeepApp from "../src/components/KeepApp";
import App, { User } from "../src/App";

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

describe("note adding", () => {
    it("check if note composer has rendered on the note page", async () => {
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        expect(composerPlaceholder).toBeInTheDocument();
    });

    it("user successfully adds a note", async () => {
        const user = userEvent.setup();
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        const notesTab = screen.getByText("Notes");
        await user.click(notesTab);
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const textarea = screen.getByPlaceholderText("Take a note...");
        await user.type(textarea, "This is a test note");
        await user.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
    });

    it("if the title and textcontent are empty, then the note won't be added", async () => {
        const user = userEvent.setup();
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        await user.click(screen.getByRole("button", { name: "Close" }));
        expect(<KeepApp user={mockUser} setUser={vi.fn()} />).toMatchSnapshot();
    });

    it("the note will be posted if the title has text, but the textcontent is empty", async () => {
        const user = userEvent.setup();
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const titlePlaceholder = screen.getByPlaceholderText("Title");
        await user.click(titlePlaceholder);
        await user.type(titlePlaceholder, "This is a test title");
        await user.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test title")).toBeInTheDocument();
    });

    // it("the note will be posted if the textcontent has text, but the title is empty", async () => {
    //     render(<KeepApp user={user} setUser={undefined} />, {
    //         wrapper: BrowserRouter,
    //     });
    //     const composerPlaceholder = screen.getByText("Take a note...");
    //     userEvent.click(composerPlaceholder);
    //     const textarea = screen.getByPlaceholderText("Take a note...");
    //     userEvent.type(textarea, "This is a test note");
    //     userEvent.click(screen.getByText("Close"));
    //     expect(screen.getByText("This is a test note")).toBeInTheDocument();
    // });
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
