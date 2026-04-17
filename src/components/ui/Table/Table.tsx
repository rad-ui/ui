'use client';

import React from 'react';

import TableRoot from './fragments/TableRoot';
import TableHead from './fragments/TableHead';
import TableBody from './fragments/TableBody';
import TableRow from './fragments/TableRow';
import TableColumnCellHeader from './fragments/TableColumnCellHeader';
import TableCell from './fragments/TableCell';

// Empty props type - only supporting fragment exports
export type TableProps = React.HTMLAttributes<HTMLTableElement> & {
    children?: React.ReactNode;
};

interface TableComponent
    extends React.ForwardRefExoticComponent<
        TableProps & React.RefAttributes<HTMLTableElement>
    > {
    Root: typeof TableRoot;
    Body: typeof TableBody;
    Head: typeof TableHead;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    ColumnCellHeader: typeof TableColumnCellHeader;
}

// Empty implementation - we don't support direct usage
const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
    _props,
    _ref
) {
    console.warn(
        'Direct usage of Table is not supported. Please use Table.Root, Table.Head, etc. instead.'
    );
    return null;
}) as TableComponent;

Table.displayName = 'Table';

// Export fragments via direct assignment pattern
Table.Root = TableRoot;
Table.Body = TableBody;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.ColumnCellHeader = TableColumnCellHeader;

export type { TableRootProps } from './fragments/TableRoot';
export type { TableBodyProps } from './fragments/TableBody';
export type { TableHeadProps } from './fragments/TableHead';
export type { TableRowProps } from './fragments/TableRow';
export type { TableCellProps } from './fragments/TableCell';
export type { TableColumnCellHeaderProps } from './fragments/TableColumnCellHeader';
export default Table;
