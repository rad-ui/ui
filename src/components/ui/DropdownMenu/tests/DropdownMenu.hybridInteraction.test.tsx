import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

describe('DropdownMenu hybrid interaction', () => {
    const menu = () => (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label="One">One</DropdownMenu.Item>
                    <DropdownMenu.Item label="Two">Two</DropdownMenu.Item>
                    <DropdownMenu.Item label="Three">Three</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );

    test('pointer open then keyboard navigation selects item', async() => {
        const user = userEvent.setup();
        render(menu());

        await user.click(screen.getByText('Open'));
        await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

        await waitFor(() => expect(screen.queryByText('One')).not.toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Open')).toHaveFocus());
    });

    test('keyboard open then pointer click selects item', async() => {
        const user = userEvent.setup();
        render(menu());

        const trigger = screen.getByText('Open');
        trigger.focus();
        await user.keyboard('{ArrowDown}');

        await waitFor(() => expect(screen.getByText('One')).toBeInTheDocument());

        await user.click(screen.getByText('Three'));
        await waitFor(() => expect(screen.queryByText('Three')).not.toBeInTheDocument());
        await waitFor(() => expect(trigger).toHaveFocus());
    });
});
