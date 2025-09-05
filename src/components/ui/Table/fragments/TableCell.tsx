'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableCell';

type TableCellElement = React.ElementRef<'td'>;
export type TableCellProps = React.ComponentPropsWithoutRef<'td'>;

const TableCell = React.forwardRef<TableCellElement, TableCellProps>(
    ({ children, className = 'cell', ...props }, ref) => {
        return <td ref={ref} className={clsx(className)} {...props}>
            {children}
        </td>;
    }
);

TableCell.displayName = COMPONENT_NAME;

export default TableCell;
