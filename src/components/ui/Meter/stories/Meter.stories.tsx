import React from 'react';
import Meter from '../Meter';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Meter> = {
    title: 'Components/Meter',
    component: Meter
};

export default meta;
type Story = StoryObj<typeof Meter>;

export const Default: Story = {
    render: () => (
        <SandboxEditor>
            <div className="flex min-h-[240px] w-full items-center justify-center">
                <Meter.Root value={72} minValue={0} maxValue={100} lowValue={30} highValue={85}>
                    <Meter.Indicator />
                </Meter.Root>
            </div>
        </SandboxEditor>
    )
};

export const Thresholds: Story = {
    render: () => (
        <SandboxEditor>
            <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-6">
                <Meter.Root value={18} lowValue={30} highValue={80}>
                    <Meter.Indicator />
                </Meter.Root>
                <Meter.Root value={50} lowValue={30} highValue={80}>
                    <Meter.Indicator />
                </Meter.Root>
                <Meter.Root value={92} lowValue={30} highValue={80}>
                    <Meter.Indicator />
                </Meter.Root>
            </div>
        </SandboxEditor>
    )
};
