import React from 'react';
import { render, screen } from '@testing-library/react';
import LiveRegion from '../LiveRegion';
import Theme from '~/components/ui/Theme/Theme';

describe('LiveRegion', () => {
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        window.matchMedia = jest.fn().mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        } as unknown as MediaQueryList);
    });

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    test('renders a polite status region by default', () => {
        render(<LiveRegion>Saved</LiveRegion>);
        const region = screen.getByRole('status');

        expect(region).toHaveTextContent('Saved');
        expect(region).toHaveAttribute('aria-live', 'polite');
        expect(region).toHaveAttribute('aria-atomic', 'true');
        expect(region).toHaveAttribute('aria-relevant', 'additions text');
        expect(region).toHaveAttribute('data-slot', 'live-region-root');
    });

    test('uses alert semantics for assertive announcements by default', () => {
        render(<LiveRegion politeness="assertive">Upload failed</LiveRegion>);
        const region = screen.getByRole('alert');

        expect(region).toHaveAttribute('aria-live', 'assertive');
        expect(region).toHaveTextContent('Upload failed');
    });

    test('allows explicit role and announcement metadata', () => {
        render(
            <LiveRegion
                role="log"
                politeness="polite"
                atomic={false}
                relevant="all"
                busy
            >
                Syncing
            </LiveRegion>
        );
        const region = screen.getByRole('log');

        expect(region).toHaveAttribute('aria-live', 'polite');
        expect(region).toHaveAttribute('aria-atomic', 'false');
        expect(region).toHaveAttribute('aria-relevant', 'all');
        expect(region).toHaveAttribute('aria-busy', 'true');
    });

    test('is visually hidden by default', () => {
        render(<LiveRegion>Hidden announcement</LiveRegion>);
        const region = screen.getByText('Hidden announcement');

        expect(region).toHaveStyle({
            position: 'absolute',
            width: '1px',
            height: '1px',
            clip: 'rect(0 0 0 0)'
        });
    });

    test('can render visibly', () => {
        render(<LiveRegion visuallyHidden={false}>Visible announcement</LiveRegion>);
        const region = screen.getByRole('status');

        expect(region).not.toHaveStyle({ position: 'absolute' });
        expect(region).toHaveTextContent('Visible announcement');
    });

    test('forwards refs and DOM props', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <LiveRegion ref={ref} data-testid="announcer" id="announcement-region">
                Ready
            </LiveRegion>
        );

        expect(ref.current).toBe(screen.getByTestId('announcer'));
        expect(ref.current).toHaveAttribute('id', 'announcement-region');
    });

    test('only emits generated classes when a namespace is provided', () => {
        const { rerender } = render(<LiveRegion>Default</LiveRegion>);
        expect(screen.getByRole('status')).not.toHaveClass('rad-ui-live-region');

        rerender(
            <Theme classNamespace="acme">
                <LiveRegion>Namespaced</LiveRegion>
            </Theme>
        );

        expect(screen.getByRole('status')).toHaveClass('acme-live-region');
    });
});
