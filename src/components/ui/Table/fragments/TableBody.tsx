'use client';
import React from 'react';
import clsx from 'clsx';
import TableContext from '../context/TableContext';

const COMPONENT_NAME = 'TableBody';

export type TableBodyProps = React.ComponentPropsWithoutRef<'tbody'>;

const TableBody = React.forwardRef<React.ElementRef<'tbody'>, TableBodyProps>(
    ({ children, className = '', ...props }, ref) => {
        const rootClass = React.useContext(TableContext)?.rootClass;
        return (
            <tbody ref={ref} className={clsx(rootClass && `${rootClass}-body`, className)} {...props}>
                {children}
            </tbody>
        );
    }
);

TableBody.displayName = COMPONENT_NAME;

export default TableBody;
