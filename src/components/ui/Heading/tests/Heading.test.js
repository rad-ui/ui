import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '../Heading';


describe('Heading', () => {
    test('renders children correctly', () => {
        render(<Heading>Test Content</Heading>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('Heading applies className correctly', () => {
        render(<Heading className="test-class">Test Content</Heading>);
        const element = screen.getByText('Test Content');
        expect(element).toHaveClass('test-class');
    });

    test('Heading renders the correct tag based on the as prop', () => {
        render(<Heading as="h2">Test Content</Heading>);
        const element = screen.getByText('Test Content');
        expect(element.tagName.toLowerCase()).toBe('h2');
    });


    test('Heading renders default h1 tag when as prop is not provided', () => {
        render(<Heading>Test Content</Heading>);
        const element = screen.getByText('Test Content');
        expect(element.tagName.toLowerCase()).toBe('h1');
    });

    test('Heading renders default h1 tag when as prop is not valid', () => {
        render(<Heading as="h10">Test Content</Heading>);
        const element = screen.getByText('Test Content');
        expect(element.tagName.toLowerCase()).toBe('h1');
    });

    test('Heading spreads additional props correctly', () => {
        render(<Heading data-testid="heading-element">Test Content</Heading>);
        const element = screen.getByTestId('heading-element');
        expect(element).toBeInTheDocument();
    });
});
