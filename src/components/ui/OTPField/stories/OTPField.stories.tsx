import React from 'react';
import OTPField from '../OTPField';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof OTPField> = {
    title: 'Components/OTPField',
    component: OTPField
};

export default meta;
type Story = StoryObj<typeof OTPField>;

export const Default: Story = {
    render: () => {
        const [code, setCode] = React.useState('');
        return (
            <SandboxEditor>
                <OTPField.Root aria-label="Verification code" value={code} onValueChange={setCode}>
                    {Array.from({ length: 6 }, (_, index) => <OTPField.Input key={index} />)}
                </OTPField.Root>
                <p className="mt-4 text-sm">Code: {code || '—'}</p>
            </SandboxEditor>
        );
    }
};

export const Alphanumeric: Story = {
    render: () => (
        <SandboxEditor>
            <OTPField.Root aria-label="Recovery code" length={4} validationType="alphanumeric">
                {Array.from({ length: 4 }, (_, index) => <OTPField.Input key={index} />)}
            </OTPField.Root>
        </SandboxEditor>
    )
};

export const Masked: Story = {
    render: () => (
        <SandboxEditor>
            <OTPField.Root aria-label="PIN" length={4} type="password">
                {Array.from({ length: 4 }, (_, index) => <OTPField.Input key={index} />)}
            </OTPField.Root>
        </SandboxEditor>
    )
};
