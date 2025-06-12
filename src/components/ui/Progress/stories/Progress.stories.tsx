import React, { useEffect, useState } from 'react';
import Progress from '../Progress';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const size = ['small', 'medium', 'large', 'x-large'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Progress',
    component: Progress,
    render: (args: React.JSX.IntrinsicAttributes) => {
        const [value, setValue] = useState(10);
        return (<SandboxEditor>
            <div className='space-y-4 my-10'>
                <Progress.Root value={value} maxValue={100} minValue={0}  {...args}>
                    <Progress.Indicator />
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
        label: 'progress label',
    },
    
};

export const Color = {
    args: {
        color: 'green'
    }
};

export const Sizes = () => {
    const [value, setValue] = useState(50);
    return (
      <SandboxEditor>
        
        <div className="flex flex-col space-y-4">
          {size.map((size, index) => {
            return (
              <Progress.Root
                key={index}
                size={size}
                value={value}
                maxValue={100}
                minValue={0}
              >
                <Progress.Indicator />
              </Progress.Root>
            );
          })}
        </div>
        <Button
        className="mt-4"
          onClick={() => {
            // randomize value
            setValue(Math.floor(Math.random() * 100));
          }}
        >
          Animate!
        </Button>
      </SandboxEditor>
    );
}

