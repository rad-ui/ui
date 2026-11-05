import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Field from '../Field';
import TextField from '~/components/ui/TextField/TextField';

describe('Field validation', () => {
    test('waits for a submit attempt by default, then shows the browser message', () => {
        render(
            <form>
                <Field.Root name="email" required>
                    <Field.Label>Email</Field.Label>
                    <Field.Control type="email" />
                    <Field.Error />
                </Field.Root>
                <button type="submit">Send</button>
            </form>
        );
        const input = screen.getByLabelText('Email');
        fireEvent.blur(input);
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();

        fireEvent.invalid(input);
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByRole('alert')).toHaveTextContent(/.+/);
        expect(input.closest('[data-slot="field-root"]')).toHaveAttribute('data-invalid');
    });

    test('once shown, errors clear as the user fixes the value', async() => {
        const user = userEvent.setup();
        render(
            <Field.Root required>
                <Field.Label>Name</Field.Label>
                <Field.Control />
                <Field.Error match="valueMissing">Enter your name</Field.Error>
            </Field.Root>
        );
        const input = screen.getByLabelText('Name');
        fireEvent.invalid(input);
        expect(screen.getByRole('alert')).toHaveTextContent('Enter your name');

        await user.type(input, 'Ada');
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(input).not.toHaveAttribute('aria-invalid');
        expect(input.closest('[data-slot="field-root"]')).toHaveAttribute('data-valid');
    });

    test('validationMode onBlur shows results when focus leaves', async() => {
        const user = userEvent.setup();
        render(
            <Field.Root validationMode="onBlur" validate={(value) => (String(value).length < 3 ? 'Too short' : null)}>
                <Field.Label>Handle</Field.Label>
                <Field.Control />
                <Field.Error />
            </Field.Root>
        );
        const input = screen.getByLabelText('Handle');
        await user.type(input, 'ab');
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        await user.tab();
        expect(screen.getByRole('alert')).toHaveTextContent('Too short');
        expect(input).toHaveAccessibleDescription('Too short');
    });

    test('validationMode onChange shows results while typing', async() => {
        const user = userEvent.setup();
        render(
            <Field.Root validationMode="onChange" validate={(value) => (String(value).includes(' ') ? 'No spaces' : null)}>
                <Field.Label>Slug</Field.Label>
                <Field.Control />
                <Field.Error />
            </Field.Root>
        );
        await user.type(screen.getByLabelText('Slug'), 'a b');
        expect(screen.getByRole('alert')).toHaveTextContent('No spaces');
    });

    test('a custom validate error blocks native form submission', () => {
        const onSubmit = jest.fn((event: React.FormEvent) => event.preventDefault());
        render(
            <form onSubmit={onSubmit}>
                <Field.Root validate={() => 'Taken'}>
                    <Field.Label>Username</Field.Label>
                    <Field.Control defaultValue="admin" />
                </Field.Root>
            </form>
        );
        const input = screen.getByLabelText('Username') as HTMLInputElement;
        expect(input.validity.customError).toBe(true);
        expect(input.validationMessage).toBe('Taken');
    });

    test('match picks the message for each validity problem', () => {
        render(
            <Field.Root required>
                <Field.Label>Email</Field.Label>
                <Field.Control type="email" defaultValue="nope" />
                <Field.Error match="valueMissing">Enter an email</Field.Error>
                <Field.Error match="typeMismatch">That doesn't look like an email</Field.Error>
            </Field.Root>
        );
        fireEvent.invalid(screen.getByLabelText('Email'));
        expect(screen.getByRole('alert')).toHaveTextContent('That doesn\'t look like an email');
        expect(screen.queryByText('Enter an email')).not.toBeInTheDocument();
    });

    test('validate returning several messages exposes them all through Field.Validity', async() => {
        const user = userEvent.setup();
        render(
            <Field.Root
                validationMode="onChange"
                validate={(value) => {
                    const text = String(value);
                    return [
                        text.length < 8 ? 'At least 8 characters' : null,
                        /\d/.test(text) ? null : 'At least one number'
                    ].filter(Boolean) as string[];
                }}
            >
                <Field.Label>Password</Field.Label>
                <Field.Control type="password" />
                <Field.Validity>
                    {({ errors, shown }) => (shown ? <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul> : null)}
                </Field.Validity>
            </Field.Root>
        );
        await user.type(screen.getByLabelText('Password'), 'abc');
        expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['At least 8 characters', 'At least one number']);
        await user.type(screen.getByLabelText('Password'), 'defgh1');
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });

    test('the invalid prop still forces the field invalid', () => {
        render(
            <Field.Root invalid>
                <Field.Label>Code</Field.Label>
                <Field.Control />
                <Field.Error>Server rejected this code</Field.Error>
            </Field.Root>
        );
        expect(screen.getByLabelText('Code')).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByRole('alert')).toHaveTextContent('Server rejected this code');
    });

    test('disabled fields skip validation', () => {
        render(
            <Field.Root required disabled>
                <Field.Label>Locked</Field.Label>
                <Field.Control />
                <Field.Error>Required</Field.Error>
            </Field.Root>
        );
        fireEvent.invalid(screen.getByLabelText('Locked'));
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('validates a Rad UI TextField composed with asChild', () => {
        render(
            <Field.Root required>
                <Field.Label>City</Field.Label>
                <Field.Control asChild>
                    <TextField />
                </Field.Control>
                <Field.Error match="valueMissing">Enter a city</Field.Error>
            </Field.Root>
        );
        const input = screen.getByLabelText('City');
        expect(input.tagName).toBe('INPUT');
        fireEvent.invalid(input);
        expect(screen.getByRole('alert')).toHaveTextContent('Enter a city');
        expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    test('a form reset hides shown errors and clears touched and dirty', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Field.Root required>
                    <Field.Label>Name</Field.Label>
                    <Field.Control />
                    <Field.Error match="valueMissing">Enter your name</Field.Error>
                </Field.Root>
            </form>
        );
        const input = screen.getByLabelText('Name');
        await user.type(input, 'a');
        await user.clear(input);
        fireEvent.invalid(input);
        expect(screen.getByRole('alert')).toBeInTheDocument();
        const root = input.closest('[data-slot="field-root"]');
        expect(root).toHaveAttribute('data-dirty');

        fireEvent.reset(screen.getByTestId('form'));
        await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
        expect(root).not.toHaveAttribute('data-dirty');
        expect(root).not.toHaveAttribute('data-touched');
    });

    test('a cancelled form reset keeps shown errors, touched and dirty', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form" onReset={(event) => event.preventDefault()}>
                <Field.Root required>
                    <Field.Label>Name</Field.Label>
                    <Field.Control />
                    <Field.Error match="valueMissing">Enter your name</Field.Error>
                </Field.Root>
            </form>
        );
        const input = screen.getByLabelText('Name');
        await user.type(input, 'a');
        await user.clear(input);
        fireEvent.invalid(input);
        const root = input.closest('[data-slot="field-root"]');

        fireEvent.reset(screen.getByTestId('form'));
        await act(() => new Promise((resolve) => setTimeout(resolve, 10)));
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(root).toHaveAttribute('data-dirty');
    });
});
