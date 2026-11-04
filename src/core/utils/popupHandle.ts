export type PopupHandleState<P> = {
    open: boolean;
    payload: P | undefined;
    /** The trigger that opened it, so focus can return there. */
    trigger: HTMLElement | null;
};

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
};

export const createPopupHandle = <P = unknown>(): PopupHandle<P> => {
    let state: PopupHandleState<P> = { open: false, payload: undefined, trigger: null };
    const listeners = new Set<() => void>();
    const set = (next: PopupHandleState<P>) => {
        state = next;
        listeners.forEach((listener) => listener());
    };
    return {
        open: (payload, trigger = null) => set({ open: true, payload, trigger }),
        // Keep the payload while closing so exit animations still show the content.
        close: () => { if (state.open) set({ ...state, open: false }); },
        getState: () => state,
        subscribe: (listener) => {
            listeners.add(listener);
            return () => { listeners.delete(listener); };
        }
    };
};
