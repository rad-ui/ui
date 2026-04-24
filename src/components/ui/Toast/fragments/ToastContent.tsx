'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ToastProviderContext, ToastItemContext } from '../contexts/ToastContext';

export type ToastContentProps = React.HTMLAttributes<HTMLDivElement>;

const ToastContent = React.forwardRef<HTMLDivElement, ToastContentProps>(
    ({ className, children, ...props }, ref) => {
        const { rootClass } = useContext(ToastProviderContext);
        const itemCtx = useContext(ToastItemContext);

        return (
            <div
                ref={ref}
                className={clsx(rootClass && `${rootClass}-content`, className)}
                // Mirror the parent <li> state so CSS can target .content[data-behind]
                data-behind={itemCtx?.isBehind ? '' : undefined}
                data-expanded={itemCtx?.isExpanded ? '' : undefined}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ToastContent.displayName = 'ToastContent';
export default ToastContent;
