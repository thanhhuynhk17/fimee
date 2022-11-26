/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            darkMode: 'class',
            dropShadow: {
                tikBlue: '',
                tikRed: '',
            },
            fontFamily: {
                opensans: ['Open Sans'],
            },
        },
    },
    plugins: [],
};
