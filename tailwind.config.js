/** @type {import('tailwindcss').Config} */

import radUIColors from './styles/jsTokens/base.tokens.js';

module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                ...radUIColors,
            },
        },
    },
    plugins: [],
};

