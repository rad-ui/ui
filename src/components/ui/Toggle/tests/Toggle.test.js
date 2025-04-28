import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toggle from '../Toggle';

describe('Toggle component', () => {
    test('renders children correctly', () => {
        const { getByText } = render(<Toggle onChange={() => {}}>Test Toggle</Toggle>);
        expect(getByText('Test Toggle')).toBeInTheDocument();
    });

    test('applies customRootClass correctly', () => {
        const { container } = render(<Toggle customRootClass="custom-class" onChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    test('applies className correctly', () => {
        const { container } = render(<Toggle className="test-class" onChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveClass('test-class');
    });

    // Test controlled mode
    test('handles controlled mode correctly', () => {
        const handleChange = jest.fn();
        const { container, rerender } = render(
            <Toggle pressed={false} onChange={handleChange}>Test Toggle</Toggle>
        );
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');

        // Click toggle
        fireEvent.click(container.firstChild);

        // onChange should be called with true
        expect(handleChange).toHaveBeenCalledWith(true);

        // State should not change until prop changes (still false)
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');

        // Update props to reflect new state
        rerender(<Toggle pressed={true} onChange={handleChange}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');
    });

    // Test uncontrolled mode
    test('handles uncontrolled mode correctly', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <Toggle defaultPressed={false} onChange={handleChange}>Test Toggle</Toggle>
        );
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');

        // Click toggle
        fireEvent.click(container.firstChild);

        // onChange should be called with true
        expect(handleChange).toHaveBeenCalledWith(true);

        // State should update internally (now true)
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');

        // Click again
        fireEvent.click(container.firstChild);

        // onChange should be called with false
        expect(handleChange).toHaveBeenCalledWith(false);

        // State should update internally (back to false)
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');
    });

    test('handles disabled state correctly', () => {
        const { container } = render(<Toggle disabled={true} onChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toBeDisabled();
    });

    test('honors defaultPressed in uncontrolled mode', () => {
        const { container } = render(
            <Toggle defaultPressed={true} onChange={() => {}}>Test Toggle</Toggle>
        );
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');
    });

    test('Toggle renders color correctly', () => {
        const { getByText } = render(<Toggle onChange={() => {}} color='blue'>Test Toggle</Toggle>);
        expect(getByText('Test Toggle')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    });
});
