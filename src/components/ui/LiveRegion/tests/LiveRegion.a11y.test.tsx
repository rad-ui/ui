import React from 'react';
import { render, screen } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import LiveRegion from '../LiveRegion';

describe('LiveRegion accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(<LiveRegion>Saved</LiveRegion>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('defaults to a polite status region', () => {
        render(<LiveRegion>Saved</LiveRegion>);
        const region = screen.getByRole('status');
        expect(region).toHaveAttribute('aria-live', 'polite');
    });

    // The role has to follow politeness, otherwise an assertive update would sit
    // in a polite queue and never interrupt.
    test('assertive politeness promotes the role to alert', () => {
        render(<LiveRegion politeness="assertive">Failed</LiveRegion>);
        expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
    });

    test('atomic defaults to true', () => {
        render(<LiveRegion>Saved</LiveRegion>);
        expect(screen.getByRole('status')).toHaveAttribute('aria-atomic', 'true');
    });

    test('relevant defaults to additions text', () => {
        render(<LiveRegion>Saved</LiveRegion>);
        expect(screen.getByRole('status')).toHaveAttribute('aria-relevant', 'additions text');
    });

    test('forwards busy', () => {
        render(<LiveRegion busy>Saved</LiveRegion>);
        expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });

    // visuallyHidden keeps the region in the accessibility tree while removing it
    // visually. If it dropped out of the tree the announcement would be lost.
    test('stays in the accessibility tree when visually hidden', () => {
        render(<LiveRegion>Saved</LiveRegion>);
        const region = screen.getByRole('status');
        expect(region).toBeInTheDocument();
        expect(region).toHaveStyle({ position: 'absolute' });
    });

    test('renders visible when visuallyHidden is false', () => {
        render(<LiveRegion visuallyHidden={false}>Saved</LiveRegion>);
        expect(screen.getByRole('status')).not.toHaveStyle({ position: 'absolute' });
    });

    test('renders children', () => {
        render(<LiveRegion>Saved</LiveRegion>);
        expect(screen.getByText('Saved')).toBeInTheDocument();
    });
});