import React, { useState } from 'react';
import HoverCard from '../HoverCard';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react';

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
                    <Button variant="secondary" className="my-0" size="small">
                        Hover over me
                    </Button>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <div className="p-2 max-w-md">
                        <div className="mb-2 text-base font-medium">Introduction to HoverCard</div>
                        <p className="text-sm text-muted">
                            The HoverCard component is a popup that displays when a user hovers over a trigger.
                            It's perfect for providing additional information without requiring a click.
                        </p>
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
                    <Button variant="secondary" className="my-0" size="small" onClick={() => setOpen(true)}>
                        {open ? 'Card visible' : 'Click Me'}
                    </Button>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <div className="p-2 max-w-md">
                        <div className="mb-2 text-base font-medium">Controlled HoverCard</div>
                        <p className="text-sm text-muted">
                            This is a controlled example. The state is managed externally.
                        </p>
                        <Button
                            variant="secondary"
                            size="small"
                            className="mt-2"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>
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
