import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LiveRegion from '../LiveRegion';
import { useAnnounce } from '../useAnnounce';

describe('LiveRegion', () => {
    test('defaults to polite, atomic live region with visually hidden styles', () => {
        render(<LiveRegion>Status updated</LiveRegion>);
        const region = screen.getByText('Status updated');

        expect(region).toHaveAttribute('aria-live', 'polite');
        expect(region).toHaveAttribute('aria-atomic', 'true');
        expect(region).toHaveStyle({
            position: 'absolute',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
        });
    });

    test('supports assertive politeness and aria-atomic=false', () => {
        render(
            <LiveRegion politeness="assertive" atomic={false}>
                Alert
            </LiveRegion>
        );
        const region = screen.getByText('Alert');

        expect(region).toHaveAttribute('aria-live', 'assertive');
        expect(region).toHaveAttribute('aria-atomic', 'false');
    });

    test('forwards additional props and ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <LiveRegion ref={ref} data-testid="live-region">
                Message
            </LiveRegion>
        );

        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(screen.getByTestId('live-region')).toBeInTheDocument();
    });
});

function AnnounceHarness({ politeness }: { politeness?: 'polite' | 'assertive' }) {
    const { announce, Announcer } = useAnnounce({ politeness });

    return (
        <>
            <button type="button" onClick={() => announce('Saved changes')}>
                Save
            </button>
            <Announcer />
        </>
    );
}

describe('useAnnounce', () => {
    test('announces messages through the companion live region', async() => {
        const user = userEvent.setup();
        render(<AnnounceHarness />);

        await user.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(screen.getByText('Saved changes')).toBeInTheDocument();
        });
        expect(screen.getByText('Saved changes')).toHaveAttribute('aria-live', 'polite');
    });

    test('re-announces the same message', async() => {
        const user = userEvent.setup();
        render(<AnnounceHarness />);
        const button = screen.getByRole('button', { name: /save/i });

        await user.click(button);
        await waitFor(() => {
            expect(screen.getByText('Saved changes')).toBeInTheDocument();
        });

        await user.click(button);
        await waitFor(() => {
            expect(screen.getByText('Saved changes')).toBeInTheDocument();
        });
    });

    test('respects assertive politeness option', async() => {
        const user = userEvent.setup();
        render(<AnnounceHarness politeness="assertive" />);

        await user.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(screen.getByText('Saved changes')).toHaveAttribute('aria-live', 'assertive');
        });
    });
});
