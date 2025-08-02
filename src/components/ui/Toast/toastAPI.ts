'use client';

import { addToast } from './contexts/toastStore';

export const toast = {
    create: (type: 'info' | 'success' | 'error', options: { message: string }) => {
        addToast({ type, message: options.message });
    },
    success: (message: string) => addToast({ type: 'success', message }),
    error: (message: string) => addToast({ type: 'error', message }),
    info: (message: string) => addToast({ type: 'info', message })
};
