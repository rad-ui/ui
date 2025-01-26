import React from 'react';
import { render, screen } from '@testing-library/react';

import Badge from '../Badge';

describe('Badge', () => {
    test('renders Badge component', () => {
        render(<Badge>Badge</Badge>);
        expect(screen.getByText('Badge')).toBeInTheDocument();
    });

    // customRootClass check
    test('renders Badge component with customRootClass', () => {
        render(<Badge customRootClass='acme-corp'>Badge</Badge>);
        expect(screen.getByText('Badge')).toHaveClass('acme-corp');
    });

    // className check
    test('renders Badge component with className', () => {
        render(<Badge className='mr-2'>Badge</Badge>);
        expect(screen.getByText('Badge')).toHaveClass('mr-2');
    });

    // custom data attributes check
    test('renders Badge component with custom data attributes', () => {
        render(<Badge data-testid='badge'>Badge</Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    test('renders Badge component with custom color', () => {
        render(<Badge color='blue'>Badge</Badge>);
        expect(screen.getByText('Badge')).toHaveAttribute('data-accent-color', 'blue');
    });
});
