'use client';
import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TableRow';

export type TableRowProps = React.ComponentPropsWithoutRef<typeof Primitive.tr>;

const TableRow = React.forwardRef<React.ElementRef<typeof Primitive.tr>, TableRowProps>(
    ({ children, className = 'row', ...props }, ref) => {
        return (
            <Primitive.tr ref={ref} className={clsx(className)} {...props}>
                {children}
            </Primitive.tr>
        );
    }
);

TableRow.displayName = COMPONENT_NAME;

export default TableRow;
