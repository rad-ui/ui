'use client';
import React from 'react';
import clsx from 'clsx';
import { useTable } from './TableRoot';

const COMPONENT_NAME = 'TableCell';

export type TableCellProps = React.ComponentPropsWithoutRef<'td'> & {
    columnIndex?: number;
};

const TableCell = React.forwardRef<React.ElementRef<'td'>, TableCellProps>(
    ({ children, className = 'cell', columnIndex, style, ...props }, ref) => {
        const { resizable } = useTable();

        return (
            <td
                ref={ref}
                className={clsx(className, resizable && columnIndex !== undefined && 'resizable')}
                style={style}
                {...props}
            >
                {children}
            </td>
        );
    }
);

TableCell.displayName = COMPONENT_NAME;

export default TableCell;
