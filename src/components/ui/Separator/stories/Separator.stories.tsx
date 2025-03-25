import React, { JSX, ClassAttributes, HTMLAttributes } from 'react';
import Separator, { SeparatorProps } from '../Separator';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const textClasses = 'text-gray-950 text-sm font-light';
const Sizes = ['small', 'medium', 'large', 'x-large'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Separator',
    component: Separator,
    render: (args: JSX.IntrinsicAttributes & SeparatorProps) => <SandboxEditor>
        <div className='mt-5'>
            <div className='text-gray-950 font-bold text-xl'>Did you know Rad UI is great toolkit for your SaaS needs?</div>
            <Separator {...args} />
            <div className='flex items-center'>
                <div className={textClasses}>Accessible</div>
                <Separator orientation='vertical' {...args} />
                <div className={textClasses}>Easy to use APIs</div>
                <Separator orientation='vertical' {...args} />
                <div className={textClasses}>Modern</div>
            </div>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};

export const Color = {
    args: {
        color: 'blue'
    }
};

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Separator Size</p>
        </div>
        <div>
            <div className='flex flex-col'>
                {Sizes.map((size, index) => {
                    return <div>
                          <Separator key={index} size={size} />
                          </div>
                })}
            </div>
       </div>
    </SandboxEditor>;
};
