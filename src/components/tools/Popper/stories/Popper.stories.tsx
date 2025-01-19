import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Popper from '../Popper';

// eslint-disable-next-line no-unused-vars
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Popper>;

const meta: Meta<typeof Popper> = {
    component: Popper,
    title: 'tools/popper'
};

export default meta;

export const Defult: Story = {
    render: ({}) => (
        <SandboxEditor className=''>
            This is an example for popper
            <Popper pop={'hello world'}>
                <div>
                      Hover Over Me
                </div>
            </Popper>
        </SandboxEditor>
    )
};
