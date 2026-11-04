import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

const ViewMenu = ({ onGrid, onSort }: { onGrid?: (checked: boolean) => void; onSort?: (value: string) => void }) => (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>View</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
            <DropdownMenu.Content>
                <DropdownMenu.CheckboxItem defaultChecked onCheckedChange={onGrid}>
                    Show grid
                    <DropdownMenu.ItemIndicator>✓</DropdownMenu.ItemIndicator>
                </DropdownMenu.CheckboxItem>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                    <DropdownMenu.GroupLabel>Sort by</DropdownMenu.GroupLabel>
                    <DropdownMenu.RadioGroup defaultValue="name" onValueChange={onSort}>
                        <DropdownMenu.RadioItem value="name">Name<DropdownMenu.ItemIndicator>•</DropdownMenu.ItemIndicator></DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem value="date">Date<DropdownMenu.ItemIndicator>•</DropdownMenu.ItemIndicator></DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>
                </DropdownMenu.Group>
                <DropdownMenu.Item>Refresh</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
);

describe('DropdownMenu checkbox and radio items', () => {
    test('a checkbox item toggles, reports it, and keeps the menu open', async() => {
        const user = userEvent.setup();
        const onGrid = jest.fn();
        render(<ViewMenu onGrid={onGrid} />);
        await user.click(screen.getByRole('button', { name: 'View' }));
        const grid = screen.getByRole('menuitemcheckbox', { name: /show grid/i });
        expect(grid).toHaveAttribute('aria-checked', 'true');
        expect(grid).toHaveTextContent('✓');

        await user.click(grid);
        expect(onGrid).toHaveBeenCalledWith(false);
        expect(grid).toHaveAttribute('aria-checked', 'false');
        expect(grid).toHaveAttribute('data-state', 'unchecked');
        expect(grid).not.toHaveTextContent('✓');
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('radio items select one value in their group', async() => {
        const user = userEvent.setup();
        const onSort = jest.fn();
        render(<ViewMenu onSort={onSort} />);
        await user.click(screen.getByRole('button', { name: 'View' }));
        const byName = screen.getByRole('menuitemradio', { name: /name/i });
        const byDate = screen.getByRole('menuitemradio', { name: /date/i });
        expect(byName).toHaveAttribute('aria-checked', 'true');
        await user.click(byDate);
        expect(onSort).toHaveBeenCalledWith('date');
        expect(byDate).toHaveAttribute('aria-checked', 'true');
        expect(byName).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('the group is named by its label', async() => {
        const user = userEvent.setup();
        render(<ViewMenu />);
        await user.click(screen.getByRole('button', { name: 'View' }));
        expect(screen.getAllByRole('group').some((group) => group.getAttribute('aria-labelledby') && document.getElementById(group.getAttribute('aria-labelledby')!)?.textContent === 'Sort by')).toBe(true);
    });

    test('Enter toggles a checkbox item from the keyboard', async() => {
        const user = userEvent.setup();
        const onGrid = jest.fn();
        render(<ViewMenu onGrid={onGrid} />);
        await user.click(screen.getByRole('button', { name: 'View' }));
        screen.getByRole('menuitemcheckbox', { name: /show grid/i }).focus();
        await user.keyboard('{Enter}');
        expect(onGrid).toHaveBeenCalledWith(false);
    });

    test('closeOnClick closes the menu after toggling', async() => {
        const user = userEvent.setup();
        render(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.CheckboxItem closeOnClick>Bold</DropdownMenu.CheckboxItem>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );
        await user.click(screen.getByRole('button', { name: 'Open' }));
        await user.click(screen.getByRole('menuitemcheckbox', { name: 'Bold' }));
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('regular items still close the menu', async() => {
        const user = userEvent.setup();
        render(<ViewMenu />);
        await user.click(screen.getByRole('button', { name: 'View' }));
        await user.click(screen.getByRole('menuitem', { name: 'Refresh' }));
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
});
