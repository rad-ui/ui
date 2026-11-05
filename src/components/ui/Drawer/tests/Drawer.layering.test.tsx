import React, { useState } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from '../Drawer';
import Select from '~/components/ui/Select/Select';
import Dialog from '~/components/ui/Dialog/Dialog';
import AlertDialog from '~/components/ui/AlertDialog/AlertDialog';

const flush = () => act(async() => { await new Promise((resolve) => setTimeout(resolve, 0)); });

function DrawerWithSelect({ Shell }: { Shell: 'drawer' | 'dialog' }) {
    const [value, setValue] = useState('free');
    const select = (
        <Select.Root value={value} onValueChange={setValue}>
            <Select.Trigger aria-label="Plan"><Select.Value /></Select.Trigger>
            <Select.Portal>
                <Select.Content>
                    <Select.Item value="free">Free</Select.Item>
                    <Select.Item value="pro">Pro</Select.Item>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
    return (
        <>
            <output data-testid="value">{value}</output>
            {Shell === 'drawer'
                ? (
                    <Drawer.Root open swipeDirection="right">
                        <Drawer.Portal><Drawer.Overlay /><Drawer.Content><Drawer.Title>Team</Drawer.Title>{select}</Drawer.Content></Drawer.Portal>
                    </Drawer.Root>
                )
                : (
                    <Dialog.Root open>
                        <Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Title>Team</Dialog.Title>{select}</Dialog.Content></Dialog.Portal>
                    </Dialog.Root>
                )}
        </>
    );
}

describe.each(['dialog', 'drawer'] as const)('Select inside a %s (#2322)', (Shell) => {
    test('its list is not inert and a pointer pick works', async() => {
        const user = userEvent.setup();
        render(<DrawerWithSelect Shell={Shell} />);
        await flush();
        await user.click(screen.getByRole('combobox', { name: 'Plan' }));
        const option = await screen.findByRole('option', { name: 'Pro' });
        expect(option.closest('[aria-hidden="true"]')).toBeNull();
        expect(option.closest('[data-floating-ui-inert]')).toBeNull();
        await user.click(option);
        await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('pro'));
    });
});

function DrawerThenAlert() {
    const [drawer, setDrawer] = useState(true);
    const [confirm, setConfirm] = useState(false);
    return (
        <>
            <output data-testid="drawer">{String(drawer)}</output>
            <Drawer.Root open={drawer} onOpenChange={setDrawer} swipeDirection="right">
                <Drawer.Portal><Drawer.Overlay /><Drawer.Content>
                    <Drawer.Title>Team</Drawer.Title>
                    <button onClick={() => setConfirm(true)}>Pause posting</button>
                </Drawer.Content></Drawer.Portal>
            </Drawer.Root>
            <AlertDialog.Root open={confirm} onOpenChange={setConfirm}>
                <AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content>
                    <AlertDialog.Title>Pause posting?</AlertDialog.Title>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                </AlertDialog.Content></AlertDialog.Portal>
            </AlertDialog.Root>
        </>
    );
}

describe('a dialog opened from a drawer (#2323)', () => {
    test('is not hidden, and clicks in it leave the drawer open', async() => {
        const user = userEvent.setup();
        render(<DrawerThenAlert />);
        await flush();
        await user.click(screen.getByRole('button', { name: 'Pause posting' }));
        const dialog = await screen.findByRole('alertdialog');
        await flush();
        expect(dialog.closest('[aria-hidden="true"]')).toBeNull();
        await user.click(screen.getByRole('button', { name: 'Cancel' }));
        await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
        expect(screen.getByTestId('drawer')).toHaveTextContent('true');
    });
});

describe('stacked modals', () => {
    test('Escape closes only the top one, and focus returns into the drawer', async() => {
        const user = userEvent.setup();
        render(<DrawerThenAlert />);
        await flush();
        const opener = screen.getByRole('button', { name: 'Pause posting' });
        await user.click(opener);
        await screen.findByRole('alertdialog');
        await flush();
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
        expect(screen.getByTestId('drawer')).toHaveTextContent('true');
        await waitFor(() => expect(opener).toHaveFocus());
        // The drawer is the top modal again: Escape now closes it.
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.getByTestId('drawer')).toHaveTextContent('false'));
    });

    test('Escape still closes a single modal', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        render(
            <>
                <button>Page</button>
                <Dialog.Root defaultOpen onOpenChange={onOpenChange}>
                    <Dialog.Portal><Dialog.Content><Dialog.Title>One</Dialog.Title></Dialog.Content></Dialog.Portal>
                </Dialog.Root>
            </>
        );
        await flush();
        await user.keyboard('{Escape}');
        expect(onOpenChange.mock.calls[0][0]).toBe(false);
    });
});

describe('swipes from portalled children (#2322)', () => {
    test('a press on a portalled Select option does not start a drawer swipe', async() => {
        render(<DrawerWithSelect Shell="drawer" />);
        await flush();
        const user = userEvent.setup();
        await user.click(screen.getByRole('combobox', { name: 'Plan' }));
        const option = await screen.findByRole('option', { name: 'Pro' });
        const content = document.querySelector('[role="dialog"]') as HTMLElement;
        const capture = jest.fn();
        content.setPointerCapture = capture;
        const { fireEvent } = await import('@testing-library/react');
        fireEvent.pointerDown(option, { button: 0, pointerType: 'mouse', pointerId: 1 });
        expect(capture).not.toHaveBeenCalled();
    });
});
