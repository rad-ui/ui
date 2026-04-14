// PostCSS configuration
// Supports both Tailwind CSS v3 and v4
// For v3: uses 'tailwindcss' plugin
// For v4: use '@tailwindcss/postcss' plugin instead

module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss': {}, // v3 plugin
        // For v4, replace 'tailwindcss' with '@tailwindcss/postcss'
        // '@tailwindcss/postcss': {},
        'autoprefixer': {},
    },
};
