import React from 'react';
import Primitive from '.';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Primitives/Primitive',
    component: Primitive,
    render: (args: any) => <SandboxEditor>
        <div >
            <div className='flex space-x-2 w-full flex-1'>
                <Primitive.button {...args} />
            </div>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Button = {
    args: {
        role: 'button',
        children: 'Button'
    }
};

export const ButtonAsChild = {
    args: {
        asChild: true,
        children: <button>As Child Button</button>
    }
};
