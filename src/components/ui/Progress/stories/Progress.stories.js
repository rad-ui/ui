import { useEffect, useState } from 'react';
import Progress from '../Progress';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Progress',
    component: Progress,
    render: (args) => {
        const [value, setValue] = useState(getRandomValue());

        useEffect(() => {
            const intervalId = setInterval(() => setValue(getRandomValue()), 2345);

            return () => clearInterval(intervalId);
        });

        return (<SandboxEditor>
            <div className='my-10'>
                <Progress value={value}/>
            </div>
        </SandboxEditor>);
    }
};

const getRandomValue = () => Math.trunc((Math.random() * 100));
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        label: 'progress label',
        maxValue: 100,
        value: 45
    }
};
