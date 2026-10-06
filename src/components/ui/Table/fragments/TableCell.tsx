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
        const { resizable, rootClass } = useTable();
        const isResizable = resizable && columnIndex !== undefined;

        return (
            <td
                ref={ref}
                // Namespaced class is always applied so styling survives a consumer className.
                // The unprefixed `cell`/`resizable` classes are kept for backward compatibility.
                className={clsx(rootClass && `${rootClass}-cell`, className, isResizable && 'resizable')}
                data-resizable={isResizable ? '' : undefined}
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
