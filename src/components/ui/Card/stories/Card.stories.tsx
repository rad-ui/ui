import Card from '~/components/ui/Card/Card';
import Avatar from '~/components/ui/Avatar/Avatar';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const PLACEHOLDER_AVATAR = require('/assets/images/avatar-1.jpg');

const Variants = ['soft', 'outline'];
const Sizes = ['small', 'medium', 'large', 'x-large'];

type CardStoryProps = {
    variant?: string;
    size?: string;
};

const CardStory = ({ variant, size }: CardStoryProps) => {
    return (
        <Card variant={variant} size={size}>
            <div className='flex items-center space-x-4'>
                <Avatar.Root>
                    <Avatar.Image
                        src={PLACEHOLDER_AVATAR}
                        alt='User avatar for John Doe'
                    />
                </Avatar.Root>
                <div>
                    <p className='font-semibold text-gray-950'>John Doe</p>
                    <p className='text-sm text-gray-700'>
                        1 hour ago
                    </p>
                </div>
            </div>
        </Card>
    );
};
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Card',
    component: Card,
    argTypes: {
        variant: {
            control: 'select',
            options: Variants,
            description: 'Card variant style'
        },
        size: {
            control: 'select',
            options: Sizes,
            description: 'Card size'
        }
    },
    args: {
        variant: 'soft',
        size: 'medium'
    },
    render: (args: CardStoryProps) => (
        <SandboxEditor>
            <CardStory variant={args.variant} size={args.size} />
        </SandboxEditor>
    )
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = () => (
    <SandboxEditor>
        <div className="w-full max-w-md">
            <Card>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Card Title</h3>
                    <p className="text-sm text-gray-700">
                        This is a card component with default styling. It provides a clean container
                        for your content with proper spacing and borders.
                    </p>
                </div>
            </Card>
        </div>
    </SandboxEditor>
);

export const WithContent = () => (
    <SandboxEditor>
        <div className="w-full max-w-md">
            <Card>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
                        <p className="text-sm text-gray-700">
                            Cards are flexible containers that can hold any type of content.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                        <Avatar.Root>
                            <Avatar.Image
                                src={PLACEHOLDER_AVATAR}
                                alt='User avatar for John Doe, Software Engineer'
                            />
                        </Avatar.Root>
                        <div>
                            <p className='font-semibold text-gray-950'>John Doe</p>
                            <p className='text-sm text-gray-700'>Software Engineer</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </SandboxEditor>
);

const Template = () => (
    <SandboxEditor>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {Array(6).fill(0).map((_, i) => (
                <Card key={i}>
                    <div className="space-y-2">
                        <h3 className="font-semibold">Card {i + 1}</h3>
                        <p className="text-sm text-gray-700">
                            This is card content with proper spacing and styling.
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    </SandboxEditor>
);
export const MultipleCards = Template.bind({});

export const Size = () => {
    return (
        <SandboxEditor>
            <div className="space-y-6 w-full max-w-4xl">
                {Variants.map((variant, variantIndex) => (
                    <div key={variantIndex} className="space-y-4">
                        <h3 className="text-lg font-semibold capitalize">{variant} Variant</h3>
                        <div className="flex flex-wrap gap-4">
                            {Sizes.map((size, sizeIndex) => (
                                <Card key={sizeIndex} size={size} variant={variant}>
                                    <div className='flex items-center space-x-3'>
                                        <Avatar.Root>
                                            <Avatar.Image
                                                src={PLACEHOLDER_AVATAR}
                                                alt='User avatar demonstrating card size'
                                            />
                                        </Avatar.Root>
                                        <div>
                                            <p className='font-semibold text-gray-950'>John Doe</p>
                                            <p className='text-xs text-gray-700'>
                                                Size: {size}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SandboxEditor>
    );
};

export const Variant = () => {
    return (
        <SandboxEditor>
            <div className="space-y-4 w-full max-w-2xl">
                <h3 className="text-lg font-semibold">Card Variants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Variants.map((variant, index) => (
                        <Card key={index} variant={variant}>
                            <div className="space-y-2">
                                <h4 className="font-semibold capitalize">{variant} Card</h4>
                                <p className="text-sm text-gray-700">
                                    This card uses the {variant} variant styling.
                                </p>
                                <div className='flex items-center space-x-3 pt-2'>
                                    <Avatar.Root>
                                        <Avatar.Image
                                            src={PLACEHOLDER_AVATAR}
                                            alt='User avatar demonstrating card variant'
                                        />
                                    </Avatar.Root>
                                    <div>
                                        <p className='font-semibold text-gray-950'>John Doe</p>
                                        <p className='text-xs text-gray-700'>
                                            1 hour ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </SandboxEditor>
    );
};
