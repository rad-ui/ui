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
        expect(screen.getByText('Badge')).toHaveClass('acme-corp-badge');
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
        expect(screen.getByText('Badge')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    });

    test('forwards refs to the underlying element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Badge ref={ref}>Badge</Badge>);
        expect(ref.current).not.toBeNull();
    });

    test('applies variant and size data attributes', () => {
        render(<Badge variant='solid' size='lg'>Badge</Badge>);
        const badgeElement = screen.getByText('Badge');
        expect(badgeElement).toHaveAttribute('data-badge-variant', 'solid');
        expect(badgeElement).toHaveAttribute('data-badge-size', 'lg');
    });
});
