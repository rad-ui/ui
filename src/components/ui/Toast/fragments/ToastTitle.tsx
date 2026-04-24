'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ToastProviderContext } from '../contexts/ToastContext';

export type ToastTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

const ToastTitle = React.forwardRef<HTMLParagraphElement, ToastTitleProps>(
    ({ className, children, ...props }, ref) => {
        const { rootClass } = useContext(ToastProviderContext);
        return (
            <p
                ref={ref}
                className={clsx(rootClass && `${rootClass}-title`, className)}
                {...props}
            >
                {children}
            </p>
        );
    }
);

ToastTitle.displayName = 'ToastTitle';
export default ToastTitle;
