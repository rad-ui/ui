import React from 'react';
import { render, screen } from '@testing-library/react';
import Separator from '../Separator';

describe('Separator Component', () => {
    test('renders Separator component with className', () => {
        render(<Separator data-testid="separator" className="border-t border-gray-200" />);
        expect(screen.getByTestId('separator')).toHaveClass('border-t border-gray-200');
    });

    test('renders Separator component with custom style', () => {
        render(<Separator data-testid="separator" style={{ color: 'red' }} />);
        expect(screen.getByTestId('separator')).toHaveStyle('color: red');
    });

    test('renders Separator component with custom id', () => {
        render(<Separator data-testid="separator" id="separator-id" />);
        expect(screen.getByTestId('separator')).toHaveAttribute('id', 'separator-id');
    });

    test('renders Separator component with custom data attribute', () => {
        render(<Separator data-testid="separator" data-custom="separator-data" />);
        expect(screen.getByTestId('separator')).toHaveAttribute('data-custom', 'separator-data');
    });

    test('renders Separator component with color', () => {
        render(<Separator color='blue' data-testid="separator"/>);
        expect(screen.getByTestId('separator')).toHaveAttribute('data-accent-color', 'blue');
    });
});
