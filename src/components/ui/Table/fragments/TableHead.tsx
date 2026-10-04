'use client';
import React from 'react';
import clsx from 'clsx';
import TableContext from '../context/TableContext';

const COMPONENT_NAME = 'TableHead';

export type TableHeadProps = React.ComponentPropsWithoutRef<'thead'>;

const TableHead = React.forwardRef<React.ElementRef<'thead'>, TableHeadProps>(
    ({ children, className = 'header', ...props }, ref) => {
        // Namespaced class is always applied so styling survives a consumer className.
        // The unprefixed default (`header`) is kept for backward compatibility.
        const rootClass = React.useContext(TableContext)?.rootClass;
        return (
            <thead ref={ref} className={clsx(rootClass && `${rootClass}-head`, className)} {...props}>
                {children}
            </thead>
        );
    }
);

TableHead.displayName = COMPONENT_NAME;

export default TableHead;
