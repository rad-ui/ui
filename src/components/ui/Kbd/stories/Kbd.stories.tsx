import React from 'react';
import Kbd, { KbdProps } from '../Kbd';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const KBD_SIZES = ['small', 'medium', 'large', 'x-large'] as const;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Kbd',
    component: Kbd,
    render: (args: React.JSX.IntrinsicAttributes & KbdProps) => <SandboxEditor>
        <div className='flex space-x-2'>
            <Kbd {...args}>Ctrl + X</Kbd>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: 'text-xs'
    }
};

export const Sizes = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Kbd Sizes</p>
        </div>
        <div>

            <div className="inline-flex items-start space-x-2">
                {KBD_SIZES.map((size, index) => {
                    return <Kbd key={index} size={size}>Ctrl + X</Kbd>;
                })}
            </div>

        </div>
    </SandboxEditor>;
};
