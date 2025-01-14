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
        <SandboxEditor className="">
            <div>
                {placement.map((p) => (

                    <Tooltip label='Micheal Jackson' placement={p} key={p}>
                        <span>{p}</span>
                    </Tooltip>
                ))}
            </div>
        </SandboxEditor>
    )
};
