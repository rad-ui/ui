import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

const Rows = ({ onAction }: { onAction: (row: string, action: string) => void }) => {
    const handle = React.useMemo(() => DropdownMenu.createHandle<string>(), []);
    return (
        <>
            {['Row 1', 'Row 2'].map((row) => (
                <DropdownMenu.Trigger key={row} handle={handle} payload={row}>Actions for {row}</DropdownMenu.Trigger>
            ))}
            <DropdownMenu.Root handle={handle}>
                {({ payload }) => (
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item onClick={() => onAction(String(payload), 'Rename')}>Rename</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                )}
            </DropdownMenu.Root>
        </>
    );
};

describe('DropdownMenu detached triggers', () => {
    test('a detached trigger opens the shared menu with its payload', async() => {
        const user = userEvent.setup();
        const onAction = jest.fn();
        render(<Rows onAction={onAction} />);
        const second = screen.getByRole('button', { name: 'Actions for Row 2' });
        expect(second).toHaveAttribute('aria-haspopup', 'menu');
        await user.click(second);
        expect(second).toHaveAttribute('aria-expanded', 'true');
        await user.click(screen.getByRole('menuitem', { name: 'Rename' }));
        expect(onAction).toHaveBeenCalledWith('Row 2', 'Rename');
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        expect(second).toHaveAttribute('aria-expanded', 'false');
    });

    test('ArrowDown on a detached trigger opens the menu', async() => {
        const user = userEvent.setup();
        render(<Rows onAction={() => {}} />);
        screen.getByRole('button', { name: 'Actions for Row 1' }).focus();
        await user.keyboard('{ArrowDown}');
        expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    test('Escape closes it', async() => {
        const user = userEvent.setup();
        render(<Rows onAction={() => {}} />);
        await user.click(screen.getByRole('button', { name: 'Actions for Row 1' }));
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    });
});
