'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ToastProviderContext } from '../contexts/ToastContext';

export type ToastContentProps = React.HTMLAttributes<HTMLDivElement>;

const ToastContent = React.forwardRef<HTMLDivElement, ToastContentProps>(
    ({ className, children, ...props }, ref) => {
        const { rootClass } = useContext(ToastProviderContext);
        return (
            <div
                ref={ref}
                className={clsx(rootClass && `${rootClass}-content`, className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ToastContent.displayName = 'ToastContent';
export default ToastContent;
