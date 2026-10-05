import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menubar from '../Menubar';
import Theme from '~/components/ui/Theme/Theme';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') return;
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        }))
    });
};

describe('Menubar keyboard paths', () => {
    beforeEach(() => mockMatchMedia());

    test('arrow keys move between triggers and open menus', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <Menubar.Root>
                    <Menubar.Menu>
                        <Menubar.Trigger>File</Menubar.Trigger>
                        <Menubar.Portal>
                            <Menubar.Content>
                                <Menubar.Item>New</Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Portal>
                    </Menubar.Menu>
                    <Menubar.Menu>
                        <Menubar.Trigger>Edit</Menubar.Trigger>
                        <Menubar.Portal>
                            <Menubar.Content>
                                <Menubar.Item>Cut</Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Portal>
                    </Menubar.Menu>
                </Menubar.Root>
            </Theme>
        );

        const file = screen.getByText('File');
        const edit = screen.getByText('Edit');

        file.focus();
        await user.keyboard('{ArrowRight}');
        expect(edit).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(screen.getByText('Cut')).toBeInTheDocument());

        await user.keyboard('{ArrowLeft}');
        expect(file).toHaveFocus();
    });

    const renderInlineMenubar = () => render(
        <Theme>
            <button type="button">Outside</button>
            <Menubar.Root aria-label="Application">
                <Menubar.Menu>
                    <Menubar.Trigger>File</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>New</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
                <Menubar.Menu>
                    <Menubar.Trigger>Edit</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>Cut</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
                <Menubar.Menu>
                    <Menubar.Trigger>View</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>Zoom</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        </Theme>
    );

    test('Enter and ArrowDown open the focused menu and update aria-expanded', async() => {
        const user = userEvent.setup();
        renderInlineMenubar();

        const file = screen.getByRole('menuitem', { name: 'File' });
        expect(file).toHaveAttribute('aria-expanded', 'false');

        file.focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
        expect(file).toHaveAttribute('aria-expanded', 'true');
        expect(file).toHaveAttribute('data-state', 'open');

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        expect(file).toHaveAttribute('aria-expanded', 'false');

        const edit = screen.getByRole('menuitem', { name: 'Edit' });
        edit.focus();
        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(screen.getByText('Cut')).toBeInTheDocument());
        expect(edit).toHaveAttribute('aria-expanded', 'true');
    });

    test('ArrowRight inside open content moves to the next menu', async() => {
        const user = userEvent.setup();
        renderInlineMenubar();

        const file = screen.getByRole('menuitem', { name: 'File' });
        const edit = screen.getByRole('menuitem', { name: 'Edit' });

        await user.click(file);
        const newItem = await screen.findByRole('menuitem', { name: 'New' });
        newItem.focus();
        await user.keyboard('{ArrowRight}');

        await waitFor(() => expect(edit).toHaveAttribute('aria-expanded', 'true'));
        expect(file).toHaveAttribute('aria-expanded', 'false');
        expect(edit).toHaveFocus();
        expect(screen.getByText('Cut')).toBeInTheDocument();
    });

    test('roving tabindex follows focus and Home/End jump to the ends', async() => {
        const user = userEvent.setup();
        renderInlineMenubar();

        const file = screen.getByRole('menuitem', { name: 'File' });
        const edit = screen.getByRole('menuitem', { name: 'Edit' });
        const view = screen.getByRole('menuitem', { name: 'View' });

        await waitFor(() => expect(file).toHaveAttribute('tabindex', '0'));
        expect(edit).toHaveAttribute('tabindex', '-1');
        expect(view).toHaveAttribute('tabindex', '-1');

        file.focus();
        await user.keyboard('{End}');
        expect(view).toHaveFocus();
        await waitFor(() => expect(view).toHaveAttribute('tabindex', '0'));
        expect(file).toHaveAttribute('tabindex', '-1');

        await user.keyboard('{Home}');
        expect(file).toHaveFocus();

        // Up/Down never move between menubar triggers.
        await user.keyboard('{ArrowUp}');
        expect(screen.getByRole('menuitem', { name: 'Edit' })).not.toHaveFocus();
    });

    test('arrow keys pressed outside the menubar never reopen a closed menu', async() => {
        const user = userEvent.setup();
        renderInlineMenubar();

        const file = screen.getByRole('menuitem', { name: 'File' });
        await user.click(file);
        await screen.findByRole('menuitem', { name: 'New' });
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());

        const outside = screen.getByRole('button', { name: 'Outside' });
        outside.focus();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{ArrowLeft}');
        fireEvent.keyDown(document.body, { key: 'ArrowRight' });

        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        screen.getAllByRole('menuitem').forEach((trigger) => {
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
        });
        expect(outside).toHaveFocus();
    });
    test('hovering another trigger while a menu is open switches to that menu', async() => {
        const user = userEvent.setup();
        renderInlineMenubar();

        const file = screen.getByRole('menuitem', { name: 'File' });
        const edit = screen.getByRole('menuitem', { name: 'Edit' });

        // Hovering with every menu closed does not open anything.
        await user.hover(edit);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();

        await user.click(file);
        await screen.findByRole('menuitem', { name: 'New' });

        await user.hover(edit);
        await waitFor(() => expect(edit).toHaveAttribute('aria-expanded', 'true'));
        expect(file).toHaveAttribute('aria-expanded', 'false');
        expect(screen.getByText('Cut')).toBeInTheDocument();
        expect(screen.queryByText('New')).not.toBeInTheDocument();
        expect(edit).toHaveFocus();
        expect(edit).toHaveAttribute('tabindex', '0');
    });

    test('selecting an item after switching menus with the keyboard returns focus to the trigger', async() => {
        const user = userEvent.setup();
        renderInlineMenubar();

        const file = screen.getByRole('menuitem', { name: 'File' });
        const edit = screen.getByRole('menuitem', { name: 'Edit' });

        await user.click(file);
        const newItem = await screen.findByRole('menuitem', { name: 'New' });
        newItem.focus();
        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(edit).toHaveAttribute('aria-expanded', 'true'));
        expect(edit).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus());
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        await waitFor(() => expect(edit).toHaveFocus());

        // A menu opened afterwards with the keyboard moves focus into its content again.
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus());
    });

    test('unmounted menus are removed from keyboard navigation', async() => {
        const user = userEvent.setup();
        const App = ({ showEdit }: { showEdit: boolean }) => (
            <Theme>
                <Menubar.Root>
                    <Menubar.Menu>
                        <Menubar.Trigger>File</Menubar.Trigger>
                        <Menubar.Content><Menubar.Item>New</Menubar.Item></Menubar.Content>
                    </Menubar.Menu>
                    {showEdit && (
                        <Menubar.Menu>
                            <Menubar.Trigger>Edit</Menubar.Trigger>
                            <Menubar.Content><Menubar.Item>Cut</Menubar.Item></Menubar.Content>
                        </Menubar.Menu>
                    )}
                    <Menubar.Menu>
                        <Menubar.Trigger>View</Menubar.Trigger>
                        <Menubar.Content><Menubar.Item>Zoom</Menubar.Item></Menubar.Content>
                    </Menubar.Menu>
                </Menubar.Root>
            </Theme>
        );

        const { rerender } = render(<App showEdit={false} />);
        rerender(<App showEdit />);
        rerender(<App showEdit={false} />);
        rerender(<App showEdit />);

        const file = screen.getByRole('menuitem', { name: 'File' });
        await user.click(file);
        const newItem = await screen.findByRole('menuitem', { name: 'New' });
        newItem.focus();

        // Edit was mounted after View but sits between File and View in the DOM.
        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute('aria-expanded', 'true'));
        expect(screen.getByText('Cut')).toBeInTheDocument();

        rerender(<App showEdit={false} />);
        file.focus();
        await user.keyboard('{Enter}');
        await screen.findByRole('menuitem', { name: 'New' });
        screen.getByRole('menuitem', { name: 'New' }).focus();
        await user.keyboard('{ArrowRight}');
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'View' })).toHaveAttribute('aria-expanded', 'true'));
        expect(screen.getByText('Zoom')).toBeInTheDocument();
    });
});
