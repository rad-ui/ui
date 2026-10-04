'use client';

import React from 'react';

import TableRoot from './fragments/TableRoot';
import TableHead from './fragments/TableHead';
import TableBody from './fragments/TableBody';
import TableRow from './fragments/TableRow';
import TableColumnCellHeader from './fragments/TableColumnCellHeader';
import TableColumnResizeHandle from './fragments/TableColumnResizeHandle';
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
    ColumnResizeHandle: typeof TableColumnResizeHandle;
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
Table.ColumnResizeHandle = TableColumnResizeHandle;

export type { TableRootProps, TableResizeHandleVisibility } from './fragments/TableRoot';
export type { TableBodyProps } from './fragments/TableBody';
export type { TableHeadProps } from './fragments/TableHead';
export type { TableRowProps } from './fragments/TableRow';
export type { TableCellProps } from './fragments/TableCell';
export type { TableColumnCellHeaderProps } from './fragments/TableColumnCellHeader';
export type { TableColumnResizeHandleProps } from './fragments/TableColumnResizeHandle';
export { useTable } from './fragments/TableRoot';
// Named part exports let React Server Components use `import * as Table from '@radui/ui/Table'`;
// property access on the default export is undefined across the client boundary.
export {
    TableRoot as Root,
    TableBody as Body,
    TableHead as Head,
    TableRow as Row,
    TableCell as Cell,
    TableColumnCellHeader as ColumnCellHeader,
    TableColumnResizeHandle as ColumnResizeHandle
};

export default Table;
