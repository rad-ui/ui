import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxCards from '../CheckboxCards';

describe('CheckboxCards', () => {
    it('renders items and content, and toggles checked state (uncontrolled)', () => {
        render(
            <CheckboxCards.Root name="fruits" defaultValue={['apple']}>
                <CheckboxCards.Item value="apple">
          Apple
                    <CheckboxCards.Content>
                        <CheckboxCards.Indicator />
                    </CheckboxCards.Content>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="banana">
          Banana
                    <CheckboxCards.Content>
                        <CheckboxCards.Indicator />
                    </CheckboxCards.Content>
                </CheckboxCards.Item>
            </CheckboxCards.Root>
        );

        // Apple is checked, Banana is not
        const appleCheckbox = screen.getByText('Apple').parentElement?.querySelector('[role="checkbox"]');
        const bananaCheckbox = screen.getByText('Banana').parentElement?.querySelector('[role="checkbox"]');
        expect(appleCheckbox).toHaveAttribute('aria-checked', 'true');
        expect(bananaCheckbox).toHaveAttribute('aria-checked', 'false');

        // Click Banana to check it
        if (bananaCheckbox) fireEvent.click(bananaCheckbox);
        expect(bananaCheckbox).toHaveAttribute('aria-checked', 'true');

        // Click Apple to uncheck it
        if (appleCheckbox) fireEvent.click(appleCheckbox);
        expect(appleCheckbox).toHaveAttribute('aria-checked', 'false');
    });

    it('supports controlled usage', () => {
        const handleChange = jest.fn();
        const value = ['banana'];
        render(
            <CheckboxCards.Root name="fruits" value={value} onValueChange={handleChange}>
                <CheckboxCards.Item value="apple">
          Apple
                    <CheckboxCards.Content>
                        <CheckboxCards.Indicator />
                    </CheckboxCards.Content>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="banana">
          Banana
                    <CheckboxCards.Content>
                        <CheckboxCards.Indicator />
                    </CheckboxCards.Content>
                </CheckboxCards.Item>
            </CheckboxCards.Root>
        );
        // Only banana is checked
        const checkboxes = screen.getAllByRole('checkbox');
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
            <CheckboxCards.Root name="fruits" required disabled>
                <CheckboxCards.Item value="apple">
          Apple
                    <CheckboxCards.Content>
                        <CheckboxCards.Indicator />
                    </CheckboxCards.Content>
                </CheckboxCards.Item>
            </CheckboxCards.Root>
        );
        const checkbox = screen.getByRole('checkbox');
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
                <CheckboxCards.Root name="fruits" defaultValue={['apple']}>
                    <CheckboxCards.Item value="apple">
            Apple
                        <CheckboxCards.Content>
                            <CheckboxCards.Indicator />
                        </CheckboxCards.Content>
                    </CheckboxCards.Item>
                    <CheckboxCards.Item value="banana">
            Banana
                        <CheckboxCards.Content>
                            <CheckboxCards.Indicator />
                        </CheckboxCards.Content>
                    </CheckboxCards.Item>
                </CheckboxCards.Root>
                <button type="submit">Submit</button>
            </form>
        );
        const bananaCheckbox = screen.getByText('Banana').parentElement?.querySelector('[role="checkbox"]');
        if (bananaCheckbox) fireEvent.click(bananaCheckbox);
        fireEvent.click(screen.getByText('Submit'));
        // The form should submit both apple and banana
        expect(handleSubmit).toHaveBeenCalled();
        const values = entries.filter(([key]) => key === 'fruits').map(([, value]) => value);
        expect(values).toEqual(expect.arrayContaining(['apple', 'banana']));
    });

    it('CheckboxCards itself renders null and warns', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { container } = render(<CheckboxCards />);
        expect(container).toBeEmptyDOMElement();
        expect(warn).toHaveBeenCalledWith(
            'Direct usage of CheckboxCards is not supported. Please use CheckboxCards.Root, CheckboxCards.Item instead.'
        );
        warn.mockRestore();
    });

    it('forwards ref to item trigger', () => {
        const ref = React.createRef<HTMLButtonElement>();
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <CheckboxCards.Root name="fruits">
                <CheckboxCards.Item value="apple" ref={ref}>
          Apple
                    <CheckboxCards.Content>
                        <CheckboxCards.Indicator />
                    </CheckboxCards.Content>
                </CheckboxCards.Item>
            </CheckboxCards.Root>
        );
        const checkbox = screen.getByRole('checkbox');
        expect(ref.current).toBe(checkbox);
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });
});
