import React from 'react';
import { render, screen } from '@testing-library/react';
import Strong from '../Strong';

describe('Strong Component', () => {
    const Component = () => <Strong className='font-bold'>I am Strong!</Strong>;

    test('renders Strong component', () => {
        render(<Component />);
        expect(screen.getByText('I am Strong!')).toBeInTheDocument();
    });

    test('renders Strong component with className', () => {
        render(<Component />);
        expect(screen.getByText('I am Strong!')).toHaveClass('font-bold');
    });

    test('renders Strong component with custom className', () => {
        render(<Strong className="text-gray-1000">I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveClass('text-gray-1000');
    });

    test('renders Strong component with custom style', () => {
        render(<Strong style={{ color: 'red' }}>I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveStyle('color: red');
    });

    test('renders Strong component with custom id', () => {
        render(<Strong id="strong-id">I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveAttribute('id', 'strong-id');
    });

    test('renders Strong component with custom data attribute', () => {
        render(<Strong data-testid="strong-data">I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveAttribute('data-testid', 'strong-data');
    });
});
