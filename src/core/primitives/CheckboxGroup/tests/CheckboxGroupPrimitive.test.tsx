import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxGroupPrimitive from '../CheckboxGroupPrimitive';

const TickIcon = () => (
    <svg data-testid="tick-icon" />
);

describe('CheckboxGroupPrimitive', () => {
    it('renders triggers and content, and toggles checked state (uncontrolled, storybook pattern)', () => {
        const { container } = render(
            <CheckboxGroupPrimitive.Root name="fruits" defaultValue={['apple']}>
                <div>
                    <CheckboxGroupPrimitive.Trigger value="apple">
                        <CheckboxGroupPrimitive.Content>
                            <TickIcon />
                        </CheckboxGroupPrimitive.Content>
                    </CheckboxGroupPrimitive.Trigger>
                    <label>Apple</label>
                </div>
                <div>
                    <CheckboxGroupPrimitive.Trigger value="banana">
                        <CheckboxGroupPrimitive.Content>
                            <TickIcon />
                        </CheckboxGroupPrimitive.Content>
                    </CheckboxGroupPrimitive.Trigger>
                    <label>Banana</label>
                </div>
                <div>
                    <CheckboxGroupPrimitive.Trigger value="cherry">
                        <CheckboxGroupPrimitive.Content>
                            <TickIcon />
                        </CheckboxGroupPrimitive.Content>
                    </CheckboxGroupPrimitive.Trigger>
                    <label>Cherry</label>
                </div>
            </CheckboxGroupPrimitive.Root>
        );

        const checkboxes = container.querySelectorAll('[role="checkbox"]');
        expect(checkboxes.length).toBe(3);
        // Apple is checked, Banana and Cherry are not
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'false');
        expect(checkboxes[2]).toHaveAttribute('aria-checked', 'false');
        expect(screen.getAllByTestId('tick-icon').length).toBe(1);

        // Click Banana to check it
        fireEvent.click(checkboxes[1]);
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[2]).toHaveAttribute('aria-checked', 'false');
        expect(screen.getAllByTestId('tick-icon').length).toBe(2);

        // Click Apple to uncheck it
        fireEvent.click(checkboxes[0]);
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'false');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[2]).toHaveAttribute('aria-checked', 'false');
        expect(screen.getAllByTestId('tick-icon').length).toBe(1);

        // Click Cherry to check it
        fireEvent.click(checkboxes[2]);
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'false');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[2]).toHaveAttribute('aria-checked', 'true');
        expect(screen.getAllByTestId('tick-icon').length).toBe(2);
    });

    it('supports controlled usage (storybook pattern)', () => {
        function ControlledWrapper() {
            const [checked, setChecked] = React.useState(['banana']);
            return (
                <CheckboxGroupPrimitive.Root name="fruits" value={checked} onValueChange={setChecked}>
                    <div>
                        <CheckboxGroupPrimitive.Trigger value="apple">
                            <CheckboxGroupPrimitive.Content>
                                <TickIcon />
                            </CheckboxGroupPrimitive.Content>
                        </CheckboxGroupPrimitive.Trigger>
                        <label>Apple</label>
                    </div>
                    <div>
                        <CheckboxGroupPrimitive.Trigger value="banana">
                            <CheckboxGroupPrimitive.Content>
                                <TickIcon />
                            </CheckboxGroupPrimitive.Content>
                        </CheckboxGroupPrimitive.Trigger>
                        <label>Banana</label>
                    </div>
                    <div>
                        <CheckboxGroupPrimitive.Trigger value="cherry">
                            <CheckboxGroupPrimitive.Content>
                                <TickIcon />
                            </CheckboxGroupPrimitive.Content>
                        </CheckboxGroupPrimitive.Trigger>
                        <label>Cherry</label>
                    </div>
                </CheckboxGroupPrimitive.Root>
            );
        }
        const { container } = render(<ControlledWrapper />);
        const checkboxes = container.querySelectorAll('[role="checkbox"]');
        // Only banana is checked
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'false');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[2]).toHaveAttribute('aria-checked', 'false');
        // Click apple
        fireEvent.click(checkboxes[0]);
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[2]).toHaveAttribute('aria-checked', 'false');
        // Click banana
        fireEvent.click(checkboxes[1]);
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'false');
        expect(checkboxes[2]).toHaveAttribute('aria-checked', 'false');
        // Click cherry
        fireEvent.click(checkboxes[2]);
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'false');
        expect(checkboxes[2]).toHaveAttribute('aria-checked', 'true');
    });

    it('respects disabled and required props (storybook pattern)', () => {
        const { container } = render(
            <CheckboxGroupPrimitive.Root name="fruits" required disabled>
                <div>
                    <CheckboxGroupPrimitive.Trigger value="apple">
                        <CheckboxGroupPrimitive.Content>
                            <TickIcon />
                        </CheckboxGroupPrimitive.Content>
                    </CheckboxGroupPrimitive.Trigger>
                    <label>Apple</label>
                </div>
            </CheckboxGroupPrimitive.Root>
        );
        const checkbox = container.querySelector('[role="checkbox"]');
        expect(checkbox).toBeDisabled();
        expect(checkbox).toHaveAttribute('aria-required', 'true');
        // The hidden input should also be disabled and required
        const input = checkbox?.parentElement?.querySelector('input[type="checkbox"]');
        expect(input).toBeDisabled();
        expect(input).toBeRequired();
    });

    it('works in a form and submits checked values (storybook pattern)', () => {
        let entries: [string, FormDataEntryValue][] = [];
        const handleSubmit = jest.fn((e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            // @ts-ignore
            entries = Array.from(formData.entries());
        });
        const { container } = render(
            <form onSubmit={handleSubmit}>
                <CheckboxGroupPrimitive.Root name="fruits" defaultValue={['apple']}>
                    <div>
                        <CheckboxGroupPrimitive.Trigger value="apple">
                            <CheckboxGroupPrimitive.Content>
                                <TickIcon />
                            </CheckboxGroupPrimitive.Content>
                        </CheckboxGroupPrimitive.Trigger>
                        <label>Apple</label>
                    </div>
                    <div>
                        <CheckboxGroupPrimitive.Trigger value="banana">
                            <CheckboxGroupPrimitive.Content>
                                <TickIcon />
                            </CheckboxGroupPrimitive.Content>
                        </CheckboxGroupPrimitive.Trigger>
                        <label>Banana</label>
                    </div>
                    <div>
                        <CheckboxGroupPrimitive.Trigger value="cherry">
                            <CheckboxGroupPrimitive.Content>
                                <TickIcon />
                            </CheckboxGroupPrimitive.Content>
                        </CheckboxGroupPrimitive.Trigger>
                        <label>Cherry</label>
                    </div>
                </CheckboxGroupPrimitive.Root>
                <button type="submit">Submit</button>
            </form>
        );
        const checkboxes = container.querySelectorAll('[role="checkbox"]');
        fireEvent.click(checkboxes[1]); // check banana
        fireEvent.click(checkboxes[2]); // check cherry
        fireEvent.click(screen.getByText('Submit'));
        // The form should submit apple, banana, and cherry
        expect(handleSubmit).toHaveBeenCalled();
        const values = entries.filter(([key]) => key === 'fruits').map(([, value]) => value);
        expect(values).toEqual(expect.arrayContaining(['apple', 'banana', 'cherry']));
    });

    it('CheckboxGroupPrimitive itself renders null and warns', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { container } = render(<CheckboxGroupPrimitive />);
        expect(container).toBeEmptyDOMElement();
        expect(warn).toHaveBeenCalledWith(
            'Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.'
        );
        warn.mockRestore();
    });
});
