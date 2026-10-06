import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import DropdownMenu from '../DropdownMenu';

const Menu = (props: { onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void }) => (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
            <DropdownMenu.Item label="Archive" disabled>Archive</DropdownMenu.Item>
            <DropdownMenu.Item label="Delete" onSelect={props.onDelete}>Delete</DropdownMenu.Item>
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label="Help">Help</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Sub>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
);

describe('DropdownMenu accessibility semantics', () => {
    test('trigger exposes menu button ARIA and reflects open state', async() => {
        const user = userEvent.setup();
        render(<Menu />);

        const trigger = screen.getByText('Options');
        expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(trigger).toHaveAttribute('data-state', 'closed');

        await user.click(trigger);

        const menu = await screen.findByRole('menu');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(trigger).toHaveAttribute('data-state', 'open');
        expect(trigger).toHaveAttribute('aria-controls', menu.id);
        expect(menu).toHaveAttribute('aria-labelledby', trigger.id);
        expect(menu).toHaveAttribute('data-state', 'open');
    });

    test('items expose menuitem roles, disabled and highlighted state', async() => {
        const user = userEvent.setup();
        render(<Menu />);

        const trigger = screen.getByText('Options');
        trigger.focus();
        await user.keyboard('{Enter}');

        const items = await screen.findAllByRole('menuitem');
        expect(items.map(item => item.textContent)).toEqual(['Profile', 'Archive', 'Delete', 'More']);

        const archive = screen.getByText('Archive');
        expect(archive).toHaveAttribute('aria-disabled', 'true');
        expect(archive).toHaveAttribute('data-disabled', '');

        const profile = screen.getByText('Profile');
        await waitFor(() => expect(profile).toHaveFocus());
        expect(profile).toHaveAttribute('data-highlighted', '');

        // Disabled items are skipped by arrow navigation.
        await user.keyboard('{ArrowDown}');
        expect(screen.getByText('Delete')).toHaveFocus();
        expect(screen.getByText('Delete')).toHaveAttribute('data-highlighted', '');
        expect(profile).not.toHaveAttribute('data-highlighted');

        const subTrigger = screen.getByText('More');
        expect(subTrigger).toHaveAttribute('aria-haspopup', 'menu');
        expect(subTrigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('onSelect runs and closes the menu, returning focus to the trigger', async() => {
        const user = userEvent.setup();
        const onDelete = jest.fn();
        render(<Menu onDelete={onDelete} />);

        const trigger = screen.getByText('Options');
        await user.click(trigger);
        await user.click(await screen.findByText('Delete'));

        expect(onDelete).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        await waitFor(() => expect(trigger).toHaveFocus());
    });

    test('onSelect can keep the menu open with preventDefault', async() => {
        const user = userEvent.setup();
        render(<Menu onDelete={(event) => event.preventDefault()} />);

        await user.click(screen.getByText('Options'));
        fireEvent.click(await screen.findByText('Delete'));

        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('axe: no violations when open', async() => {
        const user = userEvent.setup();
        const { container } = render(<Menu />);
        await user.click(screen.getByText('Options'));
        await screen.findByRole('menu');

        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations.map(v => v.id)).toEqual([]);
    });
});
