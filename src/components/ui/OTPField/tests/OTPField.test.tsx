import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OTPField from '../OTPField';

const Code = (props: Partial<React.ComponentProps<typeof OTPField.Root>>) => (
    <OTPField.Root length={4} aria-label="Verification code" {...props}>
        <OTPField.Input />
        <OTPField.Input />
        <OTPField.Input />
        <OTPField.Input />
    </OTPField.Root>
);

const slots = () => screen.getAllByRole('textbox') as HTMLInputElement[];
const values = () => slots().map((input) => input.value).join('');

describe('OTPField', () => {
    test('renders a labelled group of slots', () => {
        render(<Code />);
        expect(screen.getByRole('group', { name: 'Verification code' })).toBeInTheDocument();
        expect(slots()).toHaveLength(4);
        expect(slots()[0]).toHaveAccessibleName('Character 1 of 4');
        expect(slots()[0]).toHaveAttribute('autocomplete', 'one-time-code');
        expect(slots()[1]).toHaveAttribute('autocomplete', 'off');
        expect(slots()[0]).toHaveAttribute('inputmode', 'numeric');
    });

    test('typing fills slots and moves focus forward', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Code onValueChange={onValueChange} />);
        await user.click(slots()[0]);
        await user.keyboard('12');
        expect(values()).toBe('12');
        expect(slots()[2]).toHaveFocus();
        expect(onValueChange).toHaveBeenLastCalledWith('12');
    });

    test('rejects characters the validation type does not allow', async() => {
        const user = userEvent.setup();
        render(<Code />);
        await user.click(slots()[0]);
        await user.keyboard('a1');
        expect(values()).toBe('1');
    });

    test('alphanumeric accepts letters', async() => {
        const user = userEvent.setup();
        render(<Code validationType="alphanumeric" />);
        await user.click(slots()[0]);
        await user.keyboard('a1');
        expect(values()).toBe('a1');
        expect(slots()[0]).toHaveAttribute('inputmode', 'text');
    });

    test('pasting a code fills every slot and reports completion', () => {
        const onValueComplete = jest.fn();
        render(<Code onValueComplete={onValueComplete} />);
        fireEvent.paste(slots()[0], { clipboardData: { getData: () => '98-76' } });
        expect(values()).toBe('9876');
        expect(onValueComplete).toHaveBeenCalledWith('9876');
        expect(screen.getByRole('group')).toHaveAttribute('data-complete');
    });

    test('a full code autofilled into the first slot spreads forward', () => {
        render(<Code />);
        fireEvent.change(slots()[0], { target: { value: '4321' } });
        expect(values()).toBe('4321');
    });

    test('backspace clears the slot, then moves back on an empty one', async() => {
        const user = userEvent.setup();
        render(<Code defaultValue="123" />);
        await user.click(slots()[2]);
        await user.keyboard('{Backspace}');
        expect(values()).toBe('12');
        expect(slots()[2]).toHaveFocus();
        await user.keyboard('{Backspace}');
        expect(values()).toBe('1');
        expect(slots()[1]).toHaveFocus();
    });

    test('typing over a filled slot replaces it', async() => {
        const user = userEvent.setup();
        render(<Code defaultValue="123" />);
        await user.click(slots()[1]);
        await user.keyboard('9');
        expect(values()).toBe('193');
    });

    test('focusing past the first empty slot moves to it', async() => {
        const user = userEvent.setup();
        render(<Code defaultValue="1" />);
        await user.click(slots()[3]);
        expect(slots()[1]).toHaveFocus();
    });

    test('arrow keys, Home and End move between slots', async() => {
        const user = userEvent.setup();
        render(<Code defaultValue="1234" />);
        await user.click(slots()[1]);
        await user.keyboard('{ArrowRight}');
        expect(slots()[2]).toHaveFocus();
        await user.keyboard('{ArrowLeft}{ArrowLeft}');
        expect(slots()[0]).toHaveFocus();
        await user.keyboard('{End}');
        expect(slots()[3]).toHaveFocus();
        await user.keyboard('{Home}');
        expect(slots()[0]).toHaveFocus();
    });

    test('submits the code through a hidden input', () => {
        const { container } = render(<Code name="otp" defaultValue="1234" />);
        const hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement;
        expect(hidden.name).toBe('otp');
        expect(hidden.value).toBe('1234');
    });

    test('type password masks the slots', () => {
        const { container } = render(<Code type="password" />);
        expect(container.querySelectorAll('input[type="password"]')).toHaveLength(4);
    });

    test('disabled and read-only fields ignore input', async() => {
        const user = userEvent.setup();
        const { unmount } = render(<Code disabled />);
        expect(slots()[0]).toBeDisabled();
        unmount();
        render(<Code readOnly defaultValue="12" />);
        fireEvent.paste(slots()[0], { clipboardData: { getData: () => '9999' } });
        await user.click(slots()[0]);
        await user.keyboard('{Backspace}');
        expect(values()).toBe('12');
    });

    test('controlled value drives the slots', () => {
        const { rerender } = render(<Code value="12" onValueChange={() => {}} />);
        expect(values()).toBe('12');
        rerender(<Code value="5678" onValueChange={() => {}} />);
        expect(values()).toBe('5678');
    });

    test('forwards refs', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const inputRef = React.createRef<HTMLInputElement>();
        render(
            <OTPField.Root ref={rootRef} length={1}>
                <OTPField.Input ref={inputRef} />
            </OTPField.Root>
        );
        expect(rootRef.current).toHaveAttribute('role', 'group');
        expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    });
});
