import React from 'react';
import Quote from '../Quote';
import Text from '~/components/ui/Text/Text';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Quote',
    component: Quote,
    render: (args:any) => <SandboxEditor>
        <div className='text-gray-950'>
            <Text className='text-gray-950'> <Quote> {`I'm not a monkey
I will not dance even if the beat's funky`}</Quote>  - Mike Shinoda </Text>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
