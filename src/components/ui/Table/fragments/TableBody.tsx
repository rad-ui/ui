'use client';
import React from 'react';
import clsx from 'clsx';
import TableContext from '../context/TableContext';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TableBody';

export type TableBodyProps = React.ComponentPropsWithoutRef<typeof Primitive.tbody>;

const TableBody = React.forwardRef<React.ElementRef<typeof Primitive.tbody>, TableBodyProps>(
    ({ children, className = '', ...props }, ref) => {
        const rootClass = React.useContext(TableContext)?.rootClass;
        return (
            <Primitive.tbody ref={ref} className={clsx(rootClass && `${rootClass}-body`, className)} {...props}>
                {children}
            </Primitive.tbody>
        );
    }
);

TableBody.displayName = COMPONENT_NAME;

export default TableBody;
