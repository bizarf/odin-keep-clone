import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { HashRouter } from "react-router-dom";
import App from "../src/App";
import "./setup";

describe("demo account tests", () => {
    it("user clicks the demo mode button", async () => {
        const user = userEvent.setup();

        render(<App />);
        await user.click(screen.getByRole("button", { name: "Demo mode" }));
        expect(screen.getByText("Take a note...")).toBeInTheDocument();
    });

    it("user logs out of the account", async () => {
        const user = userEvent.setup();

        render(<App />);
        expect(screen.getByText("Take a note...")).toBeInTheDocument();
        await user.click(screen.getByLabelText("user account control"));

        // await user.click(screen.getByText("Sign out"));
        // await user.click(screen.getByRole("button", { name: "Sign out" }));
        expect(screen.getByRole("button", { name: "Demo mode" }));
    });
});
