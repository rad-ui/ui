'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ToastProviderContext } from '../contexts/ToastContext';

export type ToastTitleProps = React.HTMLAttributes<HTMLElement>;

/**
 * Rendered as a plain element, not a heading: toasts are transient live-region
 * announcements, and headings inside them pollute the page outline.
 */
const ToastTitle = React.forwardRef<HTMLElement, ToastTitleProps>(
    ({ className, children, ...props }, ref) => {
        const { rootClass } = useContext(ToastProviderContext);
        return (
            <div
                ref={ref as React.Ref<HTMLDivElement>}
                className={clsx(rootClass && `${rootClass}-title`, className)}
                {...props}
            >
                {children}
            </div>
        );
    },
);

ToastTitle.displayName = 'ToastTitle';
export default ToastTitle;
