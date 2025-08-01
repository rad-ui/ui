'use client';

import React, { useEffect, useState } from 'react';
import { subscribe, removeToast, Toast } from '../contexts/toastStore';

export function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => subscribe(setToasts), []);

    return (
        <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`px-4 py-2 rounded shadow text-white transition-all duration-300 ${
                        toast.type === 'success'
                            ? 'bg-green-600'
                            : toast.type === 'error'
                                ? 'bg-red-600'
                                : 'bg-gray-800'
                    }`}
                >
                    {toast.message}
                    <button
                        className="ml-2 text-sm opacity-70 hover:opacity-100"
                        onClick={() => removeToast(toast.id)}
                    >
            ✕
                    </button>
                </div>
            ))}
        </div>
    );
}
