"use client"
import Table from "@radui/ui/Table"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import Heading from '@radui/ui/Heading';


const DocsTable = ({ title = 'API Documentation', columns = [], data = [] }) => {
    console.log(columns, data)
    return <div>
        <BookMarkLink id="api-documentation"> <Heading as="h6" className="mb-4">{title}</Heading> </BookMarkLink>

        <Table.Root>
            <Table.Head>
                <Table.Row>
                    {columns.map((column) => (
                        <Table.ColumnCellHeader key={column} key={column.id}>{column.name}</Table.ColumnCellHeader>
                    ))}
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {data.map((row) => (
                    <Table.Row key={row.id}>
                        {columns.map((column) => (
                            <Table.Cell key={column.id}>{row[column.id]}</Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </div>
}

export default DocsTable;