import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TogglePrimitive from '..';

describe('TogglePrimitive', () => {
    it('renders children correctly', () => {
        render(<TogglePrimitive>Test Content</TogglePrimitive>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('forwards ref to the button element', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<TogglePrimitive ref={ref}>Ref Content</TogglePrimitive>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('renders asChild correctly', () => {
        const { container } = render(<TogglePrimitive asChild><button>Click me</button></TogglePrimitive>);
        expect(container.querySelector('button')).toBeInTheDocument();
        expect(container.querySelector('button')).toHaveTextContent('Click me');
    });

    it('renders with label correctly', () => {
        render(<TogglePrimitive label="Test Label">Test Content</TogglePrimitive>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('renders with defaultPressed true with data-state on correctly', () => {
        render(<TogglePrimitive defaultPressed={true}>Test Content</TogglePrimitive>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on');
    });

    it('renders with defaultPressed false with data-state off correctly', () => {
        render(<TogglePrimitive defaultPressed={false}>Test Content</TogglePrimitive>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off');
    });

    it('renders onPressedChange correctly', () => {
        const onPressedChange = jest.fn();
        render(<TogglePrimitive onPressedChange={onPressedChange}>Test Content</TogglePrimitive>);
        fireEvent.click(screen.getByRole('button'));
        expect(onPressedChange).toHaveBeenCalledWith(true);
    });

    it('renders with className correctly', () => {
        render(<TogglePrimitive className="test-class">Test Content</TogglePrimitive>);
        expect(screen.getByText('Test Content')).toHaveClass('test-class');
    });

    it('renders with disabled correctly', () => {
        render(<TogglePrimitive disabled>Test Content</TogglePrimitive>);
        expect(screen.getByRole('button')).toHaveAttribute('disabled');
    });

    it('renders with correct ARIA attributes', () => {
        render(<TogglePrimitive>Test Content</TogglePrimitive>);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-pressed', 'false');

        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('renders with correct ARIA attributes when disabled', () => {
        render(<TogglePrimitive disabled>Test Content</TogglePrimitive>);
        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders in controlled mode correctly', () => {
        const onPressedChange = jest.fn();
        const { rerender } = render(
            <TogglePrimitive pressed={false} onPressedChange={onPressedChange}>
                Test Content
            </TogglePrimitive>
        );
        expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off');

        // Click should trigger onPressedChange but not change state directly
        fireEvent.click(screen.getByRole('button'));
        expect(onPressedChange).toHaveBeenCalledWith(true);
        expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off');

        // State should only change when pressed prop changes
        rerender(
            <TogglePrimitive pressed={true} onPressedChange={onPressedChange}>
                Test Content
            </TogglePrimitive>
        );
        expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on');
    });

    it('handles multiple clicks correctly in uncontrolled mode', () => {
        render(<TogglePrimitive>Test Content</TogglePrimitive>);
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(button).toHaveAttribute('data-state', 'on');

        fireEvent.click(button);
        expect(button).toHaveAttribute('data-state', 'off');
    });

    it('prevents state change when disabled', () => {
        const onPressedChange = jest.fn();
        render(
            <TogglePrimitive disabled onPressedChange={onPressedChange}>
                Test Content
            </TogglePrimitive>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(onPressedChange).not.toHaveBeenCalled();
        expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off');
    });

    it('maintains controlled state after multiple clicks', () => {
        const onPressedChange = jest.fn();
        render(
            <TogglePrimitive pressed={false} onPressedChange={onPressedChange}>
                Test Content
            </TogglePrimitive>
        );
        const button = screen.getByRole('button');

        fireEvent.click(button);
        fireEvent.click(button);

        expect(onPressedChange).toHaveBeenCalledTimes(2);
        expect(button).toHaveAttribute('data-state', 'off');
    });

    it('handles keyboard interactions correctly', () => {
        const onPressedChange = jest.fn();
        render(<TogglePrimitive onPressedChange={onPressedChange}>Test Content</TogglePrimitive>);
        const button = screen.getByRole('button');

        // Initial state check
        expect(button).toHaveAttribute('data-state', 'off');

        // Test Space key
        fireEvent.keyDown(button, { key: ' ' });
        fireEvent.keyUp(button, { key: ' ' });
        expect(button).toHaveAttribute('data-state', 'on');
        expect(onPressedChange).toHaveBeenCalledWith(true);

        // Test Enter key
        fireEvent.keyDown(button, { key: 'Enter' });
        fireEvent.keyUp(button, { key: 'Enter' });
        expect(button).toHaveAttribute('data-state', 'off');
        expect(onPressedChange).toHaveBeenCalledWith(false);

        // Test that other keys don't trigger the toggle
        fireEvent.keyDown(button, { key: 'A' });
        expect(button).toHaveAttribute('data-state', 'off');
        expect(onPressedChange).toHaveBeenCalledTimes(2);
    });
});
