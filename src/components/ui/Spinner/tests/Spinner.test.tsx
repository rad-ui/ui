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

    // A spinner with no accessible name is announced as nothing, so consumers
    // must be able to label it. Assert the mechanism rather than a default.
    test('axe: no violations when labelled', async() => {
        const { container } = render(<Spinner aria-label="Loading results" />);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});