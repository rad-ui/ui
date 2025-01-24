import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '../Tooltip';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { Placement } from '@floating-ui/react';
import Primitive from '~/core/primitives/Primitive';

const placement = ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end'] satisfies Placement[];

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const WithArrow: Story = {
    render: () => (
        <SandboxEditor>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-3">
                {placement.map((p) => (
                    <Tooltip asChild label={p} className="rounded border border-neutral-400 capitalize p-2" placement={p} key={p}>
                        <Primitive.button>{p}</Primitive.button>
                    </Tooltip>
                ))}
            </div>
        </SandboxEditor>
    )
};

export const WithoutArrow: Story = {
    render: () => (
        <SandboxEditor>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-3">
                {placement.map((p) => (
                    <Tooltip asChild label={p} className="rounded border border-neutral-400 capitalize p-2" placement={p} key={p} showArrow={false}>
                        <Primitive.button>{p}</Primitive.button>
                    </Tooltip>
                ))}
            </div>
        </SandboxEditor>
    )
};
