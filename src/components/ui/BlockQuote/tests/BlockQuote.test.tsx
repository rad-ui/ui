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
        expect(screen.getByText('BlockQuote')).toHaveClass('acme-corp');
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
});
