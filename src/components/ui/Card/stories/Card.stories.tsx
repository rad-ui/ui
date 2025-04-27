import Card from '~/components/ui/Card/Card';
import Avatar from '~/components/ui/Avatar/Avatar';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const Variants = ['soft', 'outline'];
const Sizes = ['small', 'medium', 'large', 'x-large'];

const CardStory = () => {
    return <Card className="bg-gray-200" >
        <div className='flex items-center space-x-4'>
            <Avatar
                src='https://i.pravatar.cc/64'
                alt='avatar'
                // size='lg' avatar doesn't have size prop
            />
            <div>
                <p className='font-bold text-gray-1000'>John Doe</p>
                <p className='text-xs text-gray-800'>
                    1 hour ago
                </p>
            </div>

        </div>
    </Card>;
};
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Card',
    component: Card,
    render: () => <SandboxEditor><CardStory/></SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {};

const Template = () => <div>
    <SandboxEditor className="gap-3 grid grid-cols-4">
        {Array(10).fill(0).map((_, i) => <CardStory key={i}/>)}
    </SandboxEditor>
</div>;
export const MultipleCards = Template.bind({});

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Card Size</p>
        </div>
        <div>

            {Variants.map((variant, index) => (
                <div key={index} className='mb-10'>
                    <span key={index} className="inline-flex items-start space-x-2">
                        {Sizes.map((size, index) => {
                            return <Card key={index} size={size} variant={variant} >
                                <div className='flex items-center space-x-4'>
                                    <Avatar
                                        src='https://i.pravatar.cc/64'
                                        alt='avatar'
                                    />
                                    <div>
                                        <p className='font-bold text-gray-1000'>John Doe</p>
                                        <p className='text-xs text-gray-800'>
                                     1 hour ago
                                        </p>
                                    </div>
                                </div>
                            </Card>;
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
            <p className='text-gray-950'>Card Variant</p>
        </div>
        <div className='flex space-x-2'>

            {Variants.map((variant, index) => {
                return <Card key={index} variant={variant} >
                    <div className='flex items-center space-x-4'>
                        <Avatar
                            src='https://i.pravatar.cc/64'
                            alt='avatar'
                        />
                        <div>
                            <p className='font-bold text-gray-1000'>John Doe</p>
                            <p className='text-xs text-gray-800'>
                          1 hour ago
                            </p>
                        </div>
                    </div>
                </Card>;
            })}

        </div>
    </SandboxEditor>;
};
