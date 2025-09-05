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
const Table = React.forwardRef<HTMLTableElement, TableProps>((_props, _ref) => {
    console.warn('Direct usage of Table is not supported. Please use Table.Root, Table.Head, etc. instead.');
    return null;
}) as TableComponent;

// Export fragments via direct assignment pattern
Table.Root = TableRoot;
Table.Body = TableBody;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.ColumnCellHeader = TableColumnCellHeader;

export default Table;
