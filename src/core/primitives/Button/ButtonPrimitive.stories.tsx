import React from 'react';
import ButtonPrimitive from '.';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Primitives/ButtonPrimitive',
    component: ButtonPrimitive,
    render: (args) => <SandboxEditor>
        <div >
            <div className='flex space-x-2 w-full flex-1'>
                <ButtonPrimitive {...args} />

            </div>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        role: 'button',
        children: 'Button'
    }
};

export const WithAriaLabel = {
    args: {
        role: 'button',
        label: 'Aria label test',
        children: 'Button'
    }
};

export const WithAriaDescription = {
    args: {
        role: 'button',
        description: 'This is a very mysterious button!',
        children: 'Button'
    }
};

export const AriaDisabled = {
    args: {
        role: 'button',
        disabled: true,
        children: 'Button'
    }
};
