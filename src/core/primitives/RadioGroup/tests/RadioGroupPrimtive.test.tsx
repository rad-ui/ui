import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioGroupPrimitiveRoot from '../fragments/RadioGroupPrimitiveRoot';
import RadioGroupPrimitiveItem from '../fragments/RadioGroupPrimitiveItem';

describe('RadioGroupPrimitive', () => {
    it('renders radio items and allows selection (uncontrolled)', () => {
        render(
            <RadioGroupPrimitiveRoot defaultValue="b" name="test-group">
                <RadioGroupPrimitiveItem value="a">Option A</RadioGroupPrimitiveItem>
                <RadioGroupPrimitiveItem value="b">Option B</RadioGroupPrimitiveItem>
                <RadioGroupPrimitiveItem value="c">Option C</RadioGroupPrimitiveItem>
            </RadioGroupPrimitiveRoot>
        );
        const radioA = screen.getByLabelText('Option A') as HTMLInputElement;
        const radioB = screen.getByLabelText('Option B') as HTMLInputElement;
        const radioC = screen.getByLabelText('Option C') as HTMLInputElement;
        expect(radioA.checked).toBe(false);
        expect(radioB.checked).toBe(true);
        expect(radioC.checked).toBe(false);
        fireEvent.click(radioA);
        expect(radioA.checked).toBe(true);
        expect(radioB.checked).toBe(false);
        expect(radioC.checked).toBe(false);
    });

    it('calls onValueChange in controlled mode', () => {
        const handleChange = jest.fn();
        render(
            <RadioGroupPrimitiveRoot value="a" onValueChange={handleChange} name="test-group">
                <RadioGroupPrimitiveItem value="a">Option A</RadioGroupPrimitiveItem>
                <RadioGroupPrimitiveItem value="b">Option B</RadioGroupPrimitiveItem>
            </RadioGroupPrimitiveRoot>
        );
        const radioB = screen.getByLabelText('Option B') as HTMLInputElement;
        fireEvent.click(radioB);
        expect(handleChange).toHaveBeenCalledWith('b');
    });

    it('disables all radios when group is disabled', () => {
        render(
            <RadioGroupPrimitiveRoot defaultValue="a" disabled name="test-group">
                <RadioGroupPrimitiveItem value="a">Option A</RadioGroupPrimitiveItem>
                <RadioGroupPrimitiveItem value="b">Option B</RadioGroupPrimitiveItem>
            </RadioGroupPrimitiveRoot>
        );
        const radioA = screen.getByLabelText('Option A') as HTMLInputElement;
        const radioB = screen.getByLabelText('Option B') as HTMLInputElement;
        expect(radioA).toBeDisabled();
        expect(radioB).toBeDisabled();
    });

    it('disables individual radio when disabled', () => {
        render(
            <RadioGroupPrimitiveRoot defaultValue="a" name="test-group">
                <RadioGroupPrimitiveItem value="a" disabled>Option A</RadioGroupPrimitiveItem>
                <RadioGroupPrimitiveItem value="b">Option B</RadioGroupPrimitiveItem>
            </RadioGroupPrimitiveRoot>
        );
        const radioA = screen.getByLabelText('Option A') as HTMLInputElement;
        const radioB = screen.getByLabelText('Option B') as HTMLInputElement;
        expect(radioA).toBeDisabled();
        expect(radioB).not.toBeDisabled();
    });

    it('sets required and name attributes', () => {
        render(
            <RadioGroupPrimitiveRoot defaultValue="a" required name="my-radio-group">
                <RadioGroupPrimitiveItem value="a">Option A</RadioGroupPrimitiveItem>
            </RadioGroupPrimitiveRoot>
        );
        const radioA = screen.getByLabelText('Option A') as HTMLInputElement;
        expect(radioA).toHaveAttribute('name', 'my-radio-group');
        // required is set on the group, not the input, but we can check the group
        const group = screen.getByRole('radiogroup');
        expect(group).toHaveAttribute('aria-required', 'true');
    });

    it('throws error if RadioGroupPrimitiveItem is used outside RadioGroupPrimitiveRoot', () => {
    // Suppress error output for this test
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => {
            render(<RadioGroupPrimitiveItem value="a">Option A</RadioGroupPrimitiveItem>);
        }).toThrow('RadioGroup.Item must be used within a RadioGroup.Root');
        spy.mockRestore();
    });
});
