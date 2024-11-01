import React from 'react';
import TextField from '../TextField';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/TextField',
    component: TextField,
    render: (args) => <Template {...args} />
};

const Template = (args) => {
    return <SandboxEditor className="space-y-4 pt-4">
        <TextField {...args} />
    </SandboxEditor>;
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
