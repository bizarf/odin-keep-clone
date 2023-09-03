/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")[
                        "[data-theme=light]"
                    ],
                },
            },
            {
                dark: {
                    ...require("daisyui/src/theming/themes")[
                        "[data-theme=dark]"
                    ],
                    "base-100": "#202124",
                },
            },
        ],
    },
};
