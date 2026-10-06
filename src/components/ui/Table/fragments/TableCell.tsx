'use client';
import React from 'react';
import clsx from 'clsx';
import { useTable } from './TableRoot';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TableCell';

export type TableCellProps = React.ComponentPropsWithoutRef<typeof Primitive.td> & {
    columnIndex?: number;
};

const TableCell = React.forwardRef<React.ElementRef<typeof Primitive.td>, TableCellProps>(
    ({ children, className = 'cell', columnIndex, style, ...props }, ref) => {
        const { resizable, rootClass } = useTable();
        const isResizable = resizable && columnIndex !== undefined;

        return (
            <Primitive.td
                ref={ref}
                // Namespaced class is always applied so styling survives a consumer className.
                // The unprefixed `cell`/`resizable` classes are kept for backward compatibility.
                className={clsx(rootClass && `${rootClass}-cell`, className, isResizable && 'resizable')}
                data-resizable={isResizable ? '' : undefined}
                style={style}
                {...props}
            >
                {children}
            </Primitive.td>
        );
    }
);

TableCell.displayName = COMPONENT_NAME;

export default TableCell;
