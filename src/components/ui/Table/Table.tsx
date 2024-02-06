import React from 'react';

import TableRoot from './shards/TableRoot';
import TableHead from './shards/TableHead';
import TableBody from './shards/TableBody';
import TableRow from './shards/TableRow';
import TableColumnCellHeader from './shards/TableColumnCellHeader';

import TableCell from './shards/TableCell';

const Table = ({columns=[], data=[]}:any) => {
    return <TableRoot>
        <TableHead>
            <TableRow>
                <TableColumnCellHeader>Head</TableColumnCellHeader>
                <TableColumnCellHeader>Head 2</TableColumnCellHeader>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow >
                <TableCell >Hello</TableCell>
                <TableCell >Hello</TableCell>
            </TableRow>
        </TableBody>
    </TableRoot>;
};


Table.Root = TableRoot;
Table.Body = TableBody;
Table.Head = TableHead;
Table.Row = TableRow;

export default Table;
