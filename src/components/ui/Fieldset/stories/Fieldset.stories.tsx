import React from 'react';
import Fieldset from '../Fieldset';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Fieldset> = {
    title: 'Components/Fieldset',
    component: Fieldset
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
    render: () => (
        <SandboxEditor>
            <Fieldset.Root className="flex max-w-md flex-col gap-3">
                <Fieldset.Legend>Contact preferences</Fieldset.Legend>
                <Fieldset.Description>Choose every channel you want enabled.</Fieldset.Description>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="contact" value="email" />
                    Email
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="contact" value="sms" />
                    SMS
                </label>
            </Fieldset.Root>
        </SandboxEditor>
    )
};

export const Invalid: Story = {
    render: () => (
        <SandboxEditor>
            <Fieldset.Root invalid className="flex max-w-md flex-col gap-3">
                <Fieldset.Legend>Delivery window</Fieldset.Legend>
                <label className="flex items-center gap-2">
                    <input type="radio" name="delivery" value="morning" />
                    Morning
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="delivery" value="afternoon" />
                    Afternoon
                </label>
                <Fieldset.Message invalid>Select a delivery window.</Fieldset.Message>
            </Fieldset.Root>
        </SandboxEditor>
    )
};
