import React from 'react';
import ScrollArea from '../index';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/ScrollArea',
    component: ScrollArea,
    render: (args: any) => <SandboxEditor>
        <div >
            <div className='flex space-x-2 w-full flex-1'>
                <ScrollArea {...args} />
            </div>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        children: <div>
            {Array.from({ length: 100 }).map((_, index) => (
                <div key={index}>{index}</div>
            ))}
        </div>
    }
};
