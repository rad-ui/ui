import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioGroupPrimitive from '../RadioGroupPrimitive';


describe('RadioGroupPrimitive', () => {
    it('renders radio items and allows selection (uncontrolled)', () => {
        render(
            <RadioGroupPrimitive.Root defaultValue="b" name="test-group">
                <RadioGroupPrimitive.Item value="a">Option A</RadioGroupPrimitive.Item>
                <RadioGroupPrimitive.Item value="b">Option B</RadioGroupPrimitive.Item>
                <RadioGroupPrimitive.Item value="c">Option C</RadioGroupPrimitive.Item>
            </RadioGroupPrimitive.Root>
        );
        const radioA = screen.getByText('Option A').closest('button');
        const radioB = screen.getByText('Option B').closest('button');
        const radioC = screen.getByText('Option C').closest('button');
        expect(radioA).toHaveAttribute('aria-checked', 'false');
        expect(radioB).toHaveAttribute('aria-checked', 'true');
        expect(radioC).toHaveAttribute('aria-checked', 'false');
        fireEvent.click(radioA!);
        expect(radioA).toHaveAttribute('aria-checked', 'true');
        expect(radioB).toHaveAttribute('aria-checked', 'false');
        expect(radioC).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onValueChange in controlled mode', () => {
        const handleChange = jest.fn();
        render(
            <RadioGroupPrimitive.Root value="a" onValueChange={handleChange} name="test-group">
                <RadioGroupPrimitive.Item value="a">Option A</RadioGroupPrimitive.Item>
                <RadioGroupPrimitive.Item value="b">Option B</RadioGroupPrimitive.Item>
            </RadioGroupPrimitive.Root>
        );
        const radioB = screen.getByText('Option B').closest('button');
        fireEvent.click(radioB!);
        expect(handleChange).toHaveBeenCalledWith('b');
    });

    it('disables all radios when group is disabled', () => {
        render(
            <RadioGroupPrimitive.Root defaultValue="a" disabled name="test-group">
                <RadioGroupPrimitive.Item value="a">Option A</RadioGroupPrimitive.Item>
                <RadioGroupPrimitive.Item value="b">Option B</RadioGroupPrimitive.Item>
            </RadioGroupPrimitive.Root>
        );
        const radioA = screen.getByText('Option A').closest('button');
        const radioB = screen.getByText('Option B').closest('button');
        expect(radioA).toHaveAttribute('aria-disabled', 'true');
        expect(radioB).toHaveAttribute('aria-disabled', 'true');
    });

    it('disables individual radio when disabled', () => {
        render(
            <RadioGroupPrimitive.Root defaultValue="a" name="test-group">
                <RadioGroupPrimitive.Item value="a" disabled>Option A</RadioGroupPrimitive.Item>
                <RadioGroupPrimitive.Item value="b">Option B</RadioGroupPrimitive.Item>
            </RadioGroupPrimitive.Root>
        );
        const radioA = screen.getByText('Option A').closest('button');
        const radioB = screen.getByText('Option B').closest('button');
        expect(radioA).toHaveAttribute('aria-disabled', 'true');
        expect(radioB).not.toHaveAttribute('aria-disabled', 'true');
    });

    it('sets required and name attributes', () => {
        render(
            <RadioGroupPrimitive.Root defaultValue="a" required name="my-radio-group">
                <RadioGroupPrimitive.Item value="a">Option A</RadioGroupPrimitive.Item>
            </RadioGroupPrimitive.Root>
        );
        // required is set on the group, not the button, but we can check the group
        const group = screen.getByRole('radiogroup');
        expect(group).toHaveAttribute('aria-required', 'true');
        // name is set on the hidden input, so we check for it
        const hiddenInput = screen.getByDisplayValue('a');
        expect(hiddenInput).toHaveAttribute('name', 'my-radio-group');
    });

    it('throws error if RadioGroupPrimitive.Item is used outside RadioGroupPrimitive.Root', () => {
        // Suppress error output for this test
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => {
            render(<RadioGroupPrimitive.Item value="a">Option A</RadioGroupPrimitive.Item>);
        }).toThrow('RadioGroup.Item must be used within a RadioGroup.Root');
        spy.mockRestore();
    });
});
