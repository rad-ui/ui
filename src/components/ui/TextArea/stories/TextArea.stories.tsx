import React from 'react';
import TextArea from '../TextArea';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const Template = (args:any) => {
    return <SandboxEditor className="space-y-4 pt-4">
        <TextArea {...args} >

        </TextArea>
    </SandboxEditor>;
};

export default {
    title: 'WIP/TextArea',
    component: TextArea,
    render: (args: React.JSX.IntrinsicAttributes) => <Template {...args} />
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
        placeholder: 'Type something here'
    }
};
