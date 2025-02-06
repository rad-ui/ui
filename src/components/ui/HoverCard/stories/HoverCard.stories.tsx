import React from 'react';
import HoverCard from '../HoverCard';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/HoverCard',
    component: HoverCard,
    render: (args: React.JSX.IntrinsicAttributes) => {
        const Content = () => {
            return <div>
                <div className=' space-y-2'>
                The quick brown fox jumps over the lazy dog
                </div>
            </div>;
        };
        return <SandboxEditor className='bg-gray-200 h-[400px] flex items-center justify-center'>
            <HoverCard content={<Content />} {...args} >
                <div className="p-10 bg-gray-100 rounded-md shadow">Hover me</div>
            </HoverCard>
        </SandboxEditor>;
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: 'text-gray-900 text-center'
    }
};

export const Controlled = {
    args: {
        open: true
    }
};
