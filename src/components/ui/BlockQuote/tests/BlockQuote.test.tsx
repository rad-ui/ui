import React from 'react';
import { render, screen } from '@testing-library/react';

import BlockQuote from '../BlockQuote';

describe('BlockQuote', () => {
    test('renders BlockQuote component', () => {
        render(<BlockQuote>BlockQuote</BlockQuote>);
        expect(screen.getByText('BlockQuote')).toBeInTheDocument();
    });

    // customRootClass check
    test('renders BlockQuote component with customRootClass', () => {
        render(<BlockQuote customRootClass='acme-corp'>BlockQuote</BlockQuote>);
        expect(screen.getByText('BlockQuote')).toHaveClass('acme-corp-block-quote');
    });

    // className check
    test('renders BlockQuote component with className', () => {
        render(<BlockQuote className='mr-2'>BlockQuote</BlockQuote>);
        expect(screen.getByText('BlockQuote')).toHaveClass('mr-2');
    });

    // custom data attributes check
    test('renders BlockQuote component with custom data attributes', () => {
        render(<BlockQuote data-testid='block-quote'>BlockQuote</BlockQuote>);
        expect(screen.getByTestId('block-quote')).toBeInTheDocument();
    });

    test('renders BlockQuote component with color', () => {
        render(<BlockQuote className='mr-2' color='blue'>BlockQuote</BlockQuote>);
        expect(screen.getByText('BlockQuote')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    });

    test('forwards refs to the underlying element', () => {
        const ref = React.createRef<HTMLQuoteElement>();
        render(<BlockQuote ref={ref}>BlockQuote</BlockQuote>);
        expect(ref.current).not.toBeNull();
    });

    test('applies variant and size data attributes', () => {
        render(<BlockQuote variant='quote' size='lg'>BlockQuote</BlockQuote>);
        const quoteElement = screen.getByText('BlockQuote');
        expect(quoteElement).toHaveAttribute('data-block-quote-variant', 'quote');
        expect(quoteElement).toHaveAttribute('data-block-quote-size', 'lg');
    });
});
