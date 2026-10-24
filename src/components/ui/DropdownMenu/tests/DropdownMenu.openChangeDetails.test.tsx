import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';
import Select from '~/components/ui/Select/Select';

describe('onOpenChange details on menus and selects', () => {
    test('DropdownMenu reports trigger and item presses', async() => {
        const user = userEvent.setup();
        const reasons: string[] = [];
        render(
            <DropdownMenu.Root onOpenChange={(open, details) => reasons.push(`${open}:${details.reason}`)}>
                <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item>Rename</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );
        await user.click(screen.getByRole('button', { name: 'Actions' }));
        await user.click(screen.getByRole('menuitem', { name: 'Rename' }));
        expect(reasons).toEqual(['true:trigger-press', 'false:item-press']);
    });

    test('Select can cancel closing on an item press', async() => {
        const user = userEvent.setup();
        render(
            <Select.Root onOpenChange={(open, details) => { if (!open && details.reason === 'item-press') details.cancel(); }}>
                <Select.Trigger>Pick</Select.Trigger>
                <Select.Content>
                    <Select.Item value="a">A</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        await user.click(screen.getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: 'A' }));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
});
