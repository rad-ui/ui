'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ToastProviderContext } from '../contexts/ToastContext';

export type ToastDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const ToastDescription = React.forwardRef<HTMLParagraphElement, ToastDescriptionProps>(
    ({ className, children, ...props }, ref) => {
        const { rootClass } = useContext(ToastProviderContext);
        return (
            <p
                ref={ref}
                className={clsx(rootClass && `${rootClass}-description`, className)}
                {...props}
            >
                {children}
            </p>
        );
    }
);

ToastDescription.displayName = 'ToastDescription';
export default ToastDescription;
