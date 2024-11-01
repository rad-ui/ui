import React from 'react';
import TextField from '../TextField';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

import Button from '~/components/ui/Button/Button';

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

const WithFormTemplate = (args) => {
    const [value, setValue] = React.useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value);
    };

    return <SandboxEditor className="space-y-4 pt-4">
        <form onSubmit={handleSubmit}>
            <TextField {...args} value={value} onChange={handleChange} />
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </form>
    </SandboxEditor>;
};

export const WithForm = WithFormTemplate.bind({});
WithForm.args = {
};
