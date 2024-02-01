
import {useEffect, useState} from 'react';
import * as Progress from './Progress';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Data Display/Progress',
    component: Progress,
    render: (args) => {
        const [value, setValue] = useState(getRandomValue());

        useEffect(() => {
            const intervalId = setInterval(() => setValue(getRandomValue()), 2345);

            return () => clearInterval(intervalId);
        });

        return (<SandboxEditor>
            <div className='my-10'>
                <Progress.Root value={value} className='h-12 rounded-full'>
                    <Progress.Indicator
                        className='transition ease-in-out duration-500 rounded-full bg-red-800'
                        style={{transform: `translateX(-${100 - value}%)`}}/>
                </Progress.Root>
            </div>
        </SandboxEditor>);
    },
};

const getRandomValue = () => Math.trunc((Math.random() * 100));
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        label: 'progress label',
        maxValue: 100,
        value: 45,
    },
};
