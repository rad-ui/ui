'use client';
import React from 'react';
import clsx from 'clsx';
import TableContext from '../context/TableContext';

const COMPONENT_NAME = 'TableRow';

export type TableRowProps = React.ComponentPropsWithoutRef<'tr'>;

const TableRow = React.forwardRef<React.ElementRef<'tr'>, TableRowProps>(
    ({ children, className = 'row', ...props }, ref) => {
        // Namespaced class is always applied so styling survives a consumer className.
        // The unprefixed default (`row`) is kept for backward compatibility.
        const rootClass = React.useContext(TableContext)?.rootClass;
        return (
            <tr ref={ref} className={clsx(rootClass && `${rootClass}-row`, className)} {...props}>
                {children}
            </tr>
        );
    }
);

TableRow.displayName = COMPONENT_NAME;

export default TableRow;
