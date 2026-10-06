import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';
import Combobox from '../../Combobox/Combobox';

describe('Select / Combobox right-to-left', () => {
    test('Select applies dir to the root and to the portaled listbox', async() => {
        const user = userEvent.setup();
        render(
            <Select.Root dir="rtl">
                <Select.Trigger aria-label="Fruit">Choose</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Item value="apple">Apple</Select.Item>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );
        await user.click(screen.getByRole('combobox'));
        const listbox = await screen.findByRole('listbox');
        expect(listbox.closest('[dir]')).toHaveAttribute('dir', 'rtl');
        // The trigger is hidden from the a11y tree while the listbox is open.
        expect(screen.getByRole('combobox', { hidden: true }).closest('[dir]')).toHaveAttribute('dir', 'rtl');
    });

    test('Combobox applies dir to the portaled listbox', async() => {
        const user = userEvent.setup();
        render(
            <Combobox.Root dir="rtl">
                <Combobox.Trigger aria-label="Fruit">Choose</Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Content>
                        <Combobox.Item value="apple">Apple</Combobox.Item>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
        );
        await user.click(screen.getByRole('combobox'));
        await waitFor(() => expect(screen.getByRole('listbox').closest('[dir]')).toHaveAttribute('dir', 'rtl'));
    });
});
