/** @type {import('jest').Config} */
const config = {
    verbose: false, // enable to see the full test suite output, console.log, etc.
    testEnvironment: 'jsdom', // enable to use DOM APIs
    setupFilesAfterEnv: ['./src/setupTests.js'], // enable to use custom setup files
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy', // enable to mock CSS imports
        '^~/(.*)$': '<rootDir>/src/$1',
    },

};

module.exports = config;
