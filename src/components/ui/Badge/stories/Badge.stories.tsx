import Badge from '../Badge';
import Separator from '../../Separator/Separator';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const ArrowIcon = ({ className }: { className: string }) => {
    return <svg className={className} width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const BadgeText = 'Badge';
const Variants = ['soft', 'outline', 'secondary'];
const Sizes = ['small', 'medium', 'large', 'x-large'];
const Colors = ['blue', 'red', 'green', 'plum', 'gray'];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Badge',
    component: Badge,
    render: () => <SandboxEditor>
        <div className='flex flex-wrap items-center gap-4'>
            {/* Default badge */}
            <div className='flex flex-col gap-2'>
                <p className='text-sm text-gray-600'>Default</p>
                <Badge>Badge</Badge>
            </div>

            <Separator orientation="vertical" />

            {/* Badges with color prop */}
            <div className='flex flex-col gap-2'>
                <p className='text-sm text-gray-600'>With Color Prop</p>
                <div className='flex flex-wrap gap-2'>
                    {Colors.map((color, index) => (
                        <Badge key={index} color={color}>{color}</Badge>
                    ))}
                </div>
            </div>

            <Separator orientation="vertical" />

            {/* Badge with icon */}
            <div className='flex flex-col gap-2'>
                <p className='text-sm text-gray-600'>With Icon</p>
                <Badge>
                    <div className='flex items-center gap-1'>
                        <span>With Icon</span>
                        <ArrowIcon className='w-3 h-3' />
                    </div>
                </Badge>
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

export const Default = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950 mb-4'>Default Badge (no color prop)</p>
        </div>
        <div className='flex flex-wrap gap-2'>
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="soft">Soft</Badge>
            <Badge variant="secondary">Secondary</Badge>
        </div>
    </SandboxEditor>;
};

export const WithColors = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950 mb-4'>Badges with Color Prop</p>
        </div>
        <div className='flex flex-wrap gap-2'>
            {Colors.map((color, index) => (
                <Badge key={index} color={color}>{color}</Badge>
            ))}
        </div>
        <div className='mt-4'>
            <p className='text-gray-950 mb-4'>With Variants</p>
            <div className='flex flex-wrap gap-2'>
                {Variants.map((variant, vIndex) => (
                    <div key={vIndex} className='flex flex-col gap-2'>
                        <p className='text-xs text-gray-600'>{variant}</p>
                        <div className='flex flex-wrap gap-2'>
                            {Colors.slice(0, 3).map((color, cIndex) => (
                                <Badge key={cIndex} color={color} variant={variant}>
                                    {color}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </SandboxEditor>;
};

export const Size = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950 mb-4'>Badge Sizes</p>
        </div>
        <div className='flex flex-col gap-4'>
            {Variants.map((variant, index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <p className='text-sm text-gray-600'>{variant} variant</p>
                    <div className='flex flex-wrap items-center gap-2'>
                        {Sizes.map((size, sizeIndex) => {
                            return <Badge key={sizeIndex} size={size} variant={variant}>
                                {BadgeText}
                            </Badge>;
                        })}
                    </div>
                </div>
            ))}
        </div>
    </SandboxEditor>;
};

export const Variant = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950 mb-4'>Badge Variants</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-wrap gap-2'>
                <Badge>Default</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="soft">Soft</Badge>
                <Badge variant="secondary">Secondary</Badge>
            </div>
            <div className='flex flex-wrap gap-2'>
                <Badge color="blue">Default</Badge>
                <Badge color="blue" variant="outline">Outline</Badge>
                <Badge color="blue" variant="soft">Soft</Badge>
                <Badge color="blue" variant="secondary">Secondary</Badge>
            </div>
        </div>
    </SandboxEditor>;
};

export const WithIcons = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950 mb-4'>Badges with Icons</p>
        </div>
        <div className='flex flex-wrap gap-2'>
            <Badge>
                <div className='flex items-center gap-1'>
                    <ArrowIcon className='w-3 h-3' />
                    <span>Left Icon</span>
                </div>
            </Badge>
            <Badge>
                <div className='flex items-center gap-1'>
                    <span>Right Icon</span>
                    <ArrowIcon className='w-3 h-3' />
                </div>
            </Badge>
            <Badge color="blue">
                <div className='flex items-center gap-1'>
                    <ArrowIcon className='w-3 h-3' />
                    <span>Colored</span>
                </div>
            </Badge>
            <Badge variant="outline">
                <div className='flex items-center gap-1'>
                    <ArrowIcon className='w-3 h-3' />
                    <span>Outline</span>
                </div>
            </Badge>
        </div>
    </SandboxEditor>;
};
