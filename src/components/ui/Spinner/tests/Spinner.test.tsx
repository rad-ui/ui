import React from 'react';
import { render, screen } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Spinner from '../Spinner';

describe('Spinner', () => {
    test('renders a span', () => {
        render(<Spinner data-testid="spinner" />);
        expect(screen.getByTestId('spinner').tagName).toBe('SPAN');
    });

    test('forwards the ref to the span', () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(<Spinner ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    test('exposes size as a data attribute', () => {
        render(<Spinner size="large" data-testid="spinner" />);
        expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', 'large');
    });

    test('merges a caller className', () => {
        render(<Spinner className="custom" data-testid="spinner" />);
        expect(screen.getByTestId('spinner')).toHaveClass('custom');
    });

    test('wraps the span in a container', () => {
        render(<Spinner data-testid="spinner" />);
        expect(screen.getByTestId('spinner').parentElement).toBeInTheDocument();
    });

    test('container is a span so Spinner is valid inside phrasing content', () => {
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<p>Loading <Spinner data-testid="spinner" /></p>);
        expect(screen.getByTestId('spinner').parentElement?.tagName).toBe('SPAN');
        expect(error).not.toHaveBeenCalled();
        error.mockRestore();
    });

    test('forwards arbitrary span props', () => {
        render(<Spinner aria-label="Loading" data-testid="spinner" />);
        expect(screen.getByTestId('spinner')).toHaveAttribute('aria-label', 'Loading');
    });
});

describe('Spinner accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(<Spinner />);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('is a status named "Loading" by default', () => {
        render(<Spinner />);
        expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
    });

    test('aria-label overrides the default name', async() => {
        const { container } = render(<Spinner aria-label="Loading results" />);
        expect(screen.getByRole('status', { name: 'Loading results' })).toBeInTheDocument();
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('aria-labelledby replaces the default aria-label', () => {
        render(<><span id="l">Fetching rows</span><Spinner aria-labelledby="l" data-testid="spinner" /></>);
        expect(screen.getByRole('status', { name: 'Fetching rows' })).toBeInTheDocument();
        expect(screen.getByTestId('spinner')).not.toHaveAttribute('aria-label');
    });

    test('aria-hidden makes it decorative: no role and no name', () => {
        render(<button type="button">Saving <Spinner aria-hidden data-testid="spinner" /></button>);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toHaveAttribute('aria-hidden', 'true');
        expect(spinner).not.toHaveAttribute('role');
        expect(spinner).not.toHaveAttribute('aria-label');
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Saving' })).toBeInTheDocument();
    });
});
