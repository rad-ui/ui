import React from 'react';
import Code, { CodeProps } from '../Code';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const Code_TEXT = 'console.log()';
const Variants = ['soft','outline'];
const Sizes = ['small','medium','large','x-large'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Code',
    component: Code,
    render: (args: React.JSX.IntrinsicAttributes & CodeProps) => <SandboxEditor>
        <div >
            <div className='flex space-x-2'>
                <Code {...args}>
         requestAnimationFrame()
                </Code>

                <Code {...args}>
                    {Code_TEXT}
                </Code>

            </div>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: 'space-x-1'
    }
};

export const Color = {
    args: {
        className: 'space-x-1',
        color: 'green'
    }
};

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Code Size</p>
        </div>
        <div>

            {Variants.map((variant, index) => (
                <div key={index} className='mb-10'>
                    <span key={index} className="inline-flex items-start space-x-2">
                        {Sizes.map((size, index) => {
                            return <Code key={index} size={size} variant={variant}>
                                 
                                   {Code_TEXT}

                            </Code>;
                        })}
                    </span>
                </div>
            ))}

        </div>
    </SandboxEditor>;
};

export const Variant = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Code Variant</p>
        </div>
        <div className='flex space-x-2'>

                        {Variants.map((variant, index) => {
                            return <Code key={index}  variant={variant} >
                                 {Code_TEXT}
                            </Code>;
                        })}

        </div>
    </SandboxEditor>;
};
