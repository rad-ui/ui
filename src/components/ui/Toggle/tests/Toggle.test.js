import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toggle from '../Toggle';

describe('Toggle component', () => {
    test('renders children correctly', () => {
        const { getByText } = render(<Toggle pressed={false} onChange={() => {}}>Test Toggle</Toggle>);
        expect(getByText('Test Toggle')).toBeInTheDocument();
    });

    test('applies customRootClass correctly', () => {
        const { container } = render(<Toggle pressed={false} customRootClass="custom-class" onChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    test('applies className correctly', () => {
        const { container } = render(<Toggle pressed={false} className="test-class" onChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveClass('test-class');
    });

    test('handles pressed state correctly', () => {
        const { container, rerender } = render(<Toggle pressed={false} onChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');

        rerender(<Toggle pressed={false} onChange={() => {}}>Test Toggle</Toggle>);
        fireEvent.click(container.firstChild);
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');

        rerender(<Toggle pressed={true} onChange={() => {}}>Test Toggle</Toggle>);
        fireEvent.click(container.firstChild);
        expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');
    });

    test('handles disabled state correctly', () => {
        const { container } = render(<Toggle pressed={false} disabled={true} onChange={() => {}}>Test Toggle</Toggle>);
        expect(container.firstChild).toBeDisabled();
    });

    test('calls onChange callback correctly', () => {
        const handleChange = jest.fn();
        const { getByText } = render(<Toggle pressed={false} onChange={handleChange}>Test Toggle</Toggle>);

        fireEvent.click(getByText('Test Toggle'));
        expect(handleChange).toHaveBeenCalledWith(true);

        fireEvent.click(getByText('Test Toggle'));
        expect(handleChange).toHaveBeenCalledWith(false);
    });

    test('Toggle renders color correctly', () => {
        const { getByText } = render(<Toggle pressed={false} onChange={() => {}} color='blue'>Test Toggle</Toggle>);
        expect(getByText('Test Toggle')).toHaveAttribute('data-accent-color', 'blue');
    });
});