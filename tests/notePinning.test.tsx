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

describe("note pining", async () => {
    it("user pins a note", async () => {
        const user = userEvent.setup();
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const textarea = screen.getByPlaceholderText("Take a note...");
        await user.type(textarea, "This is a test note");
        await user.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "Unpinned note" }));
        expect(screen.getByText("PINNED")).toBeInTheDocument();
        expect(screen.getByText("OTHERS")).toBeInTheDocument();
    });

    it("user unpins a note", async () => {
        const user = userEvent.setup();
        render(<KeepApp user={mockUser} setUser={vi.fn()} />, {
            wrapper: HashRouter,
        });
        const composerPlaceholder = screen.getByText("Take a note...");
        await user.click(composerPlaceholder);
        const textarea = screen.getByPlaceholderText("Take a note...");
        await user.type(textarea, "This is a test note");
        await user.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "Unpinned note" }));
        expect(screen.getByText("PINNED")).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "Pinned note" }));
        expect(screen.queryByText("PINNED")).not.toBeInTheDocument();
    });
});
