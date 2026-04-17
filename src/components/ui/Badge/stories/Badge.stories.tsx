import Badge from '../Badge';
import Separator from '../../Separator/Separator';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const BadgeText = 'Badge';
const BADGE_VARIANTS = ['solid', 'soft', 'surface', 'outline', 'ghost'] as const;
const BADGE_SIZES = ['small', 'medium', 'large', 'x-large'] as const;
const Colors = ['blue', 'red', 'green', 'plum', 'gray'];
const DEMO_COLORS = ['blue', 'red', 'green'] as const;

const VariantShowcase = ({ includeNeutral = false }: { includeNeutral?: boolean }): React.ReactElement => {
    return <div className='flex flex-col gap-3'>
        {BADGE_VARIANTS.map((variant) => (
            <div key={variant} className='grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center'>
                <p className='text-xs font-medium uppercase tracking-[0.08em] text-gray-700'>{variant}</p>
                <div className='flex flex-wrap items-center gap-2'>
                    {includeNeutral ? <Badge variant={variant}>default</Badge> : null}
                    {DEMO_COLORS.map((color) => (
                        <Badge key={color} color={color} variant={variant}>
                            {color}
                        </Badge>
                    ))}
                </div>
            </div>
        ))}
    </div>;
};

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
                        <ArrowRight className='w-3 h-3' />
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
            <Badge variant="solid">Solid</Badge>
            <Badge variant="soft">Soft</Badge>
            <Badge variant="surface">Surface</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
        </div>
    </SandboxEditor>;
};

export const WithColors = () => {
    return <SandboxEditor>
        <div className='flex flex-col gap-6'>
            <div>
                <p className='mb-3 text-gray-950'>Badges with Color Prop</p>
                <div className='flex flex-wrap gap-2'>
                    {Colors.map((color, index) => (
                        <Badge key={index} color={color}>{color}</Badge>
                    ))}
                </div>
            </div>
            <div>
                <p className='mb-3 text-gray-950'>Variant Comparison</p>
                <VariantShowcase />
            </div>
        </div>
    </SandboxEditor>;
};

export const Sizes = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950 mb-4'>Badge Sizes</p>
        </div>
        <div className='flex flex-col gap-4'>
            {BADGE_VARIANTS.map((variant, index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <p className='text-sm text-gray-600'>{variant} variant</p>
                    <div className='flex flex-wrap items-center gap-2'>
                        {BADGE_SIZES.map((size, sizeIndex) => {
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

export const Variants = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='mb-4 text-gray-950'>Badge Variants</p>
            <VariantShowcase includeNeutral />
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
                    <ArrowRight className='w-3 h-3' />
                    <span>Left Icon</span>
                </div>
            </Badge>
            <Badge>
                <div className='flex items-center gap-1'>
                    <span>Right Icon</span>
                    <ArrowRight className='w-3 h-3' />
                </div>
            </Badge>
            <Badge color="blue">
                <div className='flex items-center gap-1'>
                    <ArrowRight className='w-3 h-3' />
                    <span>Colored</span>
                </div>
            </Badge>
            <Badge variant="outline">
                <div className='flex items-center gap-1'>
                    <ArrowRight className='w-3 h-3' />
                    <span>Outline</span>
                </div>
            </Badge>
        </div>
    </SandboxEditor>;
};
