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

    test('forwards ref to underlying anchor element', () => {
        const ref = React.createRef();
        render(<Link ref={ref}>Test Link</Link>);
        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    test('renders without console warnings', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<Link>Test Link</Link>);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });
});
