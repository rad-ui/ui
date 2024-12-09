import React from 'react';
import CopyPrimitive from '../index';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Primitives/CopyPrimitive',
    component: CopyPrimitive,
    render: (args: any) => <SandboxEditor>
        <div >
            <CopyPrimitive.Root {...args}>
                <CopyPrimitive.Trigger copyContent="Hello, world!" {...args}>Copy</CopyPrimitive.Trigger>
                <CopyPrimitive.Feedback {...args}>Copied!</CopyPrimitive.Feedback>
            </CopyPrimitive.Root>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Button = {
    args: {
        children: 'Copy'
    }
};
