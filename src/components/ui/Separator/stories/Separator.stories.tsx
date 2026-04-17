import React, { JSX, ClassAttributes, HTMLAttributes } from 'react';
import Separator, { SeparatorProps } from '../Separator';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const textClasses = 'text-gray-950 text-sm font-light';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Separator',
    component: Separator,
    render: (args: JSX.IntrinsicAttributes & SeparatorProps) => <SandboxEditor>
        <div className='mt-5'>
            <div className='text-gray-950 font-bold text-xl'>Did you know Rad UI is great toolkit for your SaaS needs?</div>
            <Separator {...args} />
            <div className='flex items-center'>
                <div className={textClasses}>Accessible</div>
                <Separator orientation='vertical' {...args} />
                <div className={textClasses}>Easy to use APIs</div>
                <Separator orientation='vertical' {...args} />
                <div className={textClasses}>Modern</div>
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
        color: 'blue'
    }
};

// New stories for the GitHub issue #1269 features
export const AsChildSupport = () => {
    return <SandboxEditor>
        <div className='mt-5 space-y-4'>
            <h2 className='text-gray-950 font-bold text-xl'>Separator with asChild Support</h2>

            <div>
                <p className='text-sm text-gray-600 mb-2'>Using native hr element:</p>
                <Separator asChild>
                    <hr className='border-t-2 border-blue-500' />
                </Separator>
            </div>

            <div>
                <p className='text-sm text-gray-600 mb-2'>Using custom div element:</p>
                <Separator asChild>
                    <div className='h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent' />
                </Separator>
            </div>

            <div className='flex items-center gap-2'>
                <span className='text-sm'>Item 1</span>
                <Separator asChild orientation='vertical'>
                    <div className='w-px h-4 bg-gray-300' />
                </Separator>
                <span className='text-sm'>Item 2</span>
            </div>
        </div>
    </SandboxEditor>;
};

export const DecorativeSeparators = () => {
    return <SandboxEditor>
        <div className='mt-5 space-y-4'>
            <h2 className='text-gray-950 font-bold text-xl'>Decorative Separators</h2>
            <p className='text-sm text-gray-600'>These separators are marked as decorative and hidden from screen readers</p>

            <div className='space-y-2'>
                <p className='text-sm'>Section 1</p>
                <Separator decorative />
                <p className='text-sm'>Section 2</p>
                <Separator decorative />
                <p className='text-sm'>Section 3</p>
            </div>

            <div className='flex items-center gap-2'>
                <span className='text-sm'>Navigation</span>
                <Separator decorative orientation='vertical' />
                <span className='text-sm'>Settings</span>
                <Separator decorative orientation='vertical' />
                <span className='text-sm'>Profile</span>
            </div>
        </div>
    </SandboxEditor>;
};

export const DataAttributes = () => {
    return <SandboxEditor>
        <div className='mt-5 space-y-4'>
            <h2 className='text-gray-950 font-bold text-xl'>Separator Data Attributes</h2>
            <p className='text-sm text-gray-600'>Open browser inspector to see data-orientation attributes</p>

            <div className='space-y-2'>
                <p className='text-sm'>Horizontal separator:</p>
                <Separator data-testid="horizontal-separator" />
                <p className='text-xs text-gray-500'>Has data-orientation="horizontal"</p>
            </div>

            <div className='flex items-center gap-2'>
                <span className='text-sm'>Vertical separator:</span>
                <Separator orientation='vertical' data-testid="vertical-separator" />
                <p className='text-xs text-gray-500'>Has data-orientation="vertical"</p>
            </div>

            <div className='space-y-2'>
                <p className='text-sm'>Decorative horizontal:</p>
                <Separator decorative data-testid="decorative-horizontal" />
                <p className='text-xs text-gray-500'>Has data-orientation="horizontal", role="separator", aria-hidden="true"</p>
            </div>

            <div className='flex items-center gap-2'>
                <span className='text-sm'>Decorative vertical:</span>
                <Separator decorative orientation='vertical' data-testid="decorative-vertical" />
                <p className='text-xs text-gray-500'>Has data-orientation="vertical", role="separator", aria-hidden="true"</p>
            </div>
        </div>
    </SandboxEditor>;
};

export const CombinedFeatures = () => {
    return <SandboxEditor>
        <div className='mt-5 space-y-4'>
            <h2 className='text-gray-950 font-bold text-xl'>Combined Features</h2>
            <p className='text-sm text-gray-600'>Showing all new features working together</p>

            <div className='space-y-4'>
                <div>
                    <h3 className='text-md font-medium mb-2'>Content Sections</h3>
                    <p className='text-sm text-gray-600'>This content is separated by decorative separators</p>
                    <Separator decorative asChild>
                        <hr className='border-t border-gray-200 my-4' />
                    </Separator>
                    <p className='text-sm text-gray-600'>More content here with custom styling</p>
                </div>

                <div className='flex items-center gap-4'>
                    <span className='text-sm font-medium'>Navigation</span>
                    <Separator decorative orientation='vertical' asChild>
                        <div className='w-px h-6 bg-gray-300' />
                    </Separator>
                    <span className='text-sm'>Settings</span>
                    <Separator decorative orientation='vertical' asChild>
                        <div className='w-px h-6 bg-gray-300' />
                    </Separator>
                    <span className='text-sm'>Profile</span>
                </div>
            </div>
        </div>
    </SandboxEditor>;
};
