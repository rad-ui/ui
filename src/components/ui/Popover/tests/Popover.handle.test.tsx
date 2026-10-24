import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';

const People = () => {
    const handle = React.useMemo(() => Popover.createHandle<string>(), []);
    return (
        <>
            {['Ada', 'Grace'].map((name) => (
                <Popover.Trigger key={name} handle={handle} payload={name}>{name}</Popover.Trigger>
            ))}
            <Popover.Root handle={handle}>
                {({ payload }) => (
                    <Popover.Portal>
                        <Popover.Content>Profile of {String(payload)}</Popover.Content>
                    </Popover.Portal>
                )}
            </Popover.Root>
        </>
    );
};

describe('Popover detached triggers', () => {
    test('opens from a detached trigger with its payload, and toggles closed', async() => {
        const user = userEvent.setup();
        render(<People />);
        const grace = screen.getByRole('button', { name: 'Grace' });
        await user.click(grace);
        expect(screen.getByText('Profile of Grace')).toBeInTheDocument();
        expect(grace).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('button', { name: 'Ada' })).toHaveAttribute('aria-expanded', 'false');

        await user.click(grace);
        await waitFor(() => expect(screen.queryByText('Profile of Grace')).not.toBeInTheDocument());
    });

    test('another trigger switches the content', async() => {
        const user = userEvent.setup();
        render(<People />);
        await user.click(screen.getByRole('button', { name: 'Ada' }));
        expect(screen.getByText('Profile of Ada')).toBeInTheDocument();
        await user.keyboard('{Escape}');
        await user.click(screen.getByRole('button', { name: 'Grace' }));
        expect(screen.getByText('Profile of Grace')).toBeInTheDocument();
    });

    test('Escape closes it', async() => {
        const user = userEvent.setup();
        render(<People />);
        await user.click(screen.getByRole('button', { name: 'Ada' }));
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Profile of Ada')).not.toBeInTheDocument());
        expect(screen.getByRole('button', { name: 'Ada' })).toHaveAttribute('aria-expanded', 'false');
    });
});
