import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function renderWithPortal(ui: React.ReactElement) {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'rad-ui-theme-container');
    document.body.appendChild(portalRoot);
    const result = render(ui);
    return {
        ...result,
        portalRoot,
        cleanup: () => {
            result.unmount();
            portalRoot.remove();
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

    first.focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(last);

    last.focus();
    await user.tab();
    expect(document.activeElement).toBe(first);
}

export function assertFocusReturn(element: HTMLElement) {
    expect(element).toHaveFocus();
}

export function assertScrollLock() {
    expect(document.body.getAttribute('data-scroll-locked')).toBe('1');
}

export function assertScrollUnlock() {
    expect(document.body.getAttribute('data-scroll-locked')).toBeNull();
}
