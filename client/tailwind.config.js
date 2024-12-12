/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Acme', 'ui-sans-serif', 'system-ui'], // Set Acme as the default sans font
            },animation: {
              pulse: 'pulse-animation 1.5s infinite', // Custom pulse animation
            },
            keyframes: {
              'pulse-animation': {
                '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                '50%': { transform: 'scale(1.1)', opacity: '1' },
              },
            },
        },
    },
    plugins: [],
};
