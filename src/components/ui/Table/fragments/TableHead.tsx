'use client';
import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TableHead';

export type TableHeadProps = React.ComponentPropsWithoutRef<typeof Primitive.thead>;

const TableHead = React.forwardRef<React.ElementRef<typeof Primitive.thead>, TableHeadProps>(
    ({ children, className = 'header', ...props }, ref) => {
        return (
            <Primitive.thead ref={ref} className={clsx(className)} {...props}>
                {children}
            </Primitive.thead>
        );
    }
);

TableHead.displayName = COMPONENT_NAME;

export default TableHead;
