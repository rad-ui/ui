import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

// Prevent Floating UI's autoUpdate from triggering state updates outside of React
// "act" by calling the update callback synchronously inside an act wrapper.
// This avoids noisy warnings in tests while preserving the necessary initial
// measurement behaviour.
jest.mock('@floating-ui/react', () => {
    const actual = jest.requireActual('@floating-ui/react');
    return {
        ...actual,
        autoUpdate: (reference: unknown, floating: unknown, update: () => void) => {
            if (typeof update === 'function') {
                act(() => {
                    update();
                });
            }
            return () => {};
        }
    };
});

// Filter out React act warnings which originate from third-party libraries
// like Floating UI. These state updates are expected and do not affect the
// behaviour under test, so we silence them to keep test output clean.
const originalError = console.error;
console.error = (...args: unknown[]) => {
    const firstArg = args[0];
    if (typeof firstArg === 'string' && firstArg.includes('not wrapped in act')) {
        return;
    }
    originalError(...(args as Parameters<typeof originalError>));
};

// Silence specific console warnings that are noisy in tests
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
    const firstArg = String(args[0]);
    if (firstArg.includes('asChild prop requires exactly one valid child element')) {
        return;
    }
    originalWarn(...(args as Parameters<typeof originalWarn>));
};

export const ACCESSIBILITY_TEST_TAGS = ['wcag21a', 'wcag21aa'];
