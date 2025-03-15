/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
<<<<<<< HEAD
        extend: {},
=======
        extend: {
            colors: {
                'primary': "#5f6fff"

            },
            gridTemplateColumns: {
                'auto': 'repeat(auto-fill, minmax(200px,1fr))'
            }
        },
>>>>>>> feature/AdmissionForm
    },
    plugins: [],
}