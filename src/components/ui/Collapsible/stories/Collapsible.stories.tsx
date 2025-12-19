import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Collapsible from '~/components/ui/Collapsible/Collapsible';

const Items = [
    {
        content:
            '“One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.“ – Plato'
    },
    {
        content:
            '“The superior man understands what is right; the inferior man understands what will sell.” – Confucius'
    },
    {
        content: '“There are no secrets on the internet.” – Paul Babicki'
    }
];

const meta: Meta<typeof Collapsible> = {
    component: Collapsible,
    title: 'WIP/Collapsible'
};

export default meta;

const RightArrowIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

export const Default = () => {
    return (
        <SandboxEditor>
            <div className="w-full max-w-md">
                <Collapsible.Root transitionDuration={200} className="group">
                    <Collapsible.Trigger className="flex items-center justify-between w-full">
                        <span className="font-medium">@peduarte starred 3 repositories</span>
                        <RightArrowIcon className='transition-transform duration-200 group-data-[state=open]:rotate-90'/>
                    </Collapsible.Trigger>

                    <Collapsible.Content className="space-y-2 pt-2">
                        <div className="text-sm text-gray-700">
                            <p className="font-medium">@radix-ui/primitives</p>
                            <p className="text-xs text-gray-600">An open-source UI component library.</p>
                        </div>
                        <div className="text-sm text-gray-700">
                            <p className="font-medium">@radix-ui/colors</p>
                            <p className="text-xs text-gray-600">A color palette for your design system.</p>
                        </div>
                        <div className="text-sm text-gray-700">
                            <p className="font-medium">@stitches/react</p>
                            <p className="text-xs text-gray-600">CSS-in-JS with best-in-class developer experience.</p>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>
        </SandboxEditor>
    );
};

export const WithCustomContent = () => {
    return (
        <SandboxEditor>
            <div className="w-full max-w-md space-y-4">
                <Collapsible.Root transitionDuration={200} className="group">
                    <Collapsible.Trigger className="flex items-center justify-between w-full">
                        <span className="font-medium">Learn more about our product</span>
                        <RightArrowIcon className='transition-transform duration-200 group-data-[state=open]:rotate-90'/>
                    </Collapsible.Trigger>
                    <Collapsible.Content className="pt-2">
                        <p className="text-sm text-gray-700">
                            Our product is designed to help you build better user interfaces faster.
                            It provides a comprehensive set of components that follow modern design principles.
                        </p>
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>
        </SandboxEditor>
    );
};
