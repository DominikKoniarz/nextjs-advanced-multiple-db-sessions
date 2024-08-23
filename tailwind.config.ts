import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#635bff",
                "primary-content": "#ffffff",
                "primary-dark": "#3228ff",
                "primary-light": "#938eff",

                secondary: "#5bffb5",
                "secondary-content": "#005b32",
                "secondary-dark": "#28ff9e",
                "secondary-light": "#8effcc",

                background: "#efeff0",
                foreground: "#fbfbfb",
                border: "#dedee0",

                copy: "#252527",
                "copy-light": "#646369",
                "copy-lighter": "#8a898f",

                success: "#5bff5b",
                warning: "#ffff5b",
                error: "#ff5b5b",

                "success-content": "#005b00",
                "warning-content": "#5b5b00",
                "error-content": "#5b0000",
            },
        },
    },
    plugins: [],
};
export default config;
