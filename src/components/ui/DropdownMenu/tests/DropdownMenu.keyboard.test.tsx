import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import DropdownMenu from '../DropdownMenu';

// Helper to render a basic dropdown menu
function renderMenu() {
    return render(
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
}

describe('DropdownMenu keyboard interactions', () => {
    test('trigger opens menu and first item becomes focusable', async() => {
        const user = userEvent.setup();
        renderMenu();

        const trigger = screen.getByText('Open');
        await user.click(trigger);

        const first = screen.getByText('One');
        expect(first).toBeInTheDocument();
        await user.keyboard('{ArrowDown}');
        expect(first).toHaveFocus();
    });

    test('arrow keys navigate, home/end jump, esc closes and returns focus', async() => {
        const user = userEvent.setup();
        renderMenu();

        const trigger = screen.getByText('Open');
        await user.click(trigger);
        const first = screen.getByText('One');
        const second = screen.getByText('Two');
        const third = screen.getByText('Three');

        // First ArrowDown focuses first item
        await user.keyboard('{ArrowDown}');
        expect(first).toHaveFocus();

        // Next ArrowDown moves to second
        await user.keyboard('{ArrowDown}');
        expect(second).toHaveFocus();

        // End jumps to last
        await user.keyboard('{End}');
        expect(third).toHaveFocus();

        // Home jumps to first
        await user.keyboard('{Home}');
        expect(first).toHaveFocus();

        // Esc closes
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('One')).not.toBeInTheDocument());
        expect(trigger).toHaveFocus();
    });

    test('typeahead selects matching items', async() => {
        const user = userEvent.setup();
        renderMenu();

        await user.click(screen.getByText('Open'));
        await user.keyboard('th');
        await waitFor(() => expect(screen.getByText('Three')).toHaveFocus());
    });

    test('data-disabled items are inert', async() => {
        const user = userEvent.setup();
        const onSelect = jest.fn();
        render(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item {...({ onClick: onSelect } as any)}>Enabled</DropdownMenu.Item>
                        <DropdownMenu.Item {...({ onClick: onSelect } as any)} disabled data-disabled>
                            Disabled
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );

        await user.click(screen.getByText('Open'));
        const disabled = screen.getByText('Disabled');
        expect(disabled).toHaveAttribute('data-disabled');
        await user.click(disabled);
        expect(onSelect).toHaveBeenCalledTimes(0);
    });

    test('controlled open state syncs with onOpenChange and defaultOpen', async() => {
        const user = userEvent.setup();
        const handleChange = jest.fn();

        const Controlled = () => {
            const [open, setOpen] = React.useState(false);
            return (
                <DropdownMenu.Root open={open} onOpenChange={(o) => { setOpen(o); handleChange(o); }}>
                    <DropdownMenu.Trigger>Ctrl</DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>Item</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            );
        };

        render(<Controlled />);
        const trigger = screen.getByText('Ctrl');
        await user.click(trigger);
        expect(handleChange).toHaveBeenLastCalledWith(true);
        expect(screen.getByText('Item')).toBeInTheDocument();
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Item')).not.toBeInTheDocument());
        expect(handleChange).toHaveBeenLastCalledWith(false);

        // defaultOpen works
        render(
            <DropdownMenu.Root defaultOpen>
                <DropdownMenu.Trigger>Def</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item>Visible</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );
        expect(screen.getByText('Visible')).toBeInTheDocument();
    });

    test('axe: no violations', async() => {
        const user = userEvent.setup();
        const { container } = renderMenu();
        await user.click(screen.getByText('Open'));
        const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false }, 'aria-command-name': { enabled: false } } });
        expect(results.violations).toHaveLength(0);
    });

    test('asChild trigger retains semantics and refs', async() => {
        const user = userEvent.setup();
        const childRef = React.createRef<HTMLAnchorElement>();
        const triggerRef = React.createRef<HTMLAnchorElement>();
        render(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild ref={triggerRef as unknown as React.Ref<HTMLButtonElement>}>
                    <a href="#link" ref={childRef}>Link</a>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item>Item</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );

        const trigger = screen.getByText('Link');
        expect(trigger.tagName).toBe('A');
        expect(trigger).toHaveAttribute('href', '#link');
        expect(triggerRef.current).toBe(trigger);
        expect(childRef.current).toBe(trigger);
        await user.click(trigger);
        expect(await screen.findByText('Item')).toBeInTheDocument();
    });
});

