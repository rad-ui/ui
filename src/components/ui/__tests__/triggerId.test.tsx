import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Popover from '../Popover/Popover';
import Dialog from '../Dialog/Dialog';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

// With a handle, `triggerId` picks the detached trigger a popup belongs to:
// its payload, its anchor and its aria-expanded, also when opened from code.

const PopoverDemo = ({ open, triggerId, defaultOpen, defaultTriggerId, onOpenChange }: {
    open?: boolean; triggerId?: string | null; defaultOpen?: boolean; defaultTriggerId?: string; onOpenChange?: React.ComponentProps<typeof Popover.Root>["onOpenChange"];
}) => {
    const handle = React.useMemo(() => Popover.createHandle<string>(), []);
    return (
        <>
            <Popover.Trigger handle={handle} id="first" payload="First payload">First</Popover.Trigger>
            <Popover.Trigger handle={handle} id="second" payload="Second payload">Second</Popover.Trigger>
            <Popover.Root handle={handle} open={open} triggerId={triggerId} defaultOpen={defaultOpen} defaultTriggerId={defaultTriggerId} onOpenChange={onOpenChange}>
                {({ payload }) => <Popover.Portal><Popover.Content>{payload as string}</Popover.Content></Popover.Portal>}
            </Popover.Root>
        </>
    );
};

describe('triggerId', () => {
    test('a controlled triggerId opens from that trigger, with its payload', () => {
        const { rerender } = render(<PopoverDemo open triggerId="second" />);
        expect(screen.getByText('Second payload')).toBeInTheDocument();
        expect(screen.getByText('Second')).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('First')).toHaveAttribute('aria-expanded', 'false');

        rerender(<PopoverDemo open triggerId="first" />);
        expect(screen.getByText('First payload')).toBeInTheDocument();
        expect(screen.getByText('First')).toHaveAttribute('aria-expanded', 'true');
    });

    test('closing through `open` releases the trigger', () => {
        const { rerender } = render(<PopoverDemo open triggerId="second" />);
        rerender(<PopoverDemo open={false} triggerId="second" />);
        expect(screen.getByText('Second')).toHaveAttribute('aria-expanded', 'false');
    });

    test('defaultTriggerId applies to defaultOpen', () => {
        render(<PopoverDemo defaultOpen defaultTriggerId="first" />);
        expect(screen.getByText('First payload')).toBeInTheDocument();
        expect(screen.getByText('First')).toHaveAttribute('aria-expanded', 'true');
    });

    test('a pressed trigger wins over defaultTriggerId', () => {
        render(<PopoverDemo defaultTriggerId="first" />);
        fireEvent.click(screen.getByText('Second'));
        expect(screen.getByText('Second payload')).toBeInTheDocument();
    });

    test('opening from a detached trigger calls onOpenChange (Popover, Dialog)', () => {
        const onPopover = jest.fn((_open: boolean, _details: unknown) => {});
        const onDialog = jest.fn((_open: boolean, _details: unknown) => {});
        const DialogDemo = () => {
            const handle = React.useMemo(() => Dialog.createHandle(), []);
            return (
                <>
                    <Dialog.Trigger handle={handle}>Open dialog</Dialog.Trigger>
                    <Dialog.Root handle={handle} onOpenChange={onDialog}>
                        <Dialog.Portal><Dialog.Content><Dialog.Title>Dialog</Dialog.Title></Dialog.Content></Dialog.Portal>
                    </Dialog.Root>
                </>
            );
        };
        render(<><PopoverDemo onOpenChange={onPopover} /><DialogDemo /></>);
        fireEvent.click(screen.getByText('First'));
        expect(onPopover).toHaveBeenCalledWith(true, expect.objectContaining({ reason: 'trigger-press' }));
        fireEvent.click(screen.getByText('Open dialog'));
        expect(onDialog).toHaveBeenCalledWith(true, expect.objectContaining({ reason: 'trigger-press' }));
    });

    test('a canceled detached open stays closed', () => {
        render(<PopoverDemo onOpenChange={((_open: boolean, details: { cancel: () => void }) => details.cancel()) as never} />);
        fireEvent.click(screen.getByText('First'));
        expect(screen.queryByText('First payload')).not.toBeInTheDocument();
        expect(screen.getByText('First')).toHaveAttribute('aria-expanded', 'false');
    });

    test('menus take triggerId too', () => {
        const Menu = () => {
            const handle = React.useMemo(() => DropdownMenu.createHandle(), []);
            return (
                <>
                    <DropdownMenu.Trigger handle={handle} id="m1">Menu one</DropdownMenu.Trigger>
                    <DropdownMenu.Trigger handle={handle} id="m2">Menu two</DropdownMenu.Trigger>
                    <DropdownMenu.Root handle={handle} open triggerId="m2">
                        <DropdownMenu.Portal><DropdownMenu.Content><DropdownMenu.Item label="Copy">Copy</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </>
            );
        };
        render(<Menu />);
        expect(screen.getByText('Menu two')).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('Menu one')).toHaveAttribute('aria-expanded', 'false');
    });
});
