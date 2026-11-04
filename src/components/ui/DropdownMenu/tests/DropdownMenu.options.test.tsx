import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

const Menu = (props: { root?: Record<string, unknown>; sub?: Record<string, unknown> }) => (
    <DropdownMenu.Root {...props.root}>
        <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
            <DropdownMenu.Sub {...props.sub}>
                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label="Help">Help</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Sub>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
);

const openSubmenu = async(user: ReturnType<typeof userEvent.setup>) => {
    screen.getByText('Options').focus();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(screen.getByText('Profile')).toHaveFocus());
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByText('More')).toHaveFocus());
    await user.keyboard('{ArrowRight}');
    await waitFor(() => expect(screen.getByText('Help')).toHaveFocus());
};

describe('DropdownMenu options', () => {
    test('Escape in a submenu closes only the submenu', async() => {
        const user = userEvent.setup();
        render(<Menu />);
        await openSubmenu(user);
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Help')).not.toBeInTheDocument());
        expect(screen.getByText('Profile')).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText('More')).toHaveFocus());
    });

    test('closeParentOnEsc closes the whole menu from a submenu', async() => {
        const user = userEvent.setup();
        render(<Menu sub={{ closeParentOnEsc: true }} />);
        await openSubmenu(user);
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Profile')).not.toBeInTheDocument());
    });

    test('onItemHighlighted reports the highlighted item', async() => {
        const user = userEvent.setup();
        const onItemHighlighted = jest.fn();
        render(<Menu root={{ onItemHighlighted }} />);
        screen.getByText('Options').focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByText('Profile')).toHaveFocus());
        await user.keyboard('{ArrowDown}');
        expect(onItemHighlighted).toHaveBeenLastCalledWith(screen.getByText('More'), { index: 1 });
    });

    test('highlightItemOnHover={false} leaves the highlight on hover', async() => {
        const user = userEvent.setup();
        render(<Menu root={{ highlightItemOnHover: false, defaultOpen: true }} />);
        await user.hover(screen.getByText('Profile'));
        expect(screen.getByText('Profile')).not.toHaveAttribute('data-highlighted');
    });

    test('items highlight on hover by default', async() => {
        const user = userEvent.setup();
        render(<Menu root={{ defaultOpen: true }} />);
        await user.hover(screen.getByText('Profile'));
        await waitFor(() => expect(screen.getByText('Profile')).toHaveAttribute('data-highlighted'));
    });

    test('positionMethod and anchor', async() => {
        const anchor = { getBoundingClientRect: () => ({ x: 250, y: 90, left: 250, top: 90, right: 260, bottom: 100, width: 10, height: 10, toJSON: () => ({}) }) };
        render(<Menu root={{ open: true, positionMethod: 'absolute', anchor, collisionAvoidance: { side: 'none', align: 'none' } }} />);
        const menu = screen.getByText('Profile').closest('[role="menu"]') as HTMLElement;
        await waitFor(() => expect(menu.style.position).toBe('absolute'));
        await waitFor(() => expect(`${menu.style.left} ${menu.style.top}`).toMatch(/250px/));
    });
});

describe('DropdownMenu.Arrow', () => {
    test('renders a positioned arrow inside the menu', async() => {
        render(
            <DropdownMenu.Root open>
                <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Arrow />
                    <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        );
        const menu = screen.getByRole('menu');
        const arrow = menu.querySelector('[data-slot="dropdown-menu-arrow"]') as SVGElement;
        expect(arrow).toBeInTheDocument();
        expect(arrow).toHaveAttribute('aria-hidden', 'true');
        // jsdom has no layout; the arrow middleware still places it.
        await waitFor(() => expect(arrow.style.position).toBe('absolute'));
    });
});
