'use client';
import React from 'react';
import clsx from 'clsx';
import TableColumnHeaderContext from '../context/TableColumnHeaderContext';
import { useTable } from './TableRoot';

const COMPONENT_NAME = 'TableColumnCellHeader';

export type TableColumnCellHeaderProps = React.ComponentPropsWithoutRef<'th'> & {
    columnIndex?: number;
};

const TableColumnCellHeader = React.forwardRef<
    React.ElementRef<'th'>,
    TableColumnCellHeaderProps
>(({ children, className = 'cell-header', columnIndex, style, ...props }, ref) => {
    const { resizable, registerColumnIndex } = useTable();
    const hasResizeHandle = resizable && columnIndex !== undefined;

    React.useLayoutEffect(() => {
        if (columnIndex !== undefined) {
            registerColumnIndex(columnIndex);
        }
    }, [columnIndex, registerColumnIndex]);

    const header = (
        <th
            ref={ref}
            className={clsx(className, hasResizeHandle && 'resizable')}
            style={style}
            {...props}
        >
            {children}
        </th>
    );

    if (columnIndex === undefined) {
        return header;
    }

    return (
        <TableColumnHeaderContext.Provider value={{ columnIndex }}>
            {header}
        </TableColumnHeaderContext.Provider>
    );
});

TableColumnCellHeader.displayName = COMPONENT_NAME;

export default TableColumnCellHeader;
