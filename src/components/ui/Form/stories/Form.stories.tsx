import React from 'react';
import Form, { FormErrors } from '../Form';
import Field from '~/components/ui/Field/Field';
import TextField from '~/components/ui/TextField/TextField';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof Form> = {
    title: 'Components/Form',
    component: Form
};

export default meta;
type Story = StoryObj<typeof Form>;

const SignUpForm = () => {
    const [errors, setErrors] = React.useState<FormErrors>({});
    const [status, setStatus] = React.useState('');

    return (
        <Form
            className="max-w-sm"
            errors={errors}
            onFormSubmit={async(values) => {
                setStatus('Checking…');
                await new Promise((resolve) => setTimeout(resolve, 400));
                if (String(values.email).startsWith('taken')) {
                    setErrors({ email: 'That email is already registered.' });
                    setStatus('');
                    return;
                }
                setStatus(`Welcome, ${values.name}!`);
            }}
        >
            <Field.Root name="name" required>
                <Field.Label>Name</Field.Label>
                <Field.Control asChild>
                    <TextField />
                </Field.Control>
                <Field.Error match="valueMissing">Enter your name.</Field.Error>
            </Field.Root>
            <Field.Root name="email" required>
                <Field.Label>Email</Field.Label>
                <Field.Control asChild>
                    <TextField type="email" />
                </Field.Control>
                <Field.Description>Use an address starting with "taken" to see a server error.</Field.Description>
                <Field.Error />
            </Field.Root>
            <Button type="submit">Sign up</Button>
            <p role="status">{status}</p>
        </Form>
    );
};

export const Default: Story = {
    render: () => (
        <SandboxEditor>
            <SignUpForm />
        </SandboxEditor>
    )
};

export const ValidateOnBlur: Story = {
    render: () => (
        <SandboxEditor>
            <Form className="max-w-sm" validationMode="onBlur" onFormSubmit={() => {}}>
                <Field.Root name="website" required>
                    <Field.Label>Website</Field.Label>
                    <Field.Control asChild>
                        <TextField type="url" placeholder="https://" />
                    </Field.Control>
                    <Field.Error />
                </Field.Root>
                <Button type="submit">Save</Button>
            </Form>
        </SandboxEditor>
    )
};

const TAKEN = ['admin', 'rad', 'ui'];

export const AsyncCheck: Story = {
    render: () => {
        const AsyncForm = () => {
            const [status, setStatus] = React.useState('');
            return (
                <Form className="max-w-sm" onFormSubmit={(values) => setStatus(`Reserved ${values.username}`)}>
                    <Field.Root
                        name="username"
                        required
                        validationMode="onChange"
                        validationDebounceTime={300}
                        validate={async(value) => {
                            await new Promise((resolve) => setTimeout(resolve, 600));
                            return TAKEN.includes(String(value)) ? 'That username is taken.' : null;
                        }}
                    >
                        <Field.Label>Username</Field.Label>
                        <Field.Control asChild>
                            <TextField />
                        </Field.Control>
                        <Field.Description>Try "admin": the form waits for the check before submitting.</Field.Description>
                        <Field.Error />
                    </Field.Root>
                    <Button type="submit">Reserve</Button>
                    <p role="status">{status}</p>
                </Form>
            );
        };
        return (
            <SandboxEditor>
                <AsyncForm />
            </SandboxEditor>
        );
    }
};
