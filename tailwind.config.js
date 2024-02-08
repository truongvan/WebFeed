/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#fcf8ee",
                    100: "#f6ebcf",
                    200: "#ecd79b",
                    300: "#e3bd66",
                    400: "#dca743",
                    500: "#d38a2d",
                    600: "#bc6c25",
                    700: "#9b4e22",
                    800: "#7f3f21",
                    900: "#69341e",
                    950: "#3b1a0d",
                },
            },
        },
    },
    plugins: [],
};
