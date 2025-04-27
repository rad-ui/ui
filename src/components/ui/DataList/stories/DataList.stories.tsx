import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import DataList from '../DataList';
import Badge from '~/components/ui/Badge/Badge';

const meta: Meta<typeof DataList> = {
    component: DataList,
    title: 'WIP/DataList'
};

export default meta;

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
