import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form';
import Field from '~/components/ui/Field/Field';

const SignUp = (props: Partial<React.ComponentProps<typeof Form>>) => (
    <Form {...props}>
        <Field.Root name="name" required>
            <Field.Label>Name</Field.Label>
            <Field.Control />
            <Field.Error match="valueMissing">Enter your name</Field.Error>
        </Field.Root>
        <Field.Root name="email" required>
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" />
            <Field.Error />
        </Field.Root>
        <button type="submit">Sign up</button>
    </Form>
);

describe('Form', () => {
    test('renders a form that turns off browser bubbles and forwards its ref', () => {
        const ref = React.createRef<HTMLFormElement>();
        render(<Form ref={ref} aria-label="Sign up" />);
        const form = screen.getByRole('form', { name: 'Sign up' });
        expect(ref.current).toBe(form);
        expect(form).toHaveAttribute('novalidate');
        expect(form).toHaveAttribute('data-slot', 'form');
    });

    test('blocks submit, shows every error and focuses the first invalid field', async() => {
        const user = userEvent.setup();
        const onFormSubmit = jest.fn();
        render(<SignUp onFormSubmit={onFormSubmit} />);
        await user.click(screen.getByRole('button', { name: 'Sign up' }));

        expect(onFormSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Enter your name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByLabelText('Name')).toHaveFocus();
    });

    test('calls onFormSubmit with the values once every field is valid', async() => {
        const user = userEvent.setup();
        const onFormSubmit = jest.fn();
        render(<SignUp onFormSubmit={onFormSubmit} />);
        await user.type(screen.getByLabelText('Name'), 'Ada');
        await user.type(screen.getByLabelText('Email'), 'ada@example.com');
        await user.click(screen.getByRole('button', { name: 'Sign up' }));

        expect(onFormSubmit).toHaveBeenCalledTimes(1);
        expect(onFormSubmit.mock.calls[0][0]).toEqual({ name: 'Ada', email: 'ada@example.com' });
    });

    test('collects repeated names into arrays', () => {
        const onFormSubmit = jest.fn();
        render(
            <Form onFormSubmit={onFormSubmit}>
                <input type="checkbox" name="topic" value="news" defaultChecked />
                <input type="checkbox" name="topic" value="tips" defaultChecked />
                <button type="submit">Save</button>
            </Form>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(onFormSubmit.mock.calls[0][0]).toEqual({ topic: ['news', 'tips'] });
    });

    test('shows server errors on the matching field and clears one when edited', async() => {
        const user = userEvent.setup();
        const onClearErrors = jest.fn();
        render(<SignUp errors={{ email: 'That email is already registered' }} onClearErrors={onClearErrors} />);

        const email = screen.getByLabelText('Email');
        expect(email).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByRole('alert')).toHaveTextContent('That email is already registered');
        expect(email).toHaveAccessibleDescription('That email is already registered');

        await user.type(email, 'x');
        expect(screen.queryByText('That email is already registered')).not.toBeInTheDocument();
        expect(onClearErrors).toHaveBeenCalledWith({});
    });

    test('a new errors object shows again after a later submit', () => {
        const { rerender } = render(<SignUp errors={{ email: 'Server says no' }} />);
        expect(screen.getByText('Server says no')).toBeInTheDocument();
        rerender(<SignUp errors={{ email: 'Still no' }} />);
        expect(screen.getByText('Still no')).toBeInTheDocument();
    });

    test('passes its validationMode to fields that do not set one', async() => {
        const user = userEvent.setup();
        render(<SignUp validationMode="onBlur" />);
        await user.click(screen.getByLabelText('Name'));
        await user.tab();
        expect(screen.getByText('Enter your name')).toBeInTheDocument();
    });

    test('calls the native onSubmit only when valid', async() => {
        const user = userEvent.setup();
        const onSubmit = jest.fn((event: React.FormEvent) => event.preventDefault());
        render(<SignUp onSubmit={onSubmit} />);
        await user.click(screen.getByRole('button', { name: 'Sign up' }));
        expect(onSubmit).not.toHaveBeenCalled();
        await user.type(screen.getByLabelText('Name'), 'Ada');
        await user.type(screen.getByLabelText('Email'), 'ada@example.com');
        await user.click(screen.getByRole('button', { name: 'Sign up' }));
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    test('unmounted fields stop taking part in validation', async() => {
        const user = userEvent.setup();
        const onFormSubmit = jest.fn();
        const Toggle = () => {
            const [show, setShow] = React.useState(true);
            return (
                <Form onFormSubmit={onFormSubmit}>
                    {show && (
                        <Field.Root name="extra" required>
                            <Field.Label>Extra</Field.Label>
                            <Field.Control />
                        </Field.Root>
                    )}
                    <button type="button" onClick={() => setShow(false)}>Hide</button>
                    <button type="submit">Go</button>
                </Form>
            );
        };
        render(<Toggle />);
        await user.click(screen.getByRole('button', { name: 'Hide' }));
        await user.click(screen.getByRole('button', { name: 'Go' }));
        expect(onFormSubmit).toHaveBeenCalledTimes(1);
    });

    test('an inline errors object does not bring a cleared error back on re-render', async() => {
        const user = userEvent.setup();
        const Controlled = () => {
            const [note, setNote] = React.useState('');
            return (
                <Form errors={{ email: 'Taken' }}>
                    <Field.Root name="email">
                        <Field.Label>Email</Field.Label>
                        <Field.Control />
                        <Field.Error />
                    </Field.Root>
                    <label>Note <input value={note} onChange={(event) => setNote(event.target.value)} /></label>
                </Form>
            );
        };
        render(<Controlled />);
        await user.type(screen.getByLabelText('Email'), 'a');
        expect(screen.queryByText('Taken')).not.toBeInTheDocument();
        await user.type(screen.getByLabelText('Note'), 'hi');
        expect(screen.queryByText('Taken')).not.toBeInTheDocument();
    });
    test('waits for an async check, then submits once it passes', async() => {
        const user = userEvent.setup();
        const onFormSubmit = jest.fn();
        let resolveCheck: (result: string | null) => void = () => {};
        const validate = jest.fn(() => new Promise<string | null>((resolve) => { resolveCheck = resolve; }));
        render(
            <Form onFormSubmit={onFormSubmit}>
                <Field.Root name="username" validate={validate}>
                    <Field.Label>Username</Field.Label>
                    <Field.Control defaultValue="ada" />
                    <Field.Error />
                </Field.Root>
                <button type="submit">Join</button>
            </Form>
        );
        await user.click(screen.getByRole('button', { name: 'Join' }));
        expect(onFormSubmit).not.toHaveBeenCalled();

        resolveCheck(null);
        await waitFor(() => expect(onFormSubmit).toHaveBeenCalledTimes(1));
        expect(onFormSubmit.mock.calls[0][0]).toEqual({ username: 'ada' });
    });

    test('an async check that fails blocks submit and focuses the field', async() => {
        const user = userEvent.setup();
        const onFormSubmit = jest.fn();
        let resolveCheck: (result: string | null) => void = () => {};
        const validate = () => new Promise<string | null>((resolve) => { resolveCheck = resolve; });
        render(
            <Form onFormSubmit={onFormSubmit}>
                <Field.Root name="username" validate={validate}>
                    <Field.Label>Username</Field.Label>
                    <Field.Control defaultValue="ada" />
                    <Field.Error />
                </Field.Root>
                <button type="submit">Join</button>
            </Form>
        );
        await user.click(screen.getByRole('button', { name: 'Join' }));
        resolveCheck('That username is taken');

        expect(await screen.findByText('That username is taken')).toBeInTheDocument();
        await waitFor(() => expect(screen.getByLabelText('Username')).toHaveFocus());
        expect(onFormSubmit).not.toHaveBeenCalled();
    });

    test('checks plain controls that are not in a Field', async() => {
        const user = userEvent.setup();
        const onFormSubmit = jest.fn();
        render(
            <Form onFormSubmit={onFormSubmit}>
                <label>Code <input name="code" required /></label>
                <button type="submit">Send</button>
            </Form>
        );
        await user.click(screen.getByRole('button', { name: 'Send' }));
        expect(onFormSubmit).not.toHaveBeenCalled();
        expect(screen.getByLabelText('Code')).toHaveFocus();

        await user.type(screen.getByLabelText('Code'), '42');
        await user.click(screen.getByRole('button', { name: 'Send' }));
        expect(onFormSubmit).toHaveBeenCalledWith({ code: '42' }, expect.anything());
    });
});
