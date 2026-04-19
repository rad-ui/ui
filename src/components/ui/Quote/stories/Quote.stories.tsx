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

export const Truncate = () => {
    return (
        <SandboxEditor>
            <div className="flex flex-col gap-6 max-w-sm">
                <div>
                    <p className="text-gray-500 text-xs mb-2">truncate: false (default)</p>
                    <Text className="text-gray-950">
                        <Quote>The only way to do great work is to love what you do. If you haven't found it yet, keep looking.</Quote>
                    </Text>
                </div>
                <div>
                    <p className="text-gray-500 text-xs mb-2">truncate: true</p>
                    <Text className="text-gray-950">
                        <Quote truncate>The only way to do great work is to love what you do. If you haven't found it yet, keep looking.</Quote>
                    </Text>
                </div>
            </div>
        </SandboxEditor>
    );
};
