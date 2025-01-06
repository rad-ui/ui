import React from 'react';
import { render } from '@testing-library/react';
import Link from '../Link';

describe('Link component', () => {
    test('Link renders children correctly', () => {
        const { getByText } = render(<Link>Test Link</Link>);
        expect(getByText('Test Link')).toBeInTheDocument();
    });

    test('Link applies className correctly', () => {
        const { container } = render(<Link className="test-class">Test Link</Link>);
        expect(container.firstChild).toHaveClass('test-class');
    });

    test('Link sets href attribute correctly', () => {
        const { container } = render(<Link href="https://example.com">Test Link</Link>);
        expect(container.querySelector('a')).toHaveAttribute('href', 'https://example.com');
    });

    test('Link spreads additional props correctly', () => {
        const { container } = render(<Link data-testid="link">Test Link</Link>);
        expect(container.querySelector('a')).toHaveAttribute('data-testid', 'link');
    });
});
