import Table from '../Table';
import Heading from '~/components/ui/Heading/Heading';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Table> = {
    title: 'WIP/Table',
    component: Table,
    decorators: [(Story) => (
        <SandboxEditor>
            <div className='mx-auto my-10' style={{ maxWidth: '720px' }}>
                <Heading as="h6" className="mb-4 text-gray-1000">Table Example</Heading>
                <Story />
            </div>
        </SandboxEditor>
    )]
};

export default meta;
type Story = StoryObj<any>;

// Table example using composable API
const TableExample = () => {
    const columns = [
        { name: 'Name', id: 'name' },
        { name: 'Age', id: 'age' }
    ];

    const data = [
        { name: 'John Doe', age: 25, id: '1' },
        { name: 'Jane Doe', age: 24, id: '2' },
        { name: 'John Smith', age: 30, id: '3' },
        { name: 'Jane Smith', age: 29, id: '4' }
    ];

    return (
        <Table.Root>
            <Table.Head>
                <Table.Row>
                    {columns.map((column) => (
                        <Table.ColumnCellHeader key={column.id}>
                            {column.name}
                        </Table.ColumnCellHeader>
                    ))}
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {data.map((row) => (
                    <Table.Row key={row.id}>
                        {columns.map((column) => (
                            <Table.Cell key={`${row.id}-${column.id}`}>
                                {row[column.id]}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

export const Default: Story = {
    render: () => <TableExample />
};
