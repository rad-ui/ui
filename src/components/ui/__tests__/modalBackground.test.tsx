import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dialog from '../Dialog/Dialog';
import AlertDialog from '../AlertDialog/AlertDialog';
import Drawer from '../Drawer/Drawer';
import Popover from '../Popover/Popover';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Select from '../Select/Select';

// One policy for every modal part: while it is open, the rest of the page is
// hidden from assistive technology. Non-modal popups leave the page alone.

const outsideHidden = () => screen.getByText('Outside').closest('[aria-hidden="true"], [inert]') !== null;

const page = (popup: React.ReactNode) => (
    <>
        {popup}
        <button>Outside</button>
    </>
);

const modals: Array<[string, React.ReactNode]> = [
    ['Dialog', <Dialog.Root key="d" defaultOpen><Dialog.Portal><Dialog.Content><Dialog.Title>T</Dialog.Title><button>In</button></Dialog.Content></Dialog.Portal></Dialog.Root>],
    ['AlertDialog', <AlertDialog.Root key="a" open><AlertDialog.Content><AlertDialog.Title>T</AlertDialog.Title><button>In</button></AlertDialog.Content></AlertDialog.Root>],
    ['Drawer', <Drawer.Root key="dr" defaultOpen><Drawer.Portal><Drawer.Content><Drawer.Title>T</Drawer.Title><button>In</button></Drawer.Content></Drawer.Portal></Drawer.Root>],
    ['Popover modal', <Popover.Root key="p" defaultOpen modal><Popover.Trigger>P</Popover.Trigger><Popover.Portal><Popover.Content><button>In</button></Popover.Content></Popover.Portal></Popover.Root>],
    ['DropdownMenu modal', <DropdownMenu.Root key="m" open modal><DropdownMenu.Trigger>M</DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content><DropdownMenu.Item label="One">One</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>],
    ['Select modal', <Select.Root key="s" open modal defaultValue="a"><Select.Trigger><Select.Value placeholder="Pick" /></Select.Trigger><Select.Content><Select.Item value="a">A</Select.Item></Select.Content></Select.Root>]
];

const nonModals: Array<[string, React.ReactNode]> = [
    ['Dialog modal={false}', <Dialog.Root key="d" defaultOpen modal={false}><Dialog.Portal><Dialog.Content><Dialog.Title>T</Dialog.Title></Dialog.Content></Dialog.Portal></Dialog.Root>],
    ['Popover', <Popover.Root key="p" defaultOpen><Popover.Trigger>P</Popover.Trigger><Popover.Portal><Popover.Content>C</Popover.Content></Popover.Portal></Popover.Root>],
    ['DropdownMenu', <DropdownMenu.Root key="m" open><DropdownMenu.Trigger>M</DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content><DropdownMenu.Item label="One">One</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>]
];

describe('background of modal components', () => {
    test.each(modals)('%s hides the page from assistive technology while open', async(_name, popup) => {
        render(page(popup));
        await waitFor(() => expect(outsideHidden()).toBe(true));
    });

    test.each(nonModals)('%s leaves the page available', async(_name, popup) => {
        render(page(popup));
        // Give focus managers a chance to run before checking.
        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(outsideHidden()).toBe(false);
    });
});
