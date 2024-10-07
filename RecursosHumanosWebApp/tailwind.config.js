/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0B0060",
                "dark-purple": "#081A51",
                "light-white": "rgba(255,255,255,0.17)",
                gris: "#919191",
                azul: "#403fad"
            },
        },
    },
    plugins: [],
};