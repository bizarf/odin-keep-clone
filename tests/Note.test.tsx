import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import KeepApp from "../src/components/KeepApp";

describe("note adding", () => {
    it("check if note composer has rendered on the note page", () => {
        render(<KeepApp />, { wrapper: BrowserRouter });
        const composerPlaceholder = screen.getByText("Take a note...");
        expect(composerPlaceholder).toBeInTheDocument();
    });

    it("user successfully adds a note", async () => {
        render(<KeepApp />, { wrapper: BrowserRouter });
        const notesTab = screen.getByText("Notes");
        await userEvent.click(notesTab);
        const composerPlaceholder = screen.getByText("Take a note...");
        await userEvent.click(composerPlaceholder);
        const textarea = screen.getByPlaceholderText("Take a note...");
        await userEvent.type(textarea, "This is a test note");
        await userEvent.click(screen.getByText("Close"));
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
    });
});
