import React from 'react';
import { render, screen } from '@testing-library/react';
import ToastRoot from '../fragments/ToastRoot';
import { ToastProviderContext, type ToastData } from '../contexts/ToastContext';

function renderToast(toast: ToastData) {
    const toastManager = {
        defaultTimeout: 5000,
        subscribe: () => () => {},
        subscribeDismiss: () => () => {},
        subscribeUpdate: () => () => {},
        create: () => toast.id,
        update: () => {},
        dismiss: () => {},
        dismissAll: () => {},
        close: () => {}
    };

    const provider = {
        rootClass: '',
        position: 'bottom-right',
        expand: false,
        gap: 14,
        maxToasts: 3,
        defaultToastTimeout: 5000,
        toastManager,
        isHovered: false,
        setIsHovered: () => {},
        heights: new Map<string, number>(),
        updateHeight: () => {},
        unlinkStackHeight: () => {},
        removeToast: () => {},
        toasts: [toast],
        visibleToasts: [toast]
    };

    return render(
        <ToastProviderContext.Provider value={provider}>
            <ul>
                <ToastRoot toast={toast}>
                    <span>{toast.title}</span>
                </ToastRoot>
            </ul>
        </ToastProviderContext.Provider>
    );
}

describe('Toast announcement semantics', () => {
    test('uses polite aria-live by default', () => {
        renderToast({ id: '1', title: 'Saved', priority: 'low', duration: 5000 });

        const polite = screen.getByRole('status');
        expect(polite).toHaveAttribute('aria-live', 'polite');
        expect(polite).toHaveAttribute('aria-atomic', 'true');
    });

    test('uses assertive aria-live for high priority', () => {
        renderToast({ id: '2', title: 'Error', priority: 'high', duration: 5000 });

        const assertive = screen.getByText('Error').closest('[role="status"]');
        expect(assertive).toHaveAttribute('aria-live', 'assertive');
        expect(assertive).toHaveAttribute('aria-atomic', 'true');
    });
});
