'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableColumnCellHeader';

type TableColumnCellHeaderProps = React.ComponentPropsWithoutRef<'th'>;

const TableColumnCellHeader = React.forwardRef<
    React.ElementRef<'th'>,
    TableColumnCellHeaderProps
>(({ children, className = 'cell-header', ...props }, ref) => {
    return (
        <th ref={ref} className={clsx(className)} {...props}>
            {children}
        </th>
    );
});

TableColumnCellHeader.displayName = COMPONENT_NAME;

export default TableColumnCellHeader;
