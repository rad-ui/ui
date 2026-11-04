'use client';
import React from 'react';
import clsx from 'clsx';
import TableColumnHeaderContext from '../context/TableColumnHeaderContext';
import { useTable } from './TableRoot';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TableColumnCellHeader';

export type TableColumnCellHeaderProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.th>, 'align'> & {
    columnIndex?: number;
    /** Horizontal alignment of the header text. Match the column's cells. */
    align?: 'start' | 'center' | 'end';
};

const TableColumnCellHeader = React.forwardRef<
    React.ElementRef<typeof Primitive.th>,
    TableColumnCellHeaderProps
>(({ children, className = 'cell-header', columnIndex, align, style, ...props }, ref) => {
    const { resizable, registerColumnIndex, rootClass } = useTable();
    const hasResizeHandle = resizable && columnIndex !== undefined;

    React.useLayoutEffect(() => {
        if (columnIndex !== undefined) {
            registerColumnIndex(columnIndex);
        }
    }, [columnIndex, registerColumnIndex]);

    const header = (
        <Primitive.th
            ref={ref}
            // Namespaced class is always applied so styling survives a consumer className.
            // The unprefixed `cell-header`/`resizable` classes are kept for backward compatibility.
            className={clsx(rootClass && `${rootClass}-cell-header`, className, hasResizeHandle && 'resizable')}
            data-resizable={hasResizeHandle ? '' : undefined}
            data-align={align}
            style={style}
            {...props}
        >
            {children}
        </Primitive.th>
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
