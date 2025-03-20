import React from 'react';

import TableRoot from './fragments/TableRoot';
import TableHead from './fragments/TableHead';
import TableBody from './fragments/TableBody';
import TableRow from './fragments/TableRow';
import TableColumnCellHeader from './fragments/TableColumnCellHeader';

import TableCell from './fragments/TableCell';

const Table = ({ columns = [], data = [] }:any) => {
    const columnMap = columns.map((column:any) => {
        return column?.id || '';
    }
    );

    return <TableRoot>
        <TableHead>
            <TableRow>
                {
                    columns.map((column:any) => {
                        return <TableColumnCellHeader key={column?.id || ''} >{column?.name || ''}</TableColumnCellHeader>;
                    })
                }
            </TableRow>
        </TableHead>
        <TableBody>
            {
                data.map((row:any) => {
                    return <TableRow key={row.id} >
                        {
                            columnMap.map((column:any) => {
                                return <TableCell key={`${row.id}-${column}`}>
                                    {row[column] || ''}
                                </TableCell>;
                            })
                        }
                    </TableRow>;
                })
            }

        </TableBody>
    </TableRoot>;
};

Table.Root = TableRoot;
Table.Body = TableBody;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.ColumnCellHeader = TableColumnCellHeader;

export default Table;
