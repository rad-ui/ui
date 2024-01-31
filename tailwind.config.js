/** @type {import('tailwindcss').Config} */

import {colors} from './styles/jsTokens';

module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                ...colors,
            },
        },
    },
    plugins: [],
};

