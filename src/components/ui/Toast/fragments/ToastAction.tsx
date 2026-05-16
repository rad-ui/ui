'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ToastProviderContext, ToastItemContext } from '../contexts/ToastContext';

export type ToastActionProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Base UI–style action button — merges `toast.actionProps` then your props.
 */
const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
    ({ className, children, type = 'button', ...props }, ref) => {
        const { rootClass } = useContext(ToastProviderContext);
        const itemCtx = useContext(ToastItemContext);
        const ap = itemCtx?.toast.actionProps;

        return (
            <button
                ref={ref}
                type={type}
                className={clsx(rootClass && `${rootClass}-action`, className)}
                {...ap}
                {...props}
            >
                {children ?? ap?.children}
            </button>
        );
    },
);

ToastAction.displayName = 'ToastAction';
export default ToastAction;
