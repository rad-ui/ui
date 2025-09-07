'use client';
import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
    forceMount?: boolean;
    role?: string;
    'aria-modal'?: boolean;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
}

const DialogPrimitiveContent = forwardRef<HTMLDivElement, DialogPrimitiveContentProps>(({
    children,
    asChild = false,
    forceMount = false,
    role = 'dialog',
    'aria-modal': ariaModal = true,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...props
}, ref) => {
    const { isOpen, getFloatingProps, floaterContext, refs, handleOpenChange } = useContext(DialogPrimitiveContext);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref, contentRef]);
    const shouldRender = isOpen || forceMount;
    const dataState = isOpen ? 'open' : 'closed';
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Store the previously focused element when dialog opens
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement as HTMLElement;
        }
    }, [isOpen]);

    // Auto-focus the first focusable element when the dialog opens (deferred to end of task).
    useEffect(() => {
        if (!isOpen) return;
        const root = contentRef.current;
        if (!root) return;
        const run = () => {
            const focusableSelector = [
                'button:not([disabled])',
                '[href]',
                'input:not([disabled])',
                'select:not([disabled])',
                'textarea:not([disabled])',
                '[tabindex]:not([tabindex="-1"])'
            ].join(',');

            const firstFocusable = root.querySelector<HTMLElement>(focusableSelector);
            if (firstFocusable) {
                firstFocusable.focus();
                // Remove tabIndex from content div when there are focusable children
                root.removeAttribute('tabindex');
            } else {
                (root as HTMLElement).focus({ preventScroll: true });
            }
        };
        // Use a longer delay to ensure the dialog is fully rendered and the trigger has released focus
        const timer = setTimeout(run, 50);
        return () => clearTimeout(timer);
    }, [isOpen]);

    // Return focus when dialog closes
    useEffect(() => {
        if (!isOpen && previousActiveElement.current) {
            const timer = setTimeout(() => {
                previousActiveElement.current?.focus();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <>
            {shouldRender && (
                <div
                    ref={mergedRef}
                    {...getFloatingProps()}
                    tabIndex={-1}
                    style={{ outline: 'none' }}
                    role={role}
                    aria-modal={ariaModal}
                    aria-labelledby={ariaLabelledBy}
                    aria-describedby={ariaDescribedBy}
                    data-state={dataState}
                    onKeyDown={(e) => {
                        // Handle escape key
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            e.stopPropagation();
                            handleOpenChange(false);
                        }

                        // Handle tab trapping
                        if (e.key === 'Tab') {
                            const focusableSelector = [
                                'button:not([disabled])',
                                '[href]',
                                'input:not([disabled])',
                                'select:not([disabled])',
                                'textarea:not([disabled])',
                                '[tabindex]:not([tabindex="-1"])'
                            ].join(',');

                            const focusableElements = Array.from(
                                contentRef.current?.querySelectorAll(focusableSelector) || []
                            ) as HTMLElement[];

                            if (focusableElements.length === 0) return;

                            const firstElement = focusableElements[0];
                            const lastElement = focusableElements[focusableElements.length - 1];

                            if (e.shiftKey) {
                                // Shift + Tab
                                if (document.activeElement === firstElement) {
                                    e.preventDefault();
                                    lastElement.focus();
                                }
                            } else {
                                // Tab
                                if (document.activeElement === lastElement) {
                                    e.preventDefault();
                                    firstElement.focus();
                                }
                            }
                        }
                    }}
                    {...props}
                >
                    {children}
                </div>
            )}
        </>
    );
});

DialogPrimitiveContent.displayName = 'DialogPrimitiveContent';

export default DialogPrimitiveContent;
