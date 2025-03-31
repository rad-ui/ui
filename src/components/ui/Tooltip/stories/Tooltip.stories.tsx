import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '../Tooltip';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { Placement } from '@floating-ui/react';

const placement = ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end'] satisfies Placement[];

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-3 p-[200px]">
                {placement.map((p) => (
                    <Tooltip.Root key={p} placement={p}>
                        <Tooltip.Trigger asChild>
                            <button className='bg-red-500'>Trigger</button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                            <p>{p}</p>
                        </Tooltip.Content>
                    </Tooltip.Root>
                ))}
            </div>
        </SandboxEditor>
    )
};
