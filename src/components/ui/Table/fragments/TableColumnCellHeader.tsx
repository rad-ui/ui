'use client';
import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TableColumnCellHeader';

export type TableColumnCellHeaderProps = React.ComponentPropsWithoutRef<typeof Primitive.th>;

const TableColumnCellHeader = React.forwardRef<
    React.ElementRef<typeof Primitive.th>,
    TableColumnCellHeaderProps
>(({ children, className = 'cell-header', ...props }, ref) => {
    return (
        <Primitive.th ref={ref} className={clsx(className)} {...props}>
            {children}
        </Primitive.th>
    );
});

TableColumnCellHeader.displayName = COMPONENT_NAME;

export default TableColumnCellHeader;
