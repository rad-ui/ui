import { Meta } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import DataList from '../DataList';
import Badge from '~/components/ui/Badge/Badge';

const DATA_LIST_SIZES = ['small', 'medium', 'large'];

const SampleItems = () => (
    <>
        <DataList.Item>
            <DataList.Label color='green'>Name</DataList.Label>
            <DataList.Value>Jane Smith</DataList.Value>
        </DataList.Item>
        <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>jane.smith@example.com</DataList.Value>
        </DataList.Item>
        <DataList.Item>
            <DataList.Label>Status</DataList.Label>
            <DataList.Value>
                <Badge color="green" size="small">Active</Badge>
            </DataList.Value>
        </DataList.Item>
    </>
);

const meta: Meta<typeof DataList> = {
    component: DataList,
    title: 'Components/DataList'
};

export default meta;

export const Sizes = () => {
    return (
        <SandboxEditor>
            {DATA_LIST_SIZES.map((size) => (
                <div key={size} className="mb-8">
                    <p className="text-[var(--rad-ui-text-secondary)] mb-2">size: {size}</p>
                    <DataList.Root size={size}>
                        <SampleItems />
                    </DataList.Root>
                </div>
            ))}
        </SandboxEditor>
    );
};

export const Colors = () => {
    return (
        <SandboxEditor>
            {['blue', 'green'].map((color) => (
                <div key={color} className="mb-8">
                    <p className="text-[var(--rad-ui-text-secondary)] mb-2">label color: {color}</p>
                    <DataList.Root>
                        <DataList.Item>
                            <DataList.Label color={color}>Name</DataList.Label>
                            <DataList.Value>Jane Smith</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label color={color}>Email</DataList.Label>
                            <DataList.Value>jane.smith@example.com</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label color={color}>Status</DataList.Label>
                            <DataList.Value>
                                <Badge color="green" size="small">Active</Badge>
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </div>
            ))}
        </SandboxEditor>
    );
};

export const Default = () => {
    return (
        <section>
            <SandboxEditor className="">
                <DataList.Root>
                    <DataList.Item>
                        <DataList.Label>Name</DataList.Label>
                        <DataList.Value>John Doe</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Email</DataList.Label>
                        <DataList.Value>john.doe@example.com</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Phone</DataList.Label>
                        <DataList.Value>+123 456 7890</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Address</DataList.Label>
                        <DataList.Value>123 Main St, Anytown, USA</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Status</DataList.Label>
                        <DataList.Value>
                            <Badge color="green" size="small">Active</Badge>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Actions</DataList.Label>
                        <DataList.Value>
                            This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </SandboxEditor>
        </section>
    );
};
