import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Tooltip from '../Tooltip';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <div className="flex justify-center py-16">
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <button className="inline-flex min-h-[4rem] items-center justify-center rounded-[1.25rem] border border-[var(--rad-ui-border)] bg-[var(--rad-ui-surface)] px-6 text-[1rem] font-semibold text-[var(--rad-ui-text-primary)]">
                            Hover
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        Add to library
                    </Tooltip.Content>
                </Tooltip.Root>
            </div>
        </SandboxEditor>
    )
};

export const SharedDelay: Story = {
    render: () => (
        <SandboxEditor>
            <Tooltip.Provider openDelay={600}>
                <div className="flex justify-center gap-2 py-16">
                    {['Bold', 'Italic', 'Underline', 'Strikethrough'].map((label) => (
                        <Tooltip.Root key={label}>
                            <Tooltip.Trigger asChild>
                                <button className="inline-flex min-h-[2.5rem] items-center justify-center rounded-md border border-[var(--rad-ui-border)] bg-[var(--rad-ui-surface)] px-3 text-[var(--rad-ui-text-primary)]">
                                    {label[0]}
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>{label}</Tooltip.Content>
                        </Tooltip.Root>
                    ))}
                </div>
            </Tooltip.Provider>
        </SandboxEditor>
    )
};

const DetachedTriggersExample = () => {
    const handle = React.useMemo(() => Tooltip.createHandle<string>(), []);
    return (
        <SandboxEditor>
            <div className="flex gap-2 py-16">
                {['Revenue', 'Costs', 'Margin'].map((metric) => (
                    <Tooltip.Trigger key={metric} handle={handle} payload={metric} delay={300} asChild>
                        <button className="rounded-md border border-[var(--rad-ui-border)] px-3 py-1">{metric}</button>
                    </Tooltip.Trigger>
                ))}
            </div>
            <Tooltip.Root handle={handle}>
                {({ payload }) => <Tooltip.Content>How {String(payload).toLowerCase()} is calculated</Tooltip.Content>}
            </Tooltip.Root>
        </SandboxEditor>
    );
};

export const DetachedTriggers: Story = {
    render: () => <DetachedTriggersExample />
};

export const ScrollCollisionVisualTest: Story = {
    render: () => {
        const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

        return (
            <SandboxEditor>
                <div
                    ref={setContainer}
                    className="relative h-[360px] w-[420px] overflow-y-auto border border-[var(--rad-ui-border-default)] p-6"
                >
                    <div className="h-[280px]" />
                    <Tooltip.Root placement="bottom" collisionBoundary={container}>
                        <Tooltip.Trigger asChild>
                            <button className="inline-flex min-h-[4rem] items-center justify-center rounded-[1.25rem] border border-[var(--rad-ui-border)] bg-[var(--rad-ui-surface)] px-6 text-[1rem] font-semibold text-[var(--rad-ui-text-primary)]">
                                Focus or hover
                            </button>
                        </Tooltip.Trigger>
                        <Tooltip.Content container={container}>
                            Collision test
                        </Tooltip.Content>
                    </Tooltip.Root>
                    <div className="h-[520px]" />
                </div>
            </SandboxEditor>
        );
    }
};
