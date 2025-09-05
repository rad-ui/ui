'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableHead';

type TableHeadElement = React.ElementRef<'thead'>;
export type TableHeadProps = React.ComponentPropsWithoutRef<'thead'>;

const TableHead = React.forwardRef<TableHeadElement, TableHeadProps>(
    ({ children, className = 'header', ...props }, ref) => {
        return <thead ref={ref} className={clsx(className)} {...props}>
            {children}
        </thead>;
    }
);

TableHead.displayName = COMPONENT_NAME;

export default TableHead;
