import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxGroup from '../CheckboxGroup';

describe('CheckboxGroup', () => {
    it('renders triggers and content, and toggles checked state (uncontrolled)', () => {
        render(
            <CheckboxGroup.Root name="fruits" defaultValue={['apple']}>
                <CheckboxGroup.Label>
                    <CheckboxGroup.Trigger value="apple">
                        <CheckboxGroup.Indicator />
                    </CheckboxGroup.Trigger>
          Apple
                </CheckboxGroup.Label>
                <CheckboxGroup.Label>
                    <CheckboxGroup.Trigger value="banana">
                        <CheckboxGroup.Indicator />
                    </CheckboxGroup.Trigger>
          Banana
                </CheckboxGroup.Label>
            </CheckboxGroup.Root>
        );

        // Apple is checked, Banana is not
        const appleCheckbox = screen.getByRole('checkbox', { name: 'Apple' });
        const bananaCheckbox = screen.getByRole('checkbox', { name: 'Banana' });
        expect(appleCheckbox).toHaveAttribute('aria-checked', 'true');
        expect(bananaCheckbox).toHaveAttribute('aria-checked', 'false');

        // Click Banana to check it
        fireEvent.click(bananaCheckbox);
        expect(bananaCheckbox).toHaveAttribute('aria-checked', 'true');

        // Click Apple to uncheck it
        fireEvent.click(appleCheckbox);
        expect(appleCheckbox).toHaveAttribute('aria-checked', 'false');
    });

    it('supports controlled usage', () => {
        const handleChange = jest.fn();
        const value = ['banana'];
        render(
            <CheckboxGroup.Root name="fruits" value={value} onValueChange={handleChange}>
                <CheckboxGroup.Label>
                    <CheckboxGroup.Trigger value="apple">
                        <CheckboxGroup.Indicator />
                    </CheckboxGroup.Trigger>
          Apple
                </CheckboxGroup.Label>
                <CheckboxGroup.Label>
                    <CheckboxGroup.Trigger value="banana">
                        <CheckboxGroup.Indicator />
                    </CheckboxGroup.Trigger>
          Banana
                </CheckboxGroup.Label>
            </CheckboxGroup.Root>
        );
        // Only banana is checked
        const checkboxes = [
            screen.getByRole('checkbox', { name: 'Apple' }),
            screen.getByRole('checkbox', { name: 'Banana' })
        ];
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'false');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
        // Click apple
        fireEvent.click(checkboxes[0]);
        expect(handleChange).toHaveBeenCalledWith(['banana', 'apple']);
        // Click banana
        fireEvent.click(checkboxes[1]);
        expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('respects disabled and required props', () => {
        render(
            <CheckboxGroup.Root name="fruits" required disabled>
                <CheckboxGroup.Label>
                    <CheckboxGroup.Trigger value="apple">
                        <CheckboxGroup.Indicator />
                    </CheckboxGroup.Trigger>
          Apple
                </CheckboxGroup.Label>
            </CheckboxGroup.Root>
        );
        const checkbox = screen.getByRole('checkbox', { name: 'Apple' });
        expect(checkbox).toBeDisabled();
        expect(checkbox).toHaveAttribute('aria-required', 'true');
        // The hidden input should also be disabled and required
        const input = checkbox.parentElement?.parentElement?.querySelector('input[type="checkbox"]');
        expect(input).toBeDisabled();
        expect(input).toBeRequired();
    });

    it('works in a form and submits checked values', () => {
        let entries: [string, FormDataEntryValue][] = [];
        const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            // @ts-ignore
            entries = Array.from(formData.entries());
        });
        render(
            <form onSubmit={handleSubmit}>
                <CheckboxGroup.Root name="fruits" defaultValue={['apple']}>
                    <CheckboxGroup.Label>
                        <CheckboxGroup.Trigger value="apple">
                            <CheckboxGroup.Indicator />
                        </CheckboxGroup.Trigger>
            Apple
                    </CheckboxGroup.Label>
                    <CheckboxGroup.Label>
                        <CheckboxGroup.Trigger value="banana">
                            <CheckboxGroup.Indicator />
                        </CheckboxGroup.Trigger>
            Banana
                    </CheckboxGroup.Label>
                </CheckboxGroup.Root>
                <button type="submit">Submit</button>
            </form>
        );
        const bananaCheckbox = screen.getByRole('checkbox', { name: 'Banana' });
        fireEvent.click(bananaCheckbox);
        fireEvent.click(screen.getByText('Submit'));
        // The form should submit both apple and banana
        expect(handleSubmit).toHaveBeenCalled();
        const values = entries.filter(([key]) => key === 'fruits').map(([, value]) => value);
        expect(values).toEqual(expect.arrayContaining(['apple', 'banana']));
    });

    it('CheckboxGroup itself renders null and warns', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { container } = render(<CheckboxGroup />);
        expect(container).toBeEmptyDOMElement();
        expect(warn).toHaveBeenCalledWith(
            'Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.'
        );
        warn.mockRestore();
    });
});
