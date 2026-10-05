"use client"

import Table from "@radui/ui/Table"

export const TableRoot = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 w-full overflow-x-auto rounded-xl border border-gray-400 bg-gray-50">
    <Table.Root className="shadow-none">
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
    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-700">
      {children}
    </span>
  </Table.ColumnCellHeader>
)

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <Table.Cell>
    <span className="text-[0.92rem] leading-6 text-gray-950">
      {children}
    </span>
  </Table.Cell>
)
