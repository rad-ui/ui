'use client';
import React from 'react';
import clsx from 'clsx';

const COMPONENT_NAME = 'TableRow';

type TableRowProps = React.ComponentPropsWithoutRef<'tr'>;

const TableRow = React.forwardRef<React.ElementRef<'tr'>, TableRowProps>(
    ({ children, className = 'row', ...props }, ref) => {
        return (
            <tr ref={ref} className={clsx(className)} {...props}>
                {children}
            </tr>
        );
    }
);

TableRow.displayName = COMPONENT_NAME;

export default TableRow;
