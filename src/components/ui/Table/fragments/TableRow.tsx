'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableRow';

type TableRowElement = React.ElementRef<'tr'>;
export type TableRowProps = React.ComponentPropsWithoutRef<'tr'>;

const TableRow = React.forwardRef<TableRowElement, TableRowProps>(
    ({ children, className = 'row', ...props }, ref) => {
        return <tr ref={ref} className={clsx(className)} {...props}>
            {children}
        </tr>;
    }
);

TableRow.displayName = COMPONENT_NAME;

export default TableRow;
