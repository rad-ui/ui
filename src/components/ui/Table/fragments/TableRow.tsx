'use client';
import React from 'react';
import clsx from 'clsx';
import TableContext from '../context/TableContext';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TableRow';

export type TableRowProps = React.ComponentPropsWithoutRef<typeof Primitive.tr>;

const TableRow = React.forwardRef<React.ElementRef<typeof Primitive.tr>, TableRowProps>(
    ({ children, className = 'row', ...props }, ref) => {
        // Namespaced class is always applied so styling survives a consumer className.
        // The unprefixed default (`row`) is kept for backward compatibility.
        const rootClass = React.useContext(TableContext)?.rootClass;
        return (
            <Primitive.tr ref={ref} className={clsx(rootClass && `${rootClass}-row`, className)} {...props}>
                {children}
            </Primitive.tr>
        );
    }
);

TableRow.displayName = COMPONENT_NAME;

export default TableRow;
