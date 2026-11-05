'use client';
import { useCallback, useSyncExternalStore } from 'react';

// The highlighted item of a list (Combobox, Select, Menu) lives in this store, not in the Root's context value. Arrow keys change
// it on every press; in the context, that gave every option a new context value, so a 300-item
// list re-rendered all 300 options per key. Options subscribe to "am I the active one?", so only
// the option losing the highlight and the one gaining it re-render.

export type ActiveIndexStore = {
    get: () => number | null;
    set: (index: number | null) => void;
    subscribe: (listener: () => void) => () => void;
};

export function createActiveIndexStore(): ActiveIndexStore {
    let value: number | null = null;
    const listeners = new Set<() => void>();
    return {
        get: () => value,
        set: (index) => {
            if (index === value) return;
            value = index;
            listeners.forEach((listener) => listener());
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        }
    };
}

/** The highlighted index; re-renders the caller on every change. */
export function useActiveIndex(store: ActiveIndexStore): number | null {
    return useSyncExternalStore(store.subscribe, store.get, store.get);
}

/** Whether `index` is the highlighted one; re-renders only when that answer changes. */
export function useIsActiveIndex(store: ActiveIndexStore, index: number): boolean {
    const getSnapshot = useCallback(() => store.get() === index, [store, index]);
    return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

/** A store that never changes, for an item rendered outside its list. */
export const EMPTY_ACTIVE_INDEX_STORE: ActiveIndexStore = { get: () => null, set: () => {}, subscribe: () => () => {} };
