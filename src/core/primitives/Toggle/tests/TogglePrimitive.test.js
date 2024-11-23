import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TogglePrimitive from '../index';

describe('TogglePrimitive', () => {
    it('renders children correctly', () => {
        render(<TogglePrimitive>Test Content</TogglePrimitive>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
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
        expect(screen.getByText('Test Content')).toHaveAttribute('disabled');
    });
});
