import React from 'react';
import Button from '../Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { ArrowRight } from 'lucide-react';

const BUTTON_TEXT = 'Proceed';
const Variants = ['solid', 'soft', 'outline', 'ghost'];
const Sizes = ['small', 'medium', 'large', 'x-large'];
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Button',
    component: Button,
    render: (args: React.JSX.IntrinsicAttributes & { customRootClass?: string; variant?: string; size?: string; color?: string; } & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode | undefined; }) => <SandboxEditor>
        <div >
            <div className='mt-4 mb-2'>
                <p className='text-gray-950'>Button Variants</p>
            </div>
            <div className='flex'>

                {Variants.map((variant, index) => {
                    let label = `${variant} ${BUTTON_TEXT}`;
                    if (!BUTTON_TEXT) {
                        label = 'Proceed';
                    }
                    return <Button key={index} variant={variant} {...args}>
                        <div>{BUTTON_TEXT} </div> <ArrowRight className="text-accent-900" size={16} />
                    </Button>;
                })}
                <Button {...args}>
                    <div>{!BUTTON_TEXT} </div> <ArrowRight className="text-gray-50" size={16} />
                </Button>
            </div>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};

export const Color = {
    args: {
        color: 'yellow'
    }
};

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Button Size</p>
        </div>
        <div className=''>

            {Variants.map((variant, index) => (
                <div key={index} className='mb-10'>
                    <span key={index} className="inline-flex items-start space-x-2">
                        {Sizes.map((size, index) => {
                            return <Button key={index} size={size} variant={variant} >
                                <div>{BUTTON_TEXT} </div> <ArrowRight className="text-accent-900" size={16} />
                            </Button>;
                        })}
                    </span>
                </div>
            ))}

        </div>
    </SandboxEditor>;
};
