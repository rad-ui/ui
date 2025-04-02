"use client"
import Table from "@radui/ui/Table"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import Heading from '@radui/ui/Heading';
import Text from '@radui/ui/Text';
import Code from '@radui/ui/Code';

const DocsTable = ({ title = 'API Documentation', isAPI=false, description = '', columns = [], data = [] }) => {
    return <div className="my-20">
        <div className="mb-4 space-y-2">
            <BookMarkLink id="api-documentation"> <Heading as={isAPI ? "h3" : "h2"}>{title}</Heading> </BookMarkLink>
            <Text className="text-gray-950">{description}</Text>
        </div>
        <Table.Root>
            <Table.Head>
                <Table.Row>
                    {columns.map((column, idx) => (
                        <Table.ColumnCellHeader key={idx}>
                            {column.name}
                        </Table.ColumnCellHeader>
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