import React from 'react';
import { render, screen } from '@testing-library/react';
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
        render(<Text style={{ color: 'red' }}>I am Text!</Text>);
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

    test('renders Text component with span as prop', () => {
        render(<Text as="span">I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'SPAN');
    });

    test('renders Text component with div as prop', () => {
        render(<Text as="div">I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'DIV');
    });

    test('renders Text component with label as prop', () => {
        render(<Text as="label">I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'LABEL');
    });

    test('renders Text component with p as prop', () => {
        render(<Text as="p">I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'P');
    });

    test('renders Text component with span as prop and custom data attribute', () => {
        render(<Text as="span" data-testid="text-data">I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'SPAN');
        expect(screen.getByText('I am Text!')).toHaveAttribute('data-testid', 'text-data');
    });

    test('renders Text component with custom style and div as prop', () => {
        render(<Text style={{ color: 'red' }} as='div'>I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveStyle('color: red');
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'DIV')
    });

    test('renders Text component with no as prop', () => {
        render(<Text>I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'P');
    });

    test('renders Text component with undefined as prop', () => {
        render(<Text as={undefined} >I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'P');
    });

    test('renders Text component with random text as prop', () => {
        render(<Text as="text" >I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'P');
    });

    test('renders Text component with number as prop', () => {
        render(<Text as= {0} >I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'P');
    });

    test('renders Text component with array as prop', () => {
        render(<Text as = {["testing", "text" ]} >I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'P');
    });

    test('renders Text component with false boolean as prop', () => {
        render(<Text as={false} >I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'P');
    });

    test('renders Text component with true boolean as prop', () => {
        render(<Text as={true} >I am Text!</Text>);
        expect(screen.getByText('I am Text!')).toHaveProperty('tagName', 'P');
    });

});
