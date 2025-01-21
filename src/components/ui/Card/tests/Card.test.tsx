import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
    test('renders Card component with content', () => {
        render(<Card data-testid="card" >I am Text</Card>);
        expect(screen.getByTestId('card')).toHaveTextContent('I am Text');
    });

    test('renders Card component with className', () => {
        render(<Card data-testid="card" className="bg-gray-200" />);
        expect(screen.getByTestId('card')).toHaveClass('bg-gray-200');
    });

    test('renders Card component with custom style', () => {
        render(<Card data-testid="card" style={{ color: 'red' }} />);
        expect(screen.getByTestId('card')).toHaveStyle('color: red');
    });

    test('renders Card component with custom id', () => {
        render(<Card data-testid="card" id="card-id" />);
        expect(screen.getByTestId('card')).toHaveAttribute('id', 'card-id');
    });

    test('renders Card component with custom data attribute', () => {
        render(<Card data-testid="card" data-custom="card-data" />);
        expect(screen.getByTestId('card')).toHaveAttribute('data-custom', 'card-data');
    });

    test('renders Card component with color', () => {
        render(<Card data-testid="card" color='blue' />);
        expect(screen.getByTestId('card')).toHaveAttribute('data-accent-color', 'blue');
    });
});
