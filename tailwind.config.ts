import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
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
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
