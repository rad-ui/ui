import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dialog from '~/components/ui/Dialog/Dialog';
import HoverCard from '~/components/ui/HoverCard/HoverCard';
import Popover from '~/components/ui/Popover/Popover';
import Tooltip from '~/components/ui/Tooltip/Tooltip';

type ListenerTarget = Window | Document;
type ListenerMap = Record<'window' | 'document', string[]>;

const TARGETS: Array<{ name: keyof ListenerMap; target: ListenerTarget }> = [
    { name: 'window', target: window },
    { name: 'document', target: document }
];
const TRACKED_EVENT_TYPES = new Set([
    'click',
    'focusin',
    'focusout',
    'keydown',
    'mousedown',
    'mouseup',
    'pointerdown',
    'pointermove',
    'pointerup',
    'resize',
    'scroll',
    'touchend',
    'touchmove',
    'touchstart'
]);

function createGlobalListenerTracker() {
    const originals = new Map<ListenerTarget, {
        addEventListener: typeof window.addEventListener;
        removeEventListener: typeof window.removeEventListener;
    }>();
    const active = {
        window: new Map<string, number>(),
        document: new Map<string, number>()
    } satisfies Record<keyof ListenerMap, Map<string, number>>;
    const listenerIds = new WeakMap<EventListenerOrEventListenerObject, number>();
    let nextListenerId = 0;

    const getListenerId = (listener: EventListenerOrEventListenerObject | null) => {
        if (!listener) {
            return 'null';
        }

        const existingId = listenerIds.get(listener);
        if (existingId != null) {
            return String(existingId);
        }

        nextListenerId += 1;
        listenerIds.set(listener, nextListenerId);
        return String(nextListenerId);
    };

    const normalizeCapture = (options?: boolean | AddEventListenerOptions | EventListenerOptions) =>
        typeof options === 'boolean' ? options : Boolean(options?.capture);

    const record = (map: Map<string, number>, type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | EventListenerOptions) => {
        if (!TRACKED_EVENT_TYPES.has(type)) {
            return '';
        }

        const key = `${type}:${normalizeCapture(options)}:${getListenerId(listener)}`;
        map.set(key, (map.get(key) ?? 0) + 1);
        return key;
    };

    const removeRecord = (map: Map<string, number>, type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | EventListenerOptions) => {
        if (!TRACKED_EVENT_TYPES.has(type)) {
            return;
        }

        const key = `${type}:${normalizeCapture(options)}:${getListenerId(listener)}`;
        const current = map.get(key) ?? 0;

        if (current <= 1) {
            map.delete(key);
            return;
        }

        map.set(key, current - 1);
    };

    for (const { name, target } of TARGETS) {
        originals.set(target, {
            addEventListener: target.addEventListener,
            removeEventListener: target.removeEventListener
        });

        target.addEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
            record(active[name], type, listener, options);
            return originals.get(target)!.addEventListener.call(target, type, listener, options);
        }) as typeof target.addEventListener;

        target.removeEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => {
            removeRecord(active[name], type, listener, options);
            return originals.get(target)!.removeEventListener.call(target, type, listener, options);
        }) as typeof target.removeEventListener;
    }

    const snapshot = (): ListenerMap => ({
        window: Array.from(active.window.entries()).flatMap(([key, count]) => Array(count).fill(key)).sort(),
        document: Array.from(active.document.entries()).flatMap(([key, count]) => Array(count).fill(key)).sort()
    });

    const totalActive = () => snapshot().window.length + snapshot().document.length;

    const restore = () => {
        for (const { target } of TARGETS) {
            const original = originals.get(target);
            if (!original) continue;

            target.addEventListener = original.addEventListener;
            target.removeEventListener = original.removeEventListener;
        }
    };

    return {
        snapshot,
        totalActive,
        restore
    };
}

describe('Overlay listener cleanup', () => {
    test('Dialog cleans up global listeners after close and unmount while open', async() => {
        const tracker = createGlobalListenerTracker();

        try {
            const { unmount } = render(
                <Dialog.Root>
                    <Dialog.Trigger>Open dialog</Dialog.Trigger>
                    <Dialog.Overlay />
                    <Dialog.Content>
                        <Dialog.Title>Dialog title</Dialog.Title>
                        <Dialog.Close>Close dialog</Dialog.Close>
                    </Dialog.Content>
                </Dialog.Root>
            );

            const baseline = tracker.snapshot();
            const baselineTotal = tracker.totalActive();

            fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
            await screen.findByRole('dialog');
            expect(tracker.totalActive()).toBeGreaterThan(baselineTotal);

            fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
            await waitFor(() => {
                expect(screen.queryByRole('dialog')).toBeNull();
                expect(tracker.snapshot()).toEqual(baseline);
            });

            fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
            await screen.findByRole('dialog');
            expect(tracker.totalActive()).toBeGreaterThan(baselineTotal);

            unmount();
            await waitFor(() => {
                expect(tracker.snapshot()).toEqual(baseline);
            });
        } finally {
            tracker.restore();
        }
    });

    test('Popover does not accumulate listeners across repeated open and close cycles', async() => {
        const tracker = createGlobalListenerTracker();

        try {
            render(
                <div>
                    <button>Outside</button>
                    <Popover.Root>
                        <Popover.Trigger>Open popover</Popover.Trigger>
                        <Popover.Content>Popover body</Popover.Content>
                    </Popover.Root>
                </div>
            );

            const baseline = tracker.snapshot();
            const baselineTotal = tracker.totalActive();

            fireEvent.click(screen.getByRole('button', { name: 'Open popover' }));
            await screen.findByRole('dialog');
            const firstOpenCount = tracker.totalActive();
            expect(firstOpenCount).toBeGreaterThan(baselineTotal);

            fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
            await waitFor(() => {
                expect(screen.queryByRole('dialog')).toBeNull();
                expect(tracker.snapshot()).toEqual(baseline);
            });

            fireEvent.click(screen.getByRole('button', { name: 'Open popover' }));
            await screen.findByRole('dialog');
            expect(tracker.totalActive()).toBe(firstOpenCount);

            fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
            await waitFor(() => {
                expect(screen.queryByRole('dialog')).toBeNull();
                expect(tracker.snapshot()).toEqual(baseline);
            });
        } finally {
            tracker.restore();
        }
    });

    test('Nested popovers clean up listeners as inner and outer overlays close', async() => {
        const tracker = createGlobalListenerTracker();

        try {
            render(
                <div>
                    <button>Outside</button>
                    <Popover.Root>
                        <Popover.Trigger>Open outer</Popover.Trigger>
                        <Popover.Content>
                            <span>Outer body</span>
                            <Popover.Root>
                                <Popover.Trigger>Open inner</Popover.Trigger>
                                <Popover.Content>
                                    <span>Inner body</span>
                                    <Popover.Close>Close inner</Popover.Close>
                                </Popover.Content>
                            </Popover.Root>
                        </Popover.Content>
                    </Popover.Root>
                </div>
            );

            const baseline = tracker.snapshot();

            fireEvent.click(screen.getByRole('button', { name: 'Open outer' }));
            await screen.findByText('Outer body');
            fireEvent.click(screen.getByRole('button', { name: 'Open inner' }));
            await screen.findByText('Inner body');
            expect(tracker.totalActive()).toBeGreaterThan(0);

            fireEvent.click(screen.getByRole('button', { name: 'Close inner' }));
            await waitFor(() => {
                expect(screen.queryByText('Inner body')).toBeNull();
                expect(screen.getByText('Outer body')).toBeInTheDocument();
            });

            fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
            await waitFor(() => {
                expect(screen.queryByText('Outer body')).toBeNull();
                expect(tracker.snapshot()).toEqual(baseline);
            });
        } finally {
            tracker.restore();
        }
    });

    test('Tooltip only keeps global listeners during the active interaction lifecycle', async() => {
        const tracker = createGlobalListenerTracker();

        try {
            const { unmount } = render(
                <Tooltip.Root>
                    <Tooltip.Trigger>Tooltip trigger</Tooltip.Trigger>
                    <Tooltip.Content>Tooltip body</Tooltip.Content>
                </Tooltip.Root>
            );

            const baseline = tracker.snapshot();
            const baselineTotal = tracker.totalActive();

            fireEvent.mouseEnter(screen.getByText('Tooltip trigger'));
            await screen.findByRole('tooltip');

            fireEvent.mouseLeave(screen.getByText('Tooltip trigger'));
            await waitFor(() => {
                expect(screen.queryByRole('tooltip')).toBeNull();
                expect(tracker.snapshot()).toEqual(baseline);
            });

            fireEvent.mouseEnter(screen.getByText('Tooltip trigger'));
            await screen.findByRole('tooltip');

            unmount();
            await waitFor(() => {
                expect(tracker.snapshot()).toEqual(baseline);
            });
        } finally {
            tracker.restore();
        }
    });

    test('HoverCard ties scroll and dismissal listeners to open state and cleans them on unmount', async() => {
        const tracker = createGlobalListenerTracker();

        try {
            const beforeRender = tracker.snapshot();
            const { unmount } = render(
                <HoverCard.Root openDelay={0} closeDelay={0}>
                    <HoverCard.Trigger>Hover trigger</HoverCard.Trigger>
                    <HoverCard.Content>Hover body</HoverCard.Content>
                </HoverCard.Root>
            );

            const baseline = tracker.snapshot();
            const baselineTotal = tracker.totalActive();
            expect(baseline).toEqual(beforeRender);

            fireEvent.mouseEnter(screen.getByText('Hover trigger'));
            await screen.findByRole('dialog');
            const activeCount = tracker.totalActive();
            expect(activeCount).toBeGreaterThan(baselineTotal);

            fireEvent.mouseLeave(screen.getByText('Hover trigger'));
            await waitFor(() => {
                expect(screen.queryByRole('dialog')).toBeNull();
                expect(tracker.snapshot()).toEqual(baseline);
            });

            fireEvent.mouseEnter(screen.getByText('Hover trigger'));
            await screen.findByRole('dialog');
            expect(tracker.totalActive()).toBe(activeCount);

            unmount();
            await waitFor(() => {
                expect(tracker.snapshot()).toEqual(baseline);
            });
        } finally {
            tracker.restore();
        }
    });
});
