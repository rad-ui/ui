import React from 'react';
import HoverCard from '../HoverCard';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HoverCard> = {
    title: 'WIP/HoverCard',
    component: HoverCard,
    decorators: [(Story) => (
        <SandboxEditor className='bg-gray-200 h-[400px] flex items-center justify-center'>
            <Story />
        </SandboxEditor>
    )]
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

// Create a HoverCard example component using the composable API
const HoverCardExample = () => {
    const Content = () => {
        return (
            <div>
                <div className='space-y-2'>
                    The quick brown fox jumps over the lazy dog
                </div>
            </div>
        );
    };

    return (
        <HoverCard.Root openDelay={100} closeDelay={200}>
            <HoverCard.Trigger>
                <div className="p-10 bg-gray-100 rounded-md shadow">Hover me</div>
            </HoverCard.Trigger>
            <HoverCard.Portal rootElement={undefined} props={{}}>
                <HoverCard.Content>
                    <Content />
                    <HoverCard.Arrow />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

// Controlled HoverCard example
const ControlledHoverCardExample = () => {
    const Content = () => {
        return (
            <div>
                <div className='space-y-2'>
                    The quick brown fox jumps over the lazy dog
                </div>
            </div>
        );
    };

    return (
        <HoverCard.Root open={true} onOpenChange={() => {}}>
            <HoverCard.Trigger>
                <div className="p-10 bg-gray-100 rounded-md shadow">Hover me (Controlled)</div>
            </HoverCard.Trigger>
            <HoverCard.Portal rootElement={undefined} props={{}}>
                <HoverCard.Content>
                    <Content />
                    <HoverCard.Arrow />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export const Default: Story = {
    render: () => <HoverCardExample />
};

export const Controlled: Story = {
    render: () => <ControlledHoverCardExample />
};
