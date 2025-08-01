'use client';

import React, { useEffect, useState } from 'react';
import { subscribe, removeToast, Toast } from '../contexts/toastStore';
import ToastRoot from "../fragments/ToastRoot";
import { AnimatePresence, motion } from 'framer-motion';

export function Toaster({ visibleToasts = 3, position = 'bottom-right' }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => subscribe(setToasts), []);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 w-80 pointer-events-none`}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => {
          const isStacked = index >= visibleToasts;
          const stackIndex = index - visibleToasts;

          // ✅ all toasts “pile” at bottom
          // newest toast at bottom, older ones stacked above
          const offset = index * -12; // each toast moves slightly UP behind the previous
          const scale = isStacked ? Math.max(0.85, 0.95 - stackIndex * 0.03) : 1;
          const opacity = isStacked ? Math.max(0.4, 0.8 - stackIndex * 0.1) : 1;

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{
                opacity,
                y: offset,
                scale,
              }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{
                position: 'absolute',  // ✅ crucial for piling
                bottom: 0,             // ✅ anchor all toasts to bottom
                right: 0,
                zIndex: toasts.length - index,
                pointerEvents: index === 0 ? 'auto' : 'none', // ✅ only top toast is clickable
              }}
            >
              <ToastRoot
                className={`px-4 py-2 rounded shadow text-white transition-all duration-300 ${
                  toast.type === 'success'
                    ? 'bg-green-600'
                    : toast.type === 'error'
                    ? 'bg-red-600'
                    : 'bg-gray-800'
                }`}
                asChild
              >
                <div className="flex items-center justify-between">
                  <span>{toast.message}</span>
                  <button
                    className="ml-2 text-sm opacity-70 hover:opacity-100"
                    onClick={() => removeToast(toast.id)}
                  >
                    ✕
                  </button>
                </div>
              </ToastRoot>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
