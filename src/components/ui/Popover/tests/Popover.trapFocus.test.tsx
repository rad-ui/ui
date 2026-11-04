import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';

const Page = ({ modal }: { modal?: boolean | 'trap-focus' }) => (
    <>
        <Popover.Root modal={modal}>
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Content data-testid="content">
                <button>Inside</button>
            </Popover.Content>
        </Popover.Root>
        <main data-testid="page"><button>Outside</button></main>
    </>
);

// jsdom has no `inert`, so the focus manager falls back to aria-hidden for both modal modes;
// whether the page is inert (true) or still clickable (trap-focus) is checked in a browser.
const outsideIsHidden = () => Boolean(screen.getByTestId('page').closest('[aria-hidden="true"], [inert]'));

describe('Popover modal="trap-focus"', () => {
    test.each([true, 'trap-focus'] as const)('modal=%s moves focus in and hides the page from AT', async(modal) => {
        const user = userEvent.setup();
        render(<Page modal={modal} />);
        await user.click(screen.getByText('Open'));
        await waitFor(() => expect(screen.getByTestId('content').contains(document.activeElement)).toBe(true));
        await waitFor(() => expect(outsideIsHidden()).toBe(true));
    });

    test('false (default) leaves the page alone', async() => {
        const user = userEvent.setup();
        render(<Page />);
        await user.click(screen.getByText('Open'));
        await screen.findByText('Inside');
        expect(outsideIsHidden()).toBe(false);
    });
});
