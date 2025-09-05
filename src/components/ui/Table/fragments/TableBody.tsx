'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableBody';

type TableBodyProps = React.ComponentPropsWithoutRef<'tbody'>;

const TableBody = React.forwardRef<React.ElementRef<'tbody'>, TableBodyProps>(
    ({ children, className = '', ...props }, ref) => {
        return (
            <tbody ref={ref} className={clsx(className)} {...props}>
                {children}
            </tbody>
        );
    }
);

TableBody.displayName = COMPONENT_NAME;

export default TableBody;
