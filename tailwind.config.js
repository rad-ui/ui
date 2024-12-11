/** @type {import('tailwindcss').Config} */

import radUIPreset from './styles/tailwind-presets/default';

module.exports = {
    presets: [radUIPreset],
    content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
    plugins: []
};
