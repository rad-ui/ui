import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckboxPrimitive from '../index';

const TickIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
);

describe('CheckboxPrimitive', () => {
    it('renders and toggles (uncontrolled)', () => {
        const { container, queryByText } = render(
            <CheckboxPrimitive.Root defaultChecked={false} className="test-class">
                <CheckboxPrimitive.Indicator>
                    <span>Checked</span>
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        );
        const button = container.querySelector('button');
        expect(button).toHaveAttribute('aria-checked', 'false');
        expect(queryByText('Checked')).toBeNull();
        fireEvent.click(button!);
        expect(button).toHaveAttribute('aria-checked', 'true');
        expect(queryByText('Checked')).toBeInTheDocument();
        fireEvent.click(button!);
        expect(button).toHaveAttribute('aria-checked', 'false');
    });

    it('supports controlled checked prop', () => {
        const onCheckedChange = jest.fn();
        const { container, queryByText, rerender } = render(
            <CheckboxPrimitive.Root checked={false} onCheckedChange={onCheckedChange}>
                <CheckboxPrimitive.Indicator>
                    <span>Checked</span>
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        );
        const button = container.querySelector('button');
        expect(button).toHaveAttribute('aria-checked', 'false');
        expect(queryByText('Checked')).toBeNull();
        fireEvent.click(button!);
        expect(onCheckedChange).toHaveBeenCalled();
        rerender(
            <CheckboxPrimitive.Root checked={true} onCheckedChange={onCheckedChange}>
                <CheckboxPrimitive.Indicator>
                    <span>Checked</span>
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        );
        expect(button).toHaveAttribute('aria-checked', 'true');
        expect(queryByText('Checked')).toBeInTheDocument();
    });

    it('applies disabled and required props', () => {
        const { container } = render(
            <CheckboxPrimitive.Root disabled required>
                <CheckboxPrimitive.Indicator>
                    <span>Checked</span>
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        );
        const button = container.querySelector('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-required', 'true');
    });

    it('passes name and value to the hidden input for form usage', () => {
        const { container } = render(
            <form>
                <CheckboxPrimitive.Root name="testName" value="testValue" defaultChecked>
                    <CheckboxPrimitive.Indicator>
                        <TickIcon />
                    </CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>
            </form>
        );
        const input = container.querySelector('input[type="checkbox"]');
        expect(input).toHaveAttribute('name', 'testName');
        expect(input).toHaveAttribute('value', 'testValue');
        expect(input).toBeChecked();
    });

    it('integrates with forms and submits checked value', () => {
        let submittedData: Record<string, FormDataEntryValue> | undefined;
        const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            submittedData = Object.fromEntries(Array.from((formData as any).entries()));
        });
        const { container } = render(
            <form onSubmit={handleSubmit}>
                <CheckboxPrimitive.Root name="accept" value="yes" required>
                    <CheckboxPrimitive.Indicator>
                        <TickIcon />
                    </CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>
                <button type="submit">Submit</button>
            </form>
        );
        const button = container.querySelector('button');
        fireEvent.click(button!); // check it
        const submitButton = container.querySelector('button[type="submit"]');
        if (submitButton) {
            fireEvent.click(submitButton);
        }
        expect(handleSubmit).toHaveBeenCalled();
        expect(submittedData).toEqual({ accept: 'yes' });
    });

    it('applies className to the trigger', () => {
        const { container } = render(
            <CheckboxPrimitive.Root className="my-checkbox">
                <CheckboxPrimitive.Indicator>
                    <TickIcon />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        );
        const button = container.querySelector('button');
        expect(button).toHaveClass('my-checkbox');
    });
});
