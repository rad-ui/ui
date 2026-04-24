'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ToastProviderContext } from '../contexts/ToastContext';

export type ToastTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/** Base UI renders a heading — use `h2` for landmark semantics. */
const ToastTitle = React.forwardRef<HTMLHeadingElement, ToastTitleProps>(
    ({ className, children, ...props }, ref) => {
        const { rootClass } = useContext(ToastProviderContext);
        return (
            <h2
                ref={ref}
                className={clsx(rootClass && `${rootClass}-title`, className)}
                {...props}
            >
                {children}
            </h2>
        );
    },
);

ToastTitle.displayName = 'ToastTitle';
export default ToastTitle;
