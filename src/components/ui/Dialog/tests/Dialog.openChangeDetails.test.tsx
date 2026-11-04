import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';
import Popover from '~/components/ui/Popover/Popover';
import type { OpenChangeDetails } from '~/core/utils/openChangeDetails';

const EditDialog = ({ onOpenChange }: { onOpenChange: (open: boolean, details: OpenChangeDetails) => void }) => (
    <Dialog.Root onOpenChange={onOpenChange}>
        <Dialog.Trigger>Edit</Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay data-testid="overlay" />
            <Dialog.Content>
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Close>Close</Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

describe('onOpenChange details', () => {
    test('Dialog reports why it opened and closed', async() => {
        const user = userEvent.setup();
        const reasons: string[] = [];
        render(<EditDialog onOpenChange={(open, details) => reasons.push(`${open}:${details.reason}`)} />);
        await user.click(screen.getByRole('button', { name: 'Edit' }));
        await user.keyboard('{Escape}');
        await user.click(screen.getByRole('button', { name: 'Edit' }));
        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(reasons).toEqual(['true:trigger-press', 'false:escape-key', 'true:trigger-press', 'false:close-press']);
    });

    test('cancel() keeps a Dialog open, for an unsaved-changes guard', async() => {
        const user = userEvent.setup();
        render(<EditDialog onOpenChange={(open, details) => { if (!open && details.reason === 'escape-key') details.cancel(); }} />);
        await user.click(screen.getByRole('button', { name: 'Edit' }));
        await user.keyboard('{Escape}');
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('one-argument handlers still get only the open state', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn((open: boolean) => open);
        render(<EditDialog onOpenChange={onOpenChange} />);
        await user.click(screen.getByRole('button', { name: 'Edit' }));
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(onOpenChange.mock.calls[0]).toHaveLength(1);
    });

    test('Popover reports outside presses and can cancel them', async() => {
        const user = userEvent.setup();
        const reasons: string[] = [];
        render(
            <>
                <button type="button">Elsewhere</button>
                <Popover.Root onOpenChange={(open, details) => { reasons.push(`${open}:${details.reason}`); if (!open && (details.reason === 'outside-press' || details.reason === 'focus-out')) details.cancel(); }}>
                    <Popover.Trigger>Filters</Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content>Filter options</Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </>
        );
        await user.click(screen.getByRole('button', { name: 'Filters' }));
        await user.click(screen.getByRole('button', { name: 'Elsewhere' }));
        expect(reasons.slice(0, 2)).toEqual(['true:trigger-press', 'false:outside-press']);
        expect(screen.getByText('Filter options')).toBeInTheDocument();
    });
});
