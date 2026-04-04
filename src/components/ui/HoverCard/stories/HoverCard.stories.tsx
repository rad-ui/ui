import React, { useState } from 'react';
import HoverCard from '../HoverCard';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HoverCard> = {
    title: 'WIP/HoverCard',
    component: HoverCard,
    decorators: [(Story) => (
        <SandboxEditor>
            <div className="flex min-h-[350px] w-full items-center justify-center">
                <Story />
            </div>
        </SandboxEditor>
    )]
};

export default meta;
type Story = StoryObj<any>;

// HoverCard example using composable API
const HoverCardExample = () => {
    return (
        <div className="flex w-full items-center justify-center">
            <HoverCard.Root
                openDelay={100}
                closeDelay={200}
                open={undefined}
                onOpenChange={() => {}}
                customRootClass=""
            >
                <HoverCard.Trigger>
                    <span>Hover Here</span>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <div className="w-[16rem] space-y-2">
                        <div className="text-base font-semibold text-gray-950">@nextjs</div>
                        <p className="text-sm leading-7 text-gray-950">
                            The React Framework - created and maintained by @vercel.
                        </p>
                        <p className="text-sm text-gray-700">Joined December 2021</p>
                    </div>
                </HoverCard.Content>
            </HoverCard.Root>
        </div>
    );
};

// Controlled HoverCard example
const ControlledHoverCardExample = () => {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex w-full items-center justify-center">
            <HoverCard.Root
                open={open}
                onOpenChange={() => {}}
                openDelay={100}
                closeDelay={200}
                customRootClass=""
            >
                <HoverCard.Trigger>
                    <button
                        type="button"
                        className="cursor-pointer bg-transparent p-0 text-inherit"
                        onClick={() => setOpen(true)}
                    >
                        {open ? 'Hover Here' : 'Show Card'}
                    </button>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <div className="w-[16rem] space-y-2">
                        <div className="text-base font-semibold text-gray-950">@nextjs</div>
                        <p className="text-sm leading-7 text-gray-950">
                            The React Framework - created and maintained by @vercel.
                        </p>
                        <p className="text-sm text-gray-700">Joined December 2021</p>
                        <button className="text-sm text-gray-700 underline underline-offset-4" onClick={() => setOpen(false)} type="button">
                            Close
                        </button>
                    </div>
                </HoverCard.Content>
            </HoverCard.Root>
        </div>
    );
};

export const Default: Story = {
    render: () => <HoverCardExample />
};

export const Controlled: Story = {
    render: () => <ControlledHoverCardExample />
};
