'use client';

export type Toast = {
    id: string;
    type: 'info' | 'success' | 'error';
    message: string;
  };

let toasts: Toast[] = [];
const listeners = new Set<(toasts: Toast[]) => void>();

export function subscribe(listener: (toasts: Toast[]) => void) {
    listeners.add(listener);
    listener(toasts); // send current toasts immediately
    return () => listeners.delete(listener);
}

export function addToast(toast: Omit<Toast, 'id'>) {
    const newToast = { id: crypto.randomUUID(), ...toast };
    toasts = [newToast, ...toasts];
    listeners.forEach((l) => l(toasts));

    // auto-remove after 3s
    setTimeout(() => removeToast(newToast.id), 5000);

    return newToast.id;
}

export function removeToast(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    listeners.forEach((l) => l(toasts));
}
