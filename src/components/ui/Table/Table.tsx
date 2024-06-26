import React from 'react'

import TableRoot from './shards/TableRoot'
import TableHead from './shards/TableHead'
import TableBody from './shards/TableBody'
import TableRow from './shards/TableRow'
import TableColumnCellHeader from './shards/TableColumnCellHeader'

import TableCell from './shards/TableCell'

const Table = ({ columns = [], data = [] }: any) => {
  const columnMap = columns.map((column: any) => {
    return column?.key || ''
  })

  return (
    <TableRoot>
      <TableHead>
        <TableRow>
          {columns.map((column: any) => {
            return (
              <TableColumnCellHeader key={column?.key || ''}>
                {column?.name || ''}
              </TableColumnCellHeader>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row: any) => {
          return (
            <TableRow key={row.id}>
              {columnMap.map((column: any) => {
                if (row[column]) {
                  return <TableCell key={column}>{row[column]}</TableCell>
                }
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </TableRoot>
  )
}

Table.Root = TableRoot
Table.Body = TableBody
Table.Head = TableHead
Table.Row = TableRow

export default Table
