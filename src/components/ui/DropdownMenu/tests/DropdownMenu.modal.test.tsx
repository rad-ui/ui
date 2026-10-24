import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

const Page = ({ modal, onOutside }: { modal?: boolean; onOutside?: () => void }) => (
    <>
        <DropdownMenu.Root modal={modal}>
            <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label="Rename">Rename</DropdownMenu.Item>
                    <DropdownMenu.Item label="Delete">Delete</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <main data-testid="page"><button onClick={onOutside}>Outside</button></main>
    </>
);

describe('DropdownMenu modal', () => {
    test('modal: covers the page, locks scroll and hides outside content from AT', async() => {
        const user = userEvent.setup();
        render(<Page modal />);
        await user.click(screen.getByText('Options'));
        await screen.findByRole('menuitem', { name: 'Rename' });
        const backdrop = document.querySelector('[data-slot="menu-backdrop"]') as HTMLElement;
        expect(backdrop).toBeInTheDocument();
        await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));
        await waitFor(() => expect(screen.getByTestId('page').closest('[aria-hidden="true"], [data-floating-ui-inert]')).not.toBeNull());
    });

    test('modal: an outside press closes the menu without reaching the page', async() => {
        const onOutside = jest.fn();
        const user = userEvent.setup();
        render(<Page modal onOutside={onOutside} />);
        await user.click(screen.getByText('Options'));
        await screen.findByRole('menuitem', { name: 'Rename' });
        const backdrop = document.querySelector('[data-slot="menu-backdrop"]') as HTMLElement;
        fireEvent.pointerDown(backdrop);
        fireEvent.mouseDown(backdrop);
        fireEvent.click(backdrop);
        await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Rename' })).not.toBeInTheDocument());
        expect(onOutside).not.toHaveBeenCalled();
        expect(document.querySelector('[data-slot="menu-backdrop"]')).toBeNull();
        await waitFor(() => expect(document.body.style.overflow).not.toBe('hidden'));
    });

    test('not modal (default): no backdrop and the page stays reachable', async() => {
        const user = userEvent.setup();
        render(<Page />);
        await user.click(screen.getByText('Options'));
        await screen.findByRole('menuitem', { name: 'Rename' });
        expect(document.querySelector('[data-slot="menu-backdrop"]')).toBeNull();
        expect(document.body.style.overflow).not.toBe('hidden');
    });

    test('Escape and keyboard selection still work when modal', async() => {
        const user = userEvent.setup();
        render(<Page modal />);
        await user.click(screen.getByText('Options'));
        await screen.findByRole('menuitem', { name: 'Rename' });
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Rename' })).not.toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Options')).toHaveFocus());
    });
});

test('modal: submenus still take focus and items in them work', async() => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
        <DropdownMenu.Root modal>
            <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label="Rename">Rename</DropdownMenu.Item>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item label="Archive" onSelect={onSelect}>Archive</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
    screen.getByText('Options').focus();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(screen.getByText('Rename')).toHaveFocus());
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByText('More')).toHaveFocus());
    await user.keyboard('{ArrowRight}');
    const archive = await screen.findByRole('menuitem', { name: 'Archive' });
    await waitFor(() => expect(archive).toHaveFocus());
    expect(document.querySelectorAll('[data-slot="menu-backdrop"]')).toHaveLength(1);
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalled();
});
