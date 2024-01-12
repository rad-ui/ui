// MyComponent.test.js
import React from 'react';
import {render, screen} from '@testing-library/react';
import Text from '../Text';

describe('Text Component', () => {
    test('renders Text component', () => {
        render(<Text className='font-bold'>I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toBeInTheDocument();
    });

    test('renders Text component with className', () => {
        render(<Text className='font-bold'>I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveClass('font-bold');
    });

    test('renders Text component with custom className', () => {
        render(<Text className="text-gray-1000">I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveClass('text-gray-1000');
    });

    test('renders Text component with custom style', () => {
        render(<Text style={{color: 'red'}}>I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveStyle('color: red');
    });

    test('renders Text component with custom id', () => {
        render(<Text id="text-id">I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveAttribute('id', 'text-id');
    });

    test('renders Text component with custom data attribute', () => {
        render(<Text data-testid="text-data">I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveAttribute('data-testid', 'text-data');
    });
});
