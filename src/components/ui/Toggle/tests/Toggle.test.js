import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toggle from '../Toggle';

describe('Toggle component', () => {
    test('renders children correctly', () => {
        const { getByText } = render(<Toggle onPressedChange={() => {}}>Test Toggle</Toggle>);
        expect(getByText('Test Toggle')).toBeInTheDocument();
    });

    test('forwards ref to the button element', () => {
        const ref = React.createRef();
        render(<Toggle ref={ref} onPressedChange={() => {}}>Ref Toggle</Toggle>);
        expect(ref.current instanceof HTMLButtonElement).toBe(true);
    });

    test('applies customRootClass correctly', () => {
        const { container } = render(<Toggle customRootClass="custom-class" onPressedChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveClass('custom-class-toggle');
    });

    test('applies className correctly', () => {
        const { container } = render(<Toggle className="test-class" onPressedChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveClass('test-class');
    });

    // Test controlled mode
    test('handles controlled mode correctly', () => {
        const handleChange = jest.fn();
        const { container, rerender } = render(
            <Toggle pressed={false} onPressedChange={handleChange}>Test Toggle</Toggle>
        );
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');

        // Click toggle
        fireEvent.click(container.firstChild);

        // onPressedChange should be called with true
        expect(handleChange).toHaveBeenCalledWith(true);

        // State should not change until prop changes (still false)
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');

        // Update props to reflect new state
        rerender(<Toggle pressed={true} onPressedChange={handleChange}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');
    });

    // Test uncontrolled mode
    test('handles uncontrolled mode correctly', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <Toggle defaultPressed={false} onPressedChange={handleChange}>Test Toggle</Toggle>
        );
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');

        // Click toggle
        fireEvent.click(container.firstChild);

        // onPressedChange should be called with true
        expect(handleChange).toHaveBeenCalledWith(true);

        // State should update internally (now true)
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');

        // Click again
        fireEvent.click(container.firstChild);

        // onPressedChange should be called with false
        expect(handleChange).toHaveBeenCalledWith(false);

        // State should update internally (back to false)
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');
    });

    test('handles disabled state correctly', () => {
        const { container } = render(<Toggle disabled={true} onPressedChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toBeDisabled();
    });

    test('honors defaultPressed in uncontrolled mode', () => {
        const { container } = render(
            <Toggle defaultPressed={true} onPressedChange={() => {}}>Test Toggle</Toggle>
        );
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');
    });

    test('Toggle renders color correctly', () => {
        const { getByText } = render(<Toggle onPressedChange={() => {}} color='blue'>Test Toggle</Toggle>);
        expect(getByText('Test Toggle')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    });

    test('renders with asChild prop correctly', () => {
        const { container } = render(
            <Toggle asChild onPressedChange={() => {}}>
                <div data-testid="custom-element">Custom Element</div>
            </Toggle>
        );

        const customElement = container.querySelector('[data-testid="custom-element"]');
        expect(customElement).toBeInTheDocument();
        expect(customElement).toHaveAttribute('data-state', 'off');
        expect(customElement).toHaveAttribute('aria-pressed', 'false');
    });

    test('asChild preserves custom element props', () => {
        const { container } = render(
            <Toggle asChild onPressedChange={() => {}}>
                <div data-testid="custom-element" className="custom-class" data-custom="value">
                    Custom Element
                </div>
            </Toggle>
        );

        const customElement = container.querySelector('[data-testid="custom-element"]');
        expect(customElement).toHaveClass('custom-class');
        expect(customElement).toHaveAttribute('data-custom', 'value');
    });

    test('data-disabled attribute is set when disabled', () => {
        const { container } = render(<Toggle disabled={true} onPressedChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveAttribute('data-disabled', '');
    });

    test('data-disabled attribute is not set when not disabled', () => {
        const { container } = render(<Toggle disabled={false} onPressedChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).not.toHaveAttribute('data-disabled');
    });
});
