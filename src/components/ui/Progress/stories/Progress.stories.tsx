import React, { useState } from 'react';
import Progress from '../Progress';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Progress> = {
    title: 'Components/Progress',
    component: Progress
};

export default meta;
type Story = StoryObj<typeof Progress>;

const ProgressExample = ({ value = 67 }: { value?: number | null }) => (
    <div className="flex w-full justify-center">
        <Progress.Root value={value} maxValue={100} minValue={0}>
            <Progress.Indicator />
        </Progress.Root>
    </div>
);

export const Default: Story = {
    render: () => (
        <SandboxEditor>
            <div className="flex min-h-[240px] w-full items-center justify-center">
                <ProgressExample />
            </div>
        </SandboxEditor>
    )
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState(40);

        return (
            <SandboxEditor>
                <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-6">
                    <ProgressExample value={value} />
                    <input
                        type="range"
                        aria-label="Progress value"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="w-full max-w-[25.25rem]"
                    />
                </div>
            </SandboxEditor>
        );
    }
};
