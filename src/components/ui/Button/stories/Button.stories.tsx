import React from 'react';
import Button from '../Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { ArrowRight } from 'lucide-react';

const BUTTON_TEXT = 'Proceed';
const BUTTON_VARIANTS = ['solid', 'soft', 'outline', 'ghost'];
const BUTTON_SIZES = ['small', 'medium', 'large', 'x-large'];

const renderButtonContent = () => (
    <>
        <div>{BUTTON_TEXT}</div>
        <ArrowRight className="text-current" size={16} />
    </>
);
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

                {BUTTON_VARIANTS.map((variant, index) => {
                    return <Button key={index} variant={variant} {...args}>
                        {renderButtonContent()}
                    </Button>;
                })}
                <Button {...args}>
                    {renderButtonContent()}
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

export const Variants = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Button Variants</p>
        </div>
        <div className='flex flex-wrap gap-2'>
            {BUTTON_VARIANTS.map((variant) => (
                <Button key={variant} variant={variant}>
                    {renderButtonContent()}
                </Button>
            ))}
        </div>
    </SandboxEditor>;
};

export const Sizes = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Button Sizes</p>
        </div>
        <div className=''>

            {BUTTON_VARIANTS.map((variant, index) => (
                <div key={index} className='mb-10'>
                    <span key={index} className="inline-flex items-start space-x-2">
                        {BUTTON_SIZES.map((size, index) => {
                            return <Button key={index} size={size} variant={variant} >
                                {renderButtonContent()}
                            </Button>;
                        })}
                    </span>
                </div>
            ))}

        </div>
    </SandboxEditor>;
};
