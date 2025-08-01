export type Toast = {
    id: string;
    type: 'info' | 'success' | 'error';
    message: string;
    duration?: number;
    timeoutId?: NodeJS.Timeout;
    remainingTime?: number;
    startTime?: number;
  };
  
  let toasts: Toast[] = [];
  const listeners = new Set<(toasts: Toast[]) => void>();
  
  export function subscribe(listener: (toasts: Toast[]) => void) {
    listeners.add(listener);
    listener(toasts);
    return () => listeners.delete(listener);
  }
  
  export function addToast(toast: Omit<Toast, 'id'>) {
    const newToast: Toast = {
      id: crypto.randomUUID(),
      duration: toast.duration ?? 3000, // default 3s
      startTime: Date.now(),
      remainingTime: toast.duration ?? 3000,
      ...toast,
    };
  
    // schedule auto removal
    newToast.timeoutId = setTimeout(() => removeToast(newToast.id), newToast.duration);
  
    toasts = [newToast, ...toasts];
    listeners.forEach((l) => l(toasts));
  
    return newToast.id;
  }
  
  export function removeToast(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    listeners.forEach((l) => l(toasts));
  }
  
  // ✅ Pause/resume ALL toasts
  export function pauseAllToasts() {
    toasts.forEach(toast => {
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
        toast.timeoutId = undefined;
        toast.remainingTime =
          (toast.remainingTime ?? 3000) - (Date.now() - (toast.startTime ?? Date.now()));
      }
    });
  }
  
  export function resumeAllToasts() {
    toasts.forEach(toast => {
      if (toast.remainingTime && !toast.timeoutId) {
        toast.startTime = Date.now();
        toast.timeoutId = setTimeout(() => removeToast(toast.id), toast.remainingTime);
      }
    });
  }
  