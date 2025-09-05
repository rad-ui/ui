'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableColumnCellHeader';

type TableColumnCellHeaderElement = React.ElementRef<'th'>;
export type TableColumnCellHeaderProps = React.ComponentPropsWithoutRef<'th'>;

const TableColumnCellHeader = React.forwardRef<TableColumnCellHeaderElement, TableColumnCellHeaderProps>(
    ({ children, className = 'cell-header', ...props }, ref) => {
        return <th ref={ref} className={clsx(className)} {...props}>
            {children}
        </th>;
    }
);

TableColumnCellHeader.displayName = COMPONENT_NAME;

export default TableColumnCellHeader;
