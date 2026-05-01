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
