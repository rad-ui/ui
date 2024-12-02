import type { Config } from 'jest';

const config: Config = {
    verbose: false, // enable to see the full test suite output, console.log, etc.
    testEnvironment: 'jsdom', // enable to use DOM APIs
    setupFilesAfterEnv: ['./src/setupTests.ts'], // enable to use custom setup files
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy', // enable to mock CSS imports
        '^~/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: ['**/*.test.(js|jsx|ts|tsx)'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    clearMocks: true,
    maxWorkers: '50%',
    moduleDirectories: ['node_modules', 'src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest'
    }
};

export default config;
