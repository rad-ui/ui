import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popover from '../Popover';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className='bg-gray-200 p-2'>Open</button>
                </Popover.Trigger>
                <Popover.Content>
                    <Popover.Arrow />
                    <div className='p-2'>Popover content</div>
                </Popover.Content>
            </Popover.Root>
        </SandboxEditor>
    )
};
