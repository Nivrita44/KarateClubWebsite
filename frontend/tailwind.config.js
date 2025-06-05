/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#000000", // Bold black
                accent: "#F3E8A8", // Soft yellow-gold
                background: "#E8E3DD", // Neutral beige
            },
            gridTemplateColumns: {
                auto: "repeat(auto-fill, minmax(200px,1fr))",
            },

        },
    },
    plugins: [],
};