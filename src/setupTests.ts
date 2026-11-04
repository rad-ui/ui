import * as axeCore from 'axe-core';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { DOCUMENT_OVERLAY_OPEN_ATTRIBUTE, resetDocumentOverlayOpenForTests } from '~/core/utils/documentOverlayOpen';

afterEach(() => {
    resetDocumentOverlayOpenForTests();
    // Node-environment tests (e.g. server rendering) have no DOM to reset.
    if (typeof document === 'undefined') return;
    document.documentElement.removeAttribute(DOCUMENT_OVERLAY_OPEN_ATTRIBUTE);
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
});


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
    if (firstArg.includes('Direct usage of') && firstArg.includes('is not supported')) {
        return;
    }
    if (firstArg.includes('Focus trap assertions skipped in jsdom')) {
        return;
    }
    originalWarn(...(args as Parameters<typeof originalWarn>));
};

// Every WCAG A/AA rule set, not just the rules WCAG 2.1 added: the 2.1 tags alone
// run 4 rules and skip names, labels and ARIA validity.
export const ACCESSIBILITY_TEST_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

// jsdom has no layout or rendering, so colour contrast can't be measured here;
// the docs build checks contrast in a real browser. floating-ui's focus guards
// are invisible, unnamed role="button" spans in Safari (jsdom reports itself as
// Safari); they're third-party plumbing, not something a consumer can name.
axeCore.configure({
    rules: [
        { id: 'color-contrast', enabled: false, tags: ['jsdom-unsupported'] },
        { id: 'aria-command-name', selector: '[role="link"], [role="button"]:not([data-floating-ui-focus-guard]), [role="menuitem"]' }
    ]
});

// Global Polyfills for jsdom environment
if (typeof window !== 'undefined') {
    // ResizeObserver
    global.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

    // PointerEvent
    // @ts-ignore
    if (!window.PointerEvent) {
        // @ts-ignore
        window.PointerEvent = MouseEvent;
    }
}
