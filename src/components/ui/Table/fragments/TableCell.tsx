'use client';
import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TableCell';

export type TableCellProps = React.ComponentPropsWithoutRef<typeof Primitive.td>;

const TableCell = React.forwardRef<React.ElementRef<typeof Primitive.td>, TableCellProps>(
    ({ children, className = 'cell', ...props }, ref) => {
        return (
            <Primitive.td ref={ref} className={clsx(className)} {...props}>
                {children}
            </Primitive.td>
        );
    }
);

TableCell.displayName = COMPONENT_NAME;

export default TableCell;
