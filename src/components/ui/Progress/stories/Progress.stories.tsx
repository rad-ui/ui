import React, { useEffect, useState } from 'react';
import Progress from '../Progress';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Progress',
    component: Progress,
    render: (args: React.JSX.IntrinsicAttributes) => {
        const [value, setValue] = useState(10);
        console.log(value);
        return (<SandboxEditor>
            <div className='my-10 space-y-4'>
                <Progress.Root value={value} maxValue={100} minValue={0} {...args}>
                    <Progress.Indicator/>
                </Progress.Root>
                <Button
                    {...args}
                    onClick={() => {
                        // randomize value
                        setValue(Math.floor(Math.random() * 100));
                    }}>Animate!</Button>
            </div>
        </SandboxEditor>);
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        label: 'progress label'
    }
};

export const Color = {
    args: {
        color: 'green'
    }
};
