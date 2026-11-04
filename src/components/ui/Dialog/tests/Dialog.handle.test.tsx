import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';

type Row = { id: number; name: string };
const ROWS: Row[] = [{ id: 1, name: 'Invoice 1' }, { id: 2, name: 'Invoice 2' }];

const Table = () => {
    const handle = React.useMemo(() => Dialog.createHandle<Row>(), []);
    return (
        <>
            <ul>
                {ROWS.map((row) => (
                    <li key={row.id}>
                        {row.name}
                        <Dialog.Trigger handle={handle} payload={row}>Delete {row.name}</Dialog.Trigger>
                    </li>
                ))}
            </ul>
            <Dialog.Root handle={handle}>
                {({ payload }) => (
                    <Dialog.Portal>
                        <Dialog.Content>
                            <Dialog.Title>Delete {(payload as Row | undefined)?.name}?</Dialog.Title>
                            <Dialog.Close>Cancel</Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </Dialog.Root>
        </>
    );
};

describe('Dialog detached triggers', () => {
    test('triggers outside the Root open it with their payload', async() => {
        const user = userEvent.setup();
        render(<Table />);
        const second = screen.getByRole('button', { name: 'Delete Invoice 2' });
        expect(second).toHaveAttribute('aria-haspopup', 'dialog');
        expect(second).toHaveAttribute('aria-expanded', 'false');

        await user.click(second);
        expect(screen.getByRole('dialog')).toHaveTextContent('Delete Invoice 2?');
        expect(second).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('button', { name: 'Delete Invoice 1', hidden: true })).toHaveAttribute('aria-expanded', 'false');
    });

    test('closing returns focus to the trigger that opened it', async() => {
        const user = userEvent.setup();
        render(<Table />);
        const first = screen.getByRole('button', { name: 'Delete Invoice 1' });
        await user.click(first);
        await user.click(screen.getByRole('button', { name: 'Cancel' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        await waitFor(() => expect(first).toHaveFocus());
        expect(first).toHaveAttribute('aria-expanded', 'false');
    });

    test('Escape closes it and a different trigger reopens with new data', async() => {
        const user = userEvent.setup();
        render(<Table />);
        await user.click(screen.getByRole('button', { name: 'Delete Invoice 1' }));
        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Delete Invoice 2' }));
        expect(screen.getByRole('dialog')).toHaveTextContent('Delete Invoice 2?');
    });

    test('handle.open opens it programmatically', async() => {
        const handle = Dialog.createHandle<string>();
        render(
            <Dialog.Root handle={handle}>
                {({ payload }) => (
                    <Dialog.Portal>
                        <Dialog.Content><Dialog.Title>{String(payload)}</Dialog.Title></Dialog.Content>
                    </Dialog.Portal>
                )}
            </Dialog.Root>
        );
        React.act(() => handle.open('From code'));
        expect(await screen.findByRole('dialog')).toHaveTextContent('From code');
    });
});
