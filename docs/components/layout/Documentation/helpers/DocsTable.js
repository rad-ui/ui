"use client"
import Table from "@radui/ui/Table"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import Heading from '@radui/ui/Heading';


const DocsTable = ({ title = 'API Documentation', columns = [], data = [] }) => {
    return <div className="my-10">
        <div className="mb-4">
            <BookMarkLink id="api-documentation"> <Heading as="h6">{title}</Heading> </BookMarkLink>
        </div>
        <Table.Root>
            <Table.Head>
                <Table.Row>
                    {columns.map((column, idx) => (
                        <Table.ColumnCellHeader key={idx}>{column.name}</Table.ColumnCellHeader>
                    ))}
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {data.map((row, idx) => (
                    <Table.Row key={idx}>
                        {columns.map((column, idx) => (
                            <Table.Cell key={idx}>{row[column.id]}</Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </div>
}

export default DocsTable;