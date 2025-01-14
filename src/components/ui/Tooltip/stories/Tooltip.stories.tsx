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
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-3">
                {placement.map((p) => (
                    <Tooltip label={p} placement={p} key={p} className='capitalize border border-neutral-600 p-4 rounded-md'>
                        <span>{p}</span>
                    </Tooltip>
                ))}
            </div>
        </SandboxEditor>
    )
};
