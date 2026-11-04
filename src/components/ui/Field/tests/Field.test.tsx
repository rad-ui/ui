import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from '~/components/ui/TextField/TextField';
import TextArea from '~/components/ui/TextArea/TextArea';
import Field from '../Field';

describe('Field', () => {
    test('links the label to the control', () => {
        render(
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Field.Control type="email" />
            </Field.Root>
        );
        const control = screen.getByLabelText('Email');
        expect(control.tagName).toBe('INPUT');
        expect(control).toHaveAttribute('type', 'email');
    });

    test('adds descriptions to the accessible description', () => {
        render(
            <Field.Root>
                <Field.Label>Password</Field.Label>
                <Field.Control type="password" />
                <Field.Description>At least 8 characters.</Field.Description>
            </Field.Root>
        );
        expect(screen.getByLabelText('Password')).toHaveAccessibleDescription('At least 8 characters.');
    });

    test('renders the error only while invalid, after descriptions, and marks the control invalid', () => {
        const { rerender } = render(
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Field.Control />
                <Field.Error>That email is taken.</Field.Error>
                <Field.Description>We never share it.</Field.Description>
            </Field.Root>
        );
        const control = screen.getByLabelText('Email');
        expect(screen.queryByText('That email is taken.')).not.toBeInTheDocument();
        expect(control).not.toHaveAttribute('aria-invalid');
        expect(control).toHaveAccessibleDescription('We never share it.');

        rerender(
            <Field.Root invalid>
                <Field.Label>Email</Field.Label>
                <Field.Control />
                <Field.Error>That email is taken.</Field.Error>
                <Field.Description>We never share it.</Field.Description>
            </Field.Root>
        );
        expect(control).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByRole('alert')).toHaveTextContent('That email is taken.');
        expect(control).toHaveAccessibleDescription('We never share it. That email is taken.');
    });

    test('a force-mounted error stays hidden and out of the description while valid', () => {
        render(
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Field.Control />
                <Field.Error forceMount>Required.</Field.Error>
            </Field.Root>
        );
        const error = screen.getByText('Required.');
        expect(error).toHaveAttribute('hidden');
        expect(error).not.toHaveAttribute('role');
        expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-describedby');
    });

    test('keeps a control id passed by the consumer and points the label at it', () => {
        render(
            <Field.Root>
                <Field.Label>Name</Field.Label>
                <Field.Control id="custom-name" />
            </Field.Root>
        );
        expect(screen.getByText('Name')).toHaveAttribute('for', 'custom-name');
        expect(screen.getByLabelText('Name')).toHaveAttribute('id', 'custom-name');
    });

    test('merges a consumer aria-describedby with the field descriptions', () => {
        render(
            <Field.Root>
                <Field.Label>Code</Field.Label>
                <Field.Control aria-describedby="external" />
                <Field.Description>Six digits.</Field.Description>
            </Field.Root>
        );
        const ids = screen.getByLabelText('Code').getAttribute('aria-describedby')?.split(' ');
        expect(ids?.[0]).toBe('external');
        expect(ids).toHaveLength(2);
    });

    test('passes name, disabled and required to the control', () => {
        render(
            <Field.Root name="email" disabled required>
                <Field.Label>Email</Field.Label>
                <Field.Control />
            </Field.Root>
        );
        const control = screen.getByLabelText(/Email/);
        expect(control).toHaveAttribute('name', 'email');
        expect(control).toBeDisabled();
        expect(control).toBeRequired();
    });

    test('wires a TextField through asChild', async() => {
        const user = userEvent.setup();
        render(
            <Field.Root invalid>
                <Field.Label>Email</Field.Label>
                <Field.Control asChild>
                    <TextField type="email" />
                </Field.Control>
                <Field.Error>Enter a valid email.</Field.Error>
            </Field.Root>
        );
        const input = screen.getByLabelText('Email');
        expect(input.tagName).toBe('INPUT');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAccessibleDescription('Enter a valid email.');
        await user.type(input, 'a');
        expect(input).toHaveValue('a');
    });

    test('wires a TextArea through asChild', () => {
        render(
            <Field.Root>
                <Field.Label>Bio</Field.Label>
                <Field.Control asChild>
                    <TextArea />
                </Field.Control>
                <Field.Description>Shown on your profile.</Field.Description>
            </Field.Root>
        );
        const textarea = screen.getByLabelText('Bio');
        expect(textarea.tagName).toBe('TEXTAREA');
        expect(textarea).toHaveAccessibleDescription('Shown on your profile.');
    });

    test('tracks focused, touched and dirty state as data attributes', async() => {
        const user = userEvent.setup();
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        const onChange = jest.fn();
        const { container } = render(
            <Field.Root>
                <Field.Label>Name</Field.Label>
                <Field.Control onFocus={onFocus} onBlur={onBlur} onChange={onChange} />
            </Field.Root>
        );
        const root = container.firstElementChild as HTMLElement;
        const control = screen.getByLabelText('Name');
        expect(root).not.toHaveAttribute('data-touched');

        await user.click(control);
        expect(root).toHaveAttribute('data-focused');
        expect(control).toHaveAttribute('data-focused');

        await user.type(control, 'Ada');
        expect(root).toHaveAttribute('data-dirty');

        await user.tab();
        expect(root).not.toHaveAttribute('data-focused');
        expect(root).toHaveAttribute('data-touched');
        expect(onFocus).toHaveBeenCalled();
        expect(onBlur).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(3);
    });

    test('marks every part invalid and disabled', () => {
        render(
            <Field.Root invalid disabled data-testid="root">
                <Field.Label>Email</Field.Label>
                <Field.Control />
                <Field.Description>Help</Field.Description>
                <Field.Error>Error</Field.Error>
            </Field.Root>
        );
        for (const element of [
            screen.getByTestId('root'),
            screen.getByText('Email'),
            screen.getByLabelText('Email'),
            screen.getByText('Help'),
            screen.getByText('Error')
        ]) {
            expect(element).toHaveAttribute('data-invalid');
            expect(element).toHaveAttribute('data-disabled');
        }
    });

    test('forwards refs to every part', () => {
        const refs = {
            root: React.createRef<HTMLDivElement>(),
            label: React.createRef<HTMLLabelElement>(),
            control: React.createRef<HTMLInputElement>(),
            description: React.createRef<HTMLParagraphElement>(),
            error: React.createRef<HTMLParagraphElement>()
        };
        render(
            <Field.Root ref={refs.root} invalid>
                <Field.Label ref={refs.label}>Email</Field.Label>
                <Field.Control ref={refs.control} />
                <Field.Description ref={refs.description}>Help</Field.Description>
                <Field.Error ref={refs.error}>Error</Field.Error>
            </Field.Root>
        );
        expect(refs.root.current).toBeInstanceOf(HTMLDivElement);
        expect(refs.label.current).toBeInstanceOf(HTMLLabelElement);
        expect(refs.control.current).toBeInstanceOf(HTMLInputElement);
        expect(refs.description.current).toBeInstanceOf(HTMLParagraphElement);
        expect(refs.error.current).toBeInstanceOf(HTMLParagraphElement);
    });

    test('supports asChild on the root, label and description', () => {
        render(
            <Field.Root asChild>
                <section data-testid="root">
                    <Field.Label asChild><span>Email</span></Field.Label>
                    <Field.Control aria-label="Email" />
                    <Field.Description asChild><small>Help</small></Field.Description>
                </section>
            </Field.Root>
        );
        expect(screen.getByTestId('root').tagName).toBe('SECTION');
        expect(screen.getByTestId('root')).toHaveAttribute('data-slot', 'field-root');
        expect(screen.getByText('Email').tagName).toBe('SPAN');
        expect(screen.getByText('Help').tagName).toBe('SMALL');
        expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Help');
    });

    test('generates part classes from customRootClass', () => {
        render(
            <Field.Root customRootClass="acme" data-testid="root" invalid>
                <Field.Label>Email</Field.Label>
                <Field.Control />
                <Field.Description>Help</Field.Description>
                <Field.Error>Error</Field.Error>
            </Field.Root>
        );
        expect(screen.getByTestId('root')).toHaveClass('acme-field');
        expect(screen.getByText('Email')).toHaveClass('acme-field-label');
        expect(screen.getByLabelText('Email')).toHaveClass('acme-field-control');
        expect(screen.getByText('Help')).toHaveClass('acme-field-description');
        expect(screen.getByText('Error')).toHaveClass('acme-field-error');
    });

    test('throws a clear error when a part is used outside Field.Root', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => render(<Field.Label>Orphan</Field.Label>)).toThrow('Field.Label must be rendered inside Field.Root.');
        spy.mockRestore();
    });

    test('two fields get distinct ids', () => {
        render(
            <>
                <Field.Root><Field.Label>First</Field.Label><Field.Control /></Field.Root>
                <Field.Root><Field.Label>Second</Field.Label><Field.Control /></Field.Root>
            </>
        );
        expect(screen.getByLabelText('First').id).not.toBe(screen.getByLabelText('Second').id);
    });
});
