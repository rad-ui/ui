'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableBody';

type TableBodyElement = React.ElementRef<'tbody'>;
export type TableBodyProps = React.ComponentPropsWithoutRef<'tbody'>;

const TableBody = React.forwardRef<TableBodyElement, TableBodyProps>(
    ({ children, className = '', ...props }, ref) => {
        return <tbody ref={ref} className={clsx(className)} {...props}>
            {children}
        </tbody>;
    }
);

TableBody.displayName = COMPONENT_NAME;

export default TableBody;
