import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
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
        const remindersEl = screen.getByText("Reminders");
        await userEvent.click(remindersEl);
        const noteEl = screen.getByText("Notes");
        await userEvent.click(noteEl);
        // const notePlaceholder = screen.getByText("Notes go here");
        // expect(notePlaceholder).toBeInTheDocument();
    });

    it("clicking the reminders tab opens the reminders page", async () => {
        render(<KeepApp />, { wrapper: BrowserRouter });
        const remindersEl = screen.getByText("Reminders");
        await userEvent.click(remindersEl);
        const notePlaceholder = screen.getByText("Reminders go here");
        expect(notePlaceholder).toBeInTheDocument();
    });
});
