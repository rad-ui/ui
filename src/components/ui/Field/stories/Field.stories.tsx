import React from 'react';
import Field from '../Field';
import TextField from '~/components/ui/TextField/TextField';
import TextArea from '~/components/ui/TextArea/TextArea';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Field> = {
    title: 'Components/Field',
    component: Field
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
    render: () => (
        <SandboxEditor>
            <Field.Root className="max-w-sm">
                <Field.Label>Email</Field.Label>
                <Field.Control asChild>
                    <TextField type="email" placeholder="you@company.com" />
                </Field.Control>
                <Field.Description>We only use it to sign you in.</Field.Description>
            </Field.Root>
        </SandboxEditor>
    )
};

export const Invalid: Story = {
    render: () => (
        <SandboxEditor>
            <Field.Root invalid className="max-w-sm">
                <Field.Label>Password</Field.Label>
                <Field.Control asChild>
                    <TextField type="password" defaultValue="short" />
                </Field.Control>
                <Field.Description>At least 8 characters.</Field.Description>
                <Field.Error>Password is too short.</Field.Error>
            </Field.Root>
        </SandboxEditor>
    )
};

// A server-validated form: the response says which field failed, and only that field turns invalid.
const ServerValidationExample = () => {
    const [error, setError] = React.useState<{ field: string; message: string } | null>(null);
    return (
        <form
            className="flex max-w-sm flex-col gap-4"
            onSubmit={(event) => {
                event.preventDefault();
                const email = new FormData(event.currentTarget).get('email');
                setError(email === 'taken@example.com' ? { field: 'email', message: 'That email already has an account.' } : null);
            }}
        >
            <Field.Root name="email" required invalid={error?.field === 'email'}>
                <Field.Label>Email</Field.Label>
                <Field.Control asChild>
                    <TextField type="email" placeholder="Try taken@example.com" />
                </Field.Control>
                <Field.Error>{error?.message}</Field.Error>
            </Field.Root>
            <Field.Root name="bio">
                <Field.Label>Bio</Field.Label>
                <Field.Control asChild>
                    <TextArea />
                </Field.Control>
                <Field.Description>Shown on your profile.</Field.Description>
            </Field.Root>
            <Button type="submit">Create account</Button>
        </form>
    );
};

export const ServerValidation: Story = {
    render: () => (
        <SandboxEditor>
            <ServerValidationExample />
        </SandboxEditor>
    )
};

export const Disabled: Story = {
    render: () => (
        <SandboxEditor>
            <Field.Root disabled className="max-w-sm">
                <Field.Label>Workspace URL</Field.Label>
                <Field.Control asChild>
                    <TextField defaultValue="acme" />
                </Field.Control>
                <Field.Description>Ask an admin to change it.</Field.Description>
            </Field.Root>
        </SandboxEditor>
    )
};

export const NativeValidation: Story = {
    render: () => (
        <SandboxEditor>
            <form className="flex max-w-sm flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
                <Field.Root name="email" required validationMode="onBlur">
                    <Field.Label>Email</Field.Label>
                    <Field.Control asChild>
                        <TextField type="email" />
                    </Field.Control>
                    <Field.Error match="valueMissing">Enter your email.</Field.Error>
                    <Field.Error match="typeMismatch">That doesn't look like an email.</Field.Error>
                </Field.Root>
                <Field.Root
                    name="username"
                    required
                    validate={(value) => (String(value).toLowerCase() === 'admin' ? 'That username is taken.' : null)}
                >
                    <Field.Label>Username</Field.Label>
                    <Field.Control asChild>
                        <TextField />
                    </Field.Control>
                    <Field.Description>Try "admin" to see a custom error.</Field.Description>
                    <Field.Error />
                </Field.Root>
                <Button type="submit">Create account</Button>
            </form>
        </SandboxEditor>
    )
};
