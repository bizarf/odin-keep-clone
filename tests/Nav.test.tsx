import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Nav from "../src/components/Nav";
import KeepApp from "../src/components/KeepApp";

describe("Nav tabs render", () => {
    it("Notes tab should be rendered", () => {
        render(<Nav />, { wrapper: BrowserRouter });
        const noteEl = screen.getByText("Notes");
        expect(noteEl).toBeInTheDocument();
    });

    it("Reminders tab should be rendered", () => {
        render(<Nav />, { wrapper: BrowserRouter });
        const remindersEl = screen.getByText("Reminders");
        expect(remindersEl).toBeInTheDocument();
    });
});

describe("tabs go to their respective pages", () => {
    it("clicking the notes tab opens the notes page", async () => {
        render(<KeepApp />, { wrapper: BrowserRouter });
        const composerPlaceholder = screen.getByText("Take a note...");
        await userEvent.click(composerPlaceholder);
        const textarea = screen.getByPlaceholderText("Take a note...");
        await userEvent.type(textarea, "This is a test note");
        await userEvent.click(screen.getByText("Close"));
        const remindersEl = screen.getByText("Reminders");
        await userEvent.click(remindersEl);
        const noteEl = screen.getByText("Notes");
        await userEvent.click(noteEl);
        expect(screen.getByText("This is a test note")).toBeInTheDocument();
    });

    it("clicking the trash tab opens the trash page", async () => {
        render(<KeepApp />, { wrapper: BrowserRouter });
        const trashEl = screen.getByText("Trash");
        await userEvent.click(trashEl);
        const trashText = screen.getByText(
            "Notes in Trash are deleted after 7 days."
        );
        expect(trashText).toBeInTheDocument();
    });
});
