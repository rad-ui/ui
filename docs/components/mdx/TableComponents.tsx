"use client"

import Table from "@radui/ui/Table"

export const TableRoot = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-x-auto my-6">
    <Table.Root>
      {children}
    </Table.Root>
  </div>
)

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <Table.Head>
    {children}
  </Table.Head>
)

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <Table.Body>
    {children}
  </Table.Body>
)

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <Table.Row>
    {children}
  </Table.Row>
)

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnCellHeader>
    {children}
  </Table.ColumnCellHeader>
)

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <Table.Cell>
    {children}
  </Table.Cell>
)

