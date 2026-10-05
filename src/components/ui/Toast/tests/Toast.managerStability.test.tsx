import React, { useEffect, useMemo } from 'react';
import { act, render, screen } from '@testing-library/react';
import Toast, { createToastManager } from '../Toast';
import type { ToastData } from '../Toast';

// Regression: every docs example cleared its toasts in an unmount effect. The
// manager's functions were recreated on every render, so the cleanup ran on the
// first re-render and dismissed the toast that had just been added, and no
// toast ever appeared.

function Toaster() {
    const { toasts } = Toast.useToastManager();
    return (
        <Toast.Portal>
            <Toast.Viewport>
                {toasts.map((t: ToastData) => (
                    <Toast.Root key={t.id} toast={t}>
                        <Toast.Content><Toast.Title>{t.title}</Toast.Title></Toast.Content>
                    </Toast.Root>
                ))}
            </Toast.Viewport>
        </Toast.Portal>
    );
}

// With unstable functions the cleanup -> dismissAll -> re-render cycle never
// ends. Fail fast instead of hanging the test run.
let renders = 0;
const MAX_RENDERS = 50;

function ClearsOnUnmount() {
    renders += 1;
    if (renders > MAX_RENDERS) throw new Error(`render loop: ${renders} renders`);
    const { add, dismissAll } = Toast.useToastManager();
    useEffect(() => () => dismissAll(), [dismissAll]);
    return (
        <>
            <Toaster />
            <button type="button" onClick={() => add({ title: 'Changes saved.' })}>Add</button>
        </>
    );
}

function Example({ children }: { children: React.ReactNode }) {
    const manager = useMemo(() => createToastManager(), []);
    return <Toast.Provider toastManager={manager}>{children}</Toast.Provider>;
}

describe('useToastManager stability', () => {
    beforeEach(() => { renders = 0; });

    test('a toast survives an unmount-cleanup effect keyed on dismissAll', async() => {
        render(<Example><ClearsOnUnmount /></Example>);
        await act(async() => { screen.getByText('Add').click(); });
        expect(await screen.findByText('Changes saved.')).toBeInTheDocument();
    });

    test('action functions keep their identity across renders and toast changes', async() => {
        const seen: Array<ReturnType<typeof Toast.useToastManager>> = [];
        function Probe() {
            const api = Toast.useToastManager();
            seen.push(api);
            return <button type="button" onClick={() => api.add({ title: 'One' })}>Add</button>;
        }
        render(<Example><Probe /></Example>);
        await act(async() => { screen.getByText('Add').click(); });

        const first = seen[0];
        const last = seen[seen.length - 1];
        expect(last.toasts).toHaveLength(1);
        for (const key of ['add', 'close', 'update', 'promise', 'dismiss', 'dismissAll', 'success', 'error'] as const) {
            expect(last[key]).toBe(first[key]);
        }
    });

    test('the cleanup still clears toasts when the component unmounts', async() => {
        const manager = createToastManager();
        const dismissSpy = jest.spyOn(manager, 'dismissAll');
        function Wrapper({ show }: { show: boolean }) {
            return <Toast.Provider toastManager={manager}>{show ? <ClearsOnUnmount /> : null}</Toast.Provider>;
        }
        const { rerender } = render(<Wrapper show />);
        await act(async() => { screen.getByText('Add').click(); });
        expect(dismissSpy).not.toHaveBeenCalled();
        rerender(<Wrapper show={false} />);
        expect(dismissSpy).toHaveBeenCalledTimes(1);
    });
});
