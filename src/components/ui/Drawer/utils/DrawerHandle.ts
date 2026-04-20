'use client';

type Listener = () => void;

/**
 * Detached triggers need a stable object they can call without depending on
 * a mounted drawer subtree. The handle keeps a tiny mutable store for the
 * current open state, active trigger id, and optional payload.
 */
export class DrawerHandle<Payload = unknown> {
    private listeners = new Set<Listener>();

    private _isOpen = false;

    triggerId: string | null = null;

    payload: Payload | undefined;

    get isOpen() {
        return this._isOpen;
    }

    sync(next: { isOpen: boolean; triggerId?: string | null; payload?: Payload | undefined }) {
        this._isOpen = next.isOpen;
        this.triggerId = next.triggerId ?? this.triggerId;
        this.payload = next.payload;
        this.emit();
    }

    open(triggerId: string | null = null) {
        this._isOpen = true;
        this.triggerId = triggerId;
        this.emit();
    }

    openWithPayload(payload: Payload) {
        this._isOpen = true;
        this.triggerId = null;
        this.payload = payload;
        this.emit();
    }

    close() {
        this._isOpen = false;
        this.emit();
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private emit() {
        this.listeners.forEach((listener) => listener());
    }
}

export function createHandle<Payload = unknown>() {
    return new DrawerHandle<Payload>();
}

export default DrawerHandle;
