'use client';
import { useCallback, useState, useSyncExternalStore } from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';

// The open modals, oldest first. Only the newest one hides the page behind it, traps focus and
// closes on outside presses and Escape. Without this, two separate modals (a drawer, then a dialog
// opened from it) each treat the other as "outside": the drawer hides the dialog from screen readers
// and closes when you click in it.

type Layer = object;
let layers: Layer[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

/** Adds a layer to the stack while `open`; returns whether it's the top one (true while closed). */
export function useModalLayer(open: boolean): boolean {
    const [layer] = useState<Layer>(() => ({}));
    useLayoutEffect(() => {
        if (!open) return;
        layers = [...layers, layer];
        emit();
        return () => {
            layers = layers.filter((l) => l !== layer);
            emit();
        };
    }, [open, layer]);
    const getSnapshot = useCallback(() => layers.length === 0 || layers[layers.length - 1] === layer || !layers.includes(layer), [layer]);
    return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
