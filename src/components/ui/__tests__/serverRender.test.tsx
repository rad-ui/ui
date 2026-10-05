/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import ContextMenu from '../ContextMenu/ContextMenu';
import Menubar from '../Menubar/Menubar';
import Select from '../Select/Select';
import Combobox from '../Combobox/Combobox';
import Dialog from '../Dialog/Dialog';
import Popover from '../Popover/Popover';

// Portals and overlays must not touch `document` while rendering: SSR has no DOM.
describe('server rendering', () => {
    test.each([
        ['DropdownMenu', () => (
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
                <DropdownMenu.Portal><DropdownMenu.Content><DropdownMenu.Item label="One">One</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal>
            </DropdownMenu.Root>
        )],
        ['ContextMenu', () => (
            <ContextMenu.Root>
                <ContextMenu.Trigger>Target</ContextMenu.Trigger>
                <ContextMenu.Portal><ContextMenu.Content><ContextMenu.Item label="Copy">Copy</ContextMenu.Item></ContextMenu.Content></ContextMenu.Portal>
            </ContextMenu.Root>
        )],
        ['Menubar', () => (
            <Menubar.Root>
                <Menubar.Menu>
                    <Menubar.Trigger>File</Menubar.Trigger>
                    <Menubar.Portal><Menubar.Content><Menubar.Item label="New">New</Menubar.Item></Menubar.Content></Menubar.Portal>
                </Menubar.Menu>
            </Menubar.Root>
        )],
        ['Select', () => (
            <Select.Root defaultValue="a">
                <Select.Trigger>Pick</Select.Trigger>
                <Select.Portal><Select.Content><Select.Item value="a">A</Select.Item></Select.Content></Select.Portal>
            </Select.Root>
        )],
        ['Combobox', () => (
            <Combobox.Root>
                <Combobox.Trigger>Pick</Combobox.Trigger>
                <Combobox.Portal><Combobox.Content><Combobox.Item value="a">A</Combobox.Item></Combobox.Content></Combobox.Portal>
            </Combobox.Root>
        )],
        ['Dialog', () => (
            <Dialog.Root>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Title>Title</Dialog.Title></Dialog.Content></Dialog.Portal>
            </Dialog.Root>
        )],
        ['Popover', () => (
            <Popover.Root>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Portal><Popover.Content>Body</Popover.Content></Popover.Portal>
            </Popover.Root>
        )]
    ])('%s renders on the server without touching the DOM', (_, render) => {
        expect(() => renderToString(render())).not.toThrow();
    });
});
