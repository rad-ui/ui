import Strong from '../Strong';
import Text from '~/components/ui/Text/Text';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Strong',
    component: Strong,
    render: () => <SandboxEditor>
        <div className='mt-5'>
            <Text className="text-gray-900">This is a very  <Strong className='text-gray-1000'>Strong</Strong> word</Text>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {};
