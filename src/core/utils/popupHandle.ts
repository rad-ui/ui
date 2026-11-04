import * as React from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';

export type PopupHandleState<P> = {
    open: boolean;
    payload: P | undefined;
    /** The trigger that opened it, so focus can return there. */
    trigger: HTMLElement | null;
};

type RegisteredTrigger<P> = { element: HTMLElement | null; payload: P | undefined };

/**
 * Connects triggers rendered anywhere to one popup (Dialog, Popover). Pass it
 * as `handle` to the Root and to any number of Triggers, each with its own
 * `payload`; the Root's children can be a function of the current payload.
 */
export type PopupHandle<P = unknown> = {
    open: (payload?: P, trigger?: HTMLElement | null) => void;
    close: () => void;
    getState: () => PopupHandleState<P>;
    subscribe: (listener: () => void) => () => void;
    /** Opens as if the trigger with this DOM `id` was used: its payload, anchored to it. Returns false if no such trigger is connected. */
    openTrigger: (id: string) => boolean;
    /** Internal: triggers register so `openTrigger` can find them. */
    registerTrigger: (trigger: RegisteredTrigger<P>) => () => void;
};

export const createPopupHandle = <P = unknown>(): PopupHandle<P> => {
    let state: PopupHandleState<P> = { open: false, payload: undefined, trigger: null };
    const listeners = new Set<() => void>();
    const triggers = new Set<RegisteredTrigger<P>>();
    const set = (next: PopupHandleState<P>) => {
        state = next;
        listeners.forEach((listener) => listener());
    };
    const open = (payload?: P, trigger: HTMLElement | null = null) => set({ open: true, payload, trigger });
    return {
        open,
        // Keep the payload while closing so exit animations still show the content.
        close: () => { if (state.open) set({ ...state, open: false }); },
        getState: () => state,
        subscribe: (listener) => {
            listeners.add(listener);
            return () => { listeners.delete(listener); };
        },
        openTrigger: (id) => {
            const match = Array.from(triggers).find((trigger) => trigger.element?.id === id);
            if (!match) return false;
            if (!state.open || state.trigger !== match.element || state.payload !== match.payload) open(match.payload, match.element);
            return true;
        },
        registerTrigger: (trigger) => {
            triggers.add(trigger);
            return () => { triggers.delete(trigger); };
        }
    };
};

/** Registers a detached trigger with its handle, so the Root's `triggerId` can find it. */
export const useHandleTriggerRegistration = <P>(
    handle: PopupHandle<P> | undefined,
    elementRef: React.RefObject<HTMLElement | null>,
    payload: P | undefined
) => {
    const entry = React.useRef<RegisteredTrigger<P>>({ element: null, payload });
    entry.current.payload = payload;
    useLayoutEffect(() => {
        if (!handle?.registerTrigger) return;
        entry.current.element = elementRef.current;
        return handle.registerTrigger(entry.current);
    });
};

/**
 * Root side of `triggerId` / `defaultTriggerId`: while the popup is open, it is
 * anchored to (and takes the payload of) the detached trigger with that DOM id.
 */
export const useHandleTriggerId = (
    handle: PopupHandle<any> | undefined,
    triggerId: string | null | undefined,
    defaultTriggerId: string | null | undefined,
    isOpen: boolean
) => {
    const id = triggerId !== undefined ? triggerId : defaultTriggerId;
    useLayoutEffect(() => {
        if (!handle?.openTrigger || !isOpen || id == null) return;
        // Uncontrolled: a trigger the user actually pressed wins over the default.
        if (triggerId === undefined && handle.getState().trigger) return;
        handle.openTrigger(id);
    }, [handle, id, isOpen, triggerId]);

    // Closed from outside (controlled `open`): release the handle so triggers stop showing open.
    const wasOpen = React.useRef(isOpen);
    useLayoutEffect(() => {
        if (wasOpen.current && !isOpen && handle?.getState().open) handle.close();
        wasOpen.current = isOpen;
    }, [handle, isOpen]);
};
