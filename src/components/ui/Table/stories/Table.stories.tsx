import Table from '../Table';
import Heading from '~/components/ui/Heading/Heading';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Table> = {
    title: 'Components/Table',
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
    // Define the types for our columns and data
    type Person = {
        name: string;
        age: number;
        id: string;
    };

    type Column = {
        name: string;
        id: keyof Person;
    };

    const columns: Column[] = [
        { name: 'Name', id: 'name' },
        { name: 'Age', id: 'age' }
    ];

    const data: Person[] = [
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

const ResizableTableExample = () => {
    type Person = {
        name: string;
        age: number;
        role: string;
        id: string;
    };

    type Column = {
        name: string;
        id: keyof Person;
    };

    const columns: Column[] = [
        { name: 'Name', id: 'name' },
        { name: 'Age', id: 'age' },
        { name: 'Role', id: 'role' }
    ];

    const data: Person[] = [
        { name: 'John Doe', age: 25, role: 'Engineer', id: '1' },
        { name: 'Jane Doe', age: 24, role: 'Designer', id: '2' },
        { name: 'John Smith', age: 30, role: 'Manager', id: '3' },
        { name: 'Jane Smith', age: 29, role: 'Analyst', id: '4' }
    ];

    return (
        <Table.Root resizable>
            <Table.Head>
                <Table.Row>
                    {columns.map((column, columnIndex) => (
                        <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                            {column.name}
                            <Table.ColumnResizeHandle />
                        </Table.ColumnCellHeader>
                    ))}
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {data.map((row) => (
                    <Table.Row key={row.id}>
                        {columns.map((column, columnIndex) => (
                            <Table.Cell key={`${row.id}-${column.id}`} columnIndex={columnIndex}>
                                {row[column.id]}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

export const ResizableColumns: Story = {
    render: () => <ResizableTableExample />
};

export const ResizableColumnsAlwaysVisible: Story = {
    render: () => (
        <Table.Root resizable resizeHandleVisibility="always">
            <Table.Head>
                <Table.Row>
                    {[
                        { name: 'Name', id: 'name' },
                        { name: 'Age', id: 'age' },
                        { name: 'Role', id: 'role' }
                    ].map((column, columnIndex) => (
                        <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                            {column.name}
                            <Table.ColumnResizeHandle />
                        </Table.ColumnCellHeader>
                    ))}
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {[
                    { name: 'John Doe', age: 25, role: 'Engineer', id: '1' },
                    { name: 'Jane Doe', age: 24, role: 'Designer', id: '2' }
                ].map((row) => (
                    <Table.Row key={row.id}>
                        {['name', 'age', 'role'].map((columnId, columnIndex) => (
                            <Table.Cell key={`${row.id}-${columnId}`} columnIndex={columnIndex}>
                                {row[columnId as keyof typeof row]}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
};
