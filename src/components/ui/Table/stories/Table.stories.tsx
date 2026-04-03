import Table from '../Table';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import Checkbox from '~/components/ui/Checkbox/Checkbox';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Table> = {
    title: 'WIP/Table',
    component: Table
};

export default meta;
type Story = StoryObj<any>;

const ChevronDownIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.13523 5.15803C3.3241 4.95657 3.64052 4.94636 3.84197 5.13523L7.50001 8.56463L11.158 5.13523C11.3595 4.94636 11.6759 4.95657 11.8648 5.15803C12.0537 5.35948 12.0434 5.6759 11.842 5.86477L7.84197 9.61477C7.64965 9.79505 7.35036 9.79505 7.15803 9.61477L3.15803 5.86477C2.95657 5.6759 2.94636 5.35948 3.13523 5.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
);

const DotsIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5Z" fill="currentColor" />
        <path d="M13.125 7.5C13.125 8.12132 12.6213 8.625 12 8.625C11.3787 8.625 10.875 8.12132 10.875 7.5C10.875 6.87868 11.3787 6.375 12 6.375C12.6213 6.375 13.125 6.87868 13.125 7.5Z" fill="currentColor" />
        <path d="M4.125 7.5C4.125 8.12132 3.62132 8.625 3 8.625C2.37868 8.625 1.875 8.12132 1.875 7.5C1.875 6.87868 2.37868 6.375 3 6.375C3.62132 6.375 4.125 6.87868 4.125 7.5Z" fill="currentColor" />
    </svg>
);

const SortIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.50005 1.04999C7.77619 1.04999 8.00005 1.27385 8.00005 1.54999V11.243L10.0965 9.14644C10.2918 8.95118 10.6084 8.95118 10.8036 9.14644C10.9989 9.34171 10.9989 9.65829 10.8036 9.85355L7.85361 12.8036C7.65835 12.9988 7.34177 12.9988 7.1465 12.8036L4.1965 9.85355C4.00124 9.65829 4.00124 9.34171 4.1965 9.14644C4.39177 8.95118 4.70835 8.95118 4.90361 9.14644L7.00005 11.2429V1.54999C7.00005 1.27385 7.22391 1.04999 7.50005 1.04999Z" fill="currentColor" />
    </svg>
);

const rows = [
    { id: '1', status: 'Success', email: 'ken99@example.com', amount: '$316.00' },
    { id: '2', status: 'Success', email: 'abe45@example.com', amount: '$242.00' },
    { id: '3', status: 'Processing', email: 'monserrat44@example.com', amount: '$837.00' },
    { id: '4', status: 'Success', email: 'silas22@example.com', amount: '$874.00' },
    { id: '5', status: 'Failed', email: 'carmella@example.com', amount: '$721.00' }
];

const DataTableExample = () => {
    return (
        <div className="w-full max-w-[43.5rem] rounded-[1.75rem] border border-gray-300 bg-gray-50 p-10">
            <div className="mb-5 flex items-center justify-between gap-4">
                <input
                    className="h-10 w-full max-w-[29rem] rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none"
                    placeholder="Filter emails..."
                    type="text"
                />
                <Button variant="outline">
                    <span>Columns</span>
                    <ChevronDownIcon />
                </Button>
            </div>

            <Table.Root>
                <Table.Head>
                    <Table.Row>
                        <Table.ColumnCellHeader style={{ width: '3rem' }}>
                            <Checkbox.Root aria-label="Select all rows">
                                <Checkbox.Indicator />
                            </Checkbox.Root>
                        </Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>Status</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>
                            <span className="inline-flex items-center gap-2">
                                <span>Email</span>
                                <SortIcon />
                            </span>
                        </Table.ColumnCellHeader>
                        <Table.ColumnCellHeader style={{ textAlign: 'right' }}>Amount</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader style={{ width: '3rem' }} />
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {rows.map((row) => (
                        <Table.Row key={row.id}>
                            <Table.Cell>
                                <Checkbox.Root aria-label={`Select ${row.email}`}>
                                    <Checkbox.Indicator />
                                </Checkbox.Root>
                            </Table.Cell>
                            <Table.Cell>{row.status}</Table.Cell>
                            <Table.Cell>{row.email}</Table.Cell>
                            <Table.Cell style={{ textAlign: 'right', fontWeight: 500 }}>{row.amount}</Table.Cell>
                            <Table.Cell style={{ textAlign: 'right' }}>
                                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700" type="button">
                                    <DotsIcon />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            <div className="mt-5 flex items-center justify-between gap-4 text-sm text-gray-700">
                <p>0 of 5 row(s) selected.</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Previous</Button>
                    <Button variant="outline">Next</Button>
                </div>
            </div>
        </div>
    );
};

export const Default: Story = {
    render: () => (
        <SandboxEditor>
            <DataTableExample />
        </SandboxEditor>
    )
};
