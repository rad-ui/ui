'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ToastProviderContext, ToastItemContext } from '../contexts/ToastContext';

export type ToastCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ToastClose = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
    ({ className, children, onClick, ...props }, ref) => {
        const { rootClass } = useContext(ToastProviderContext);
        const itemCtx = useContext(ToastItemContext);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            itemCtx?.dismiss();
        };

        return (
            <button
                ref={ref}
                type="button"
                aria-label="Close notification"
                className={clsx(rootClass && `${rootClass}-close`, className)}
                onClick={handleClick}
                {...props}
            >
                {children ?? '×'}
            </button>
        );
    }
);

ToastClose.displayName = 'ToastClose';
export default ToastClose;
