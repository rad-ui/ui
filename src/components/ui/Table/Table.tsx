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

// Empty implementation - we don't support direct usage
const Table = () => {
    console.warn('Direct usage of Table is not supported. Please use Table.Root, Table.Head, etc. instead.');
    return null;
};

// Export fragments via direct assignment pattern
Table.Root = TableRoot;
Table.Body = TableBody;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.ColumnCellHeader = TableColumnCellHeader;

export default Table;
