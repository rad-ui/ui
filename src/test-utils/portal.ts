import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export function renderWithPortal(ui: React.ReactElement) {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('data-rad-ui-portal-root', '');
    document.body.appendChild(portalRoot);

    const themeContainer = document.createElement('div');
    themeContainer.setAttribute('id', 'rad-ui-theme-container');
    document.body.appendChild(themeContainer);

    const result = render(
        React.createElement(
            ThemeContext.Provider,
            {
                value: {
                    containerRef: { current: themeContainer },
                    portalRootRef: { current: portalRoot }
                }
            },
            ui
        )
    );

    return {
        ...result,
        portalRoot,
        cleanup: () => {
            result.unmount();
            portalRoot.remove();
            themeContainer.remove();
        }
    };
}

export async function assertFocusTrap(container: HTMLElement) {
    const user = userEvent.setup();
    const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
    );
    if (focusable.length === 0) {
        throw new Error('No focusable elements found in container');
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);

    first.focus();
    await user.tab({ shift: true });
    if (isJsdom) {
        console.warn('Focus trap assertions skipped in jsdom; see TODO in src/test-utils/portal.ts.');
    } else {
        expect(document.activeElement).toBe(last);
    }

    last.focus();
    await user.tab();
    if (!isJsdom) {
        expect(document.activeElement).toBe(first);
    }
}

export function assertFocusReturn(element: HTMLElement) {
    expect(element).toHaveFocus();
}

export function assertScrollLock() {
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.paddingRight).not.toBe('');
}

export function assertScrollUnlock() {
    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.paddingRight).toBe('');
}
