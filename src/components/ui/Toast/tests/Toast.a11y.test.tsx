import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Toast, { ToastState, type CreateToastInput } from '../Toast';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') return;
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        }))
    });
};

// The viewport renders whatever `useToastManager()` reports, so a toast only
// exists once it has been added through the manager. Mirror the documented
// Toaster shape rather than injecting the toast by hand.
function Toaster() {
    const { toasts } = Toast.useToastManager();
    return (
        <Toast.Portal>
            <Toast.Viewport>
                {toasts.map((toast) => (
                    <Toast.Root key={toast.id} toast={toast}>
                        <Toast.Content>
                            <Toast.Title>{toast.title}</Toast.Title>
                            {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
                            <Toast.Close />
                        </Toast.Content>
                    </Toast.Root>
                ))}
            </Toast.Viewport>
        </Toast.Portal>
    );
}

function renderToasts() {
    return render(
        <Toast.Provider position="bottom-right">
            <Toaster />
        </Toast.Provider>
    );
}

// Toasts must be added *after* the Provider has subscribed. Doing it from a
// child effect races — React runs child effects first, so the toast would be
// created before `manager.subscribe` runs and be lost.
function emit(toast: CreateToastInput) {
    act(() => {
        ToastState.create(toast);
    });
}

describe('Toast accessibility', () => {
    beforeEach(() => mockMatchMedia());

    // The toast store is a module-level singleton, so anything added in one test
    // would otherwise be announced as part of the next one.
    afterEach(() => ToastState.dismissAll());

    // Toast.Portal mounts into the Theme portal root, falling back to
    // document.body, so the rendered toast is outside RTL's `container`.
    // Scanning `container` would assert against an empty subtree; the
    // scan boundary has to be `baseElement`.
    test('axe: no violations with an empty viewport', async() => {
        const { baseElement } = renderToasts();
        const results = await axe.run(baseElement, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('axe: no violations with a rendered toast', async() => {
        const { baseElement } = renderToasts();
        emit({ title: 'Saved', description: 'Your changes were saved.' });
        await waitFor(() => expect(screen.getByText('Saved')).toBeInTheDocument());
        // Guards the scan boundary: if the toast were outside `baseElement`
        // the run below would pass over an empty subtree again.
        expect(baseElement).toContainElement(screen.getByText('Saved'));
        const results = await axe.run(baseElement, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    // The viewport is the landmark that lets a screen reader user skip to
    // notifications; the individual toasts are the live regions.
    test('viewport is a named region', async() => {
        renderToasts();
        emit({ title: 'Saved' });
        await waitFor(() => expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument());
    });

    test('each toast is a polite status region', async() => {
        renderToasts();
        emit({ title: 'Saved', description: 'Your changes were saved.' });
        await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
        expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });

    // A high-priority toast must interrupt; otherwise an error sits unread in a
    // polite queue until the screen reader reaches it.
    test('high priority toast announces assertively', async() => {
        renderToasts();
        emit({ title: 'Payment failed', priority: 'high' });
        await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
        expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'assertive');
    });

    // role="region" on <ol> and role="status" on <li> are not allowed ARIA
    // roles for those elements (axe aria-allowed-role).
    test('viewport and toast elements carry allowed roles', async() => {
        const { baseElement } = renderToasts();
        emit({ title: 'Saved' });
        await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
        const results = await axe.run(baseElement, { runOnly: { type: 'rule', values: ['aria-allowed-role'] } });
        expect(results.violations.map(v => v.id)).toEqual([]);
    });

    test('toast title is not a heading', async() => {
        renderToasts();
        emit({ title: 'Saved' });
        await waitFor(() => expect(screen.getByText('Saved')).toBeInTheDocument());
        expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    test('renders title and description', async() => {
        renderToasts();
        emit({ title: 'Saved', description: 'Your changes were saved.' });
        await waitFor(() => expect(screen.getByText('Saved')).toBeInTheDocument());
        expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
    });
});
