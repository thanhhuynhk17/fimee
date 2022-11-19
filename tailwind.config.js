/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            darkMode: 'class',
            colors: {
                mypurple: '#3a6186',
                myblue: '#89253e',
            },
            fontFamily: {
                opensans: ['Open Sans'],
            },
        },
    },
    plugins: [],
};
