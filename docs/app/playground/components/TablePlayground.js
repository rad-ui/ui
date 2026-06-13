'use client'

import Table from "@radui/ui/Table"
import ColorLooper from "../helpers/ColorLooper"

const rows = [
    { id: "1", name: "Accordion", status: "Ready", coverage: "Docs + playground" },
    { id: "2", name: "Tooltip", status: "Ready", coverage: "Docs + playground" },
    { id: "3", name: "Link", status: "Docs missing", coverage: "Playground only" }
]

const TablePlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Table"
            docsLink="/docs/components/table"
            description="Composable table primitives for structured comparisons and dense datasets."
        >
            <Table.Root>
                <Table.Head>
                    <Table.Row>
                        <Table.ColumnCellHeader>Component</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>Status</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>Coverage</Table.ColumnCellHeader>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {rows.map((row) => (
                        <Table.Row key={row.id}>
                            <Table.Cell>{row.name}</Table.Cell>
                            <Table.Cell>{row.status}</Table.Cell>
                            <Table.Cell>{row.coverage}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </ColorLooper>
    </div>
)

export default TablePlayground
