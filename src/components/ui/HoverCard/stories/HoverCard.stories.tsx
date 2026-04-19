import React, { useState } from 'react';
import HoverCard from '../HoverCard';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const HOVER_CARD_SIZES = ['small', 'medium', 'large'];

const meta: Meta<typeof HoverCard> = {
    title: 'Components/HoverCard',
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

const CardBody = () => (
    <div className="space-y-2">
        <div className="font-semibold text-[var(--rad-ui-text-primary)]">@radui</div>
        <p className="leading-relaxed text-[var(--rad-ui-text-primary)]">
            A headless component library for React. Build accessible UIs with full styling control.
        </p>
        <p className="text-xs text-[var(--rad-ui-text-secondary)]">Joined December 2021</p>
    </div>
);

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
                <HoverCard.Portal>
                    <HoverCard.Content>
                        <div className="w-[18rem]">
                            <CardBody />
                        </div>
                    </HoverCard.Content>
                </HoverCard.Portal>
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
                <HoverCard.Portal>
                    <HoverCard.Content>
                        <div className="w-[18rem] space-y-2">
                            <CardBody />
                            <button
                                className="text-xs text-[var(--rad-ui-text-secondary)] underline underline-offset-4"
                                onClick={() => setOpen(false)}
                                type="button"
                            >
                                Close
                            </button>
                        </div>
                    </HoverCard.Content>
                </HoverCard.Portal>
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

export const Sizes = () => {
    return (
        
            <div className="flex flex-col gap-16 p-8">
                {HOVER_CARD_SIZES.map((size) => (
                    <div key={size}>
                        <p className="text-gray-500 mb-4 text-xs">size: {size}</p>
                        <HoverCard.Root openDelay={100} closeDelay={200}>
                            <HoverCard.Trigger>
                                <span className="underline underline-offset-2 cursor-pointer font-medium">
                                    Hover Here
                                </span>
                            </HoverCard.Trigger>
                            <HoverCard.Portal>
                                <HoverCard.Content size={size}>
                                    <CardBody />
                                </HoverCard.Content>
                            </HoverCard.Portal>
                        </HoverCard.Root>
                    </div>
                ))}
            </div>
        
    );
};
