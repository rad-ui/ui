import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OTPField from '../OTPField';

const Code = (props: Partial<React.ComponentProps<typeof OTPField.Root>>) => (
    <OTPField.Root length={4} aria-label="Code" {...props}>
        <OTPField.Input aria-label="1" />
        <OTPField.Input aria-label="2" />
        <OTPField.Separator />
        <OTPField.Input aria-label="3" />
        <OTPField.Input aria-label="4" />
    </OTPField.Root>
);

describe('OTPField options', () => {
    test('a required code blocks the form until every slot is filled', async() => {
        const user = userEvent.setup();
        render(<form data-testid="form"><Code name="code" required /></form>);
        const form = screen.getByTestId('form') as HTMLFormElement;
        expect(form.checkValidity()).toBe(false);
        await user.click(screen.getByLabelText('1'));
        await user.keyboard('12');
        expect(form.checkValidity()).toBe(false);
        await user.keyboard('34');
        expect(form.checkValidity()).toBe(true);
        expect(new FormData(form).get('code')).toBe('1234');
    });

    test('normalizeValue runs before validation', () => {
        const onValueChange = jest.fn();
        render(<Code validationType="alpha" normalizeValue={(text) => text.toUpperCase()} onValueChange={onValueChange} />);
        fireEvent.paste(screen.getByLabelText('1'), { clipboardData: { getData: () => 'ab' } });
        expect(onValueChange).toHaveBeenLastCalledWith('AB');
    });

    test('onValueInvalid reports rejected characters', () => {
        const onValueInvalid = jest.fn();
        render(<Code onValueInvalid={onValueInvalid} />);
        fireEvent.paste(screen.getByLabelText('1'), { clipboardData: { getData: () => '1a2b' } });
        expect(onValueInvalid).toHaveBeenCalledWith('1a2b', { rejected: 'ab' });
    });

    test('mask, inputMode and autoComplete', () => {
        render(<Code mask inputMode="text" autoComplete="off" />);
        const first = screen.getByLabelText('1');
        expect(first).toHaveAttribute('type', 'password');
        expect(first).toHaveAttribute('inputmode', 'text');
        expect(first).toHaveAttribute('autocomplete', 'off');
    });

    test('Separator is a separator, and slots skip it', async() => {
        const user = userEvent.setup();
        render(<Code />);
        expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
        await user.click(screen.getByLabelText('1'));
        await user.keyboard('123');
        expect(screen.getByLabelText('3')).toHaveValue('3');
    });

    test('form attribute', () => {
        render(<><form id="outside" /><Code name="code" form="outside" defaultValue="12" /></>);
        expect(new FormData(document.getElementById('outside') as HTMLFormElement).get('code')).toBe('12');
    });
});
