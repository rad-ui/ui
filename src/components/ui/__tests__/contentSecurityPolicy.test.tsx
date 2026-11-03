import React from 'react';
import { render } from '@testing-library/react';
import { TextEncoder } from 'util';
import Theme from '../Theme/Theme';
import Dialog from '../Dialog/Dialog';
import AlertDialog from '../AlertDialog/AlertDialog';
import Popover from '../Popover/Popover';
import Tooltip from '../Tooltip/Tooltip';
import HoverCard from '../HoverCard/HoverCard';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Select from '../Select/Select';
import Combobox from '../Combobox/Combobox';
import ScrollArea from '../ScrollArea/ScrollArea';
import Accordion from '../Accordion/Accordion';
import Tabs from '../Tabs/Tabs';
import Slider from '../Slider/Slider';
import NumberField from '../NumberField/NumberField';
import OTPField from '../OTPField/OTPField';
import Toast from '../Toast/Toast';
import Field from '../Field/Field';
import Form from '../Form/Form';

// Rad UI never injects <style> or <script> elements, so it works under a strict
// Content-Security-Policy (no 'unsafe-inline' for style-src-elem or script-src)
// without a nonce. Positioning uses element.style through the CSSOM, which CSP
// doesn't block. If a component ever needs an injected element, it must take a
// nonce; this test is the reminder.

const app = (
    <Theme>
        <Form>
            <Field.Root name="email"><Field.Label>Email</Field.Label><Field.Control /><Field.Error /></Field.Root>
        </Form>
        <Dialog.Root defaultOpen>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Title>T</Dialog.Title></Dialog.Content></Dialog.Portal>
        </Dialog.Root>
        <AlertDialog.Root>
            <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
            <AlertDialog.Content><AlertDialog.Title>Sure?</AlertDialog.Title></AlertDialog.Content>
        </AlertDialog.Root>
        <Popover.Root defaultOpen>
            <Popover.Trigger>P</Popover.Trigger>
            <Popover.Portal><Popover.Content>Popover</Popover.Content></Popover.Portal>
        </Popover.Root>
        <Tooltip.Root defaultOpen>
            <Tooltip.Trigger>T</Tooltip.Trigger>
            <Tooltip.Content>Tip</Tooltip.Content>
        </Tooltip.Root>
        <HoverCard.Root open>
            <HoverCard.Trigger>H</HoverCard.Trigger>
            <HoverCard.Portal><HoverCard.Content>Card</HoverCard.Content></HoverCard.Portal>
        </HoverCard.Root>
        <DropdownMenu.Root open>
            <DropdownMenu.Trigger>M</DropdownMenu.Trigger>
            <DropdownMenu.Portal><DropdownMenu.Content><DropdownMenu.Item label="One">One</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal>
        </DropdownMenu.Root>
        <Select.Root defaultValue="a">
            <Select.Trigger><Select.Value placeholder="Pick" /></Select.Trigger>
            <Select.Content><Select.Item value="a">A</Select.Item></Select.Content>
        </Select.Root>
        <Combobox.Root>
            <Combobox.Trigger><Combobox.Value placeholder="Pick" /></Combobox.Trigger>
            <Combobox.Content><Combobox.Item value="a">A</Combobox.Item></Combobox.Content>
        </Combobox.Root>
        <ScrollArea.Root><ScrollArea.Viewport>Long</ScrollArea.Viewport><ScrollArea.Scrollbar><ScrollArea.Thumb /></ScrollArea.Scrollbar></ScrollArea.Root>
        <Accordion.Root type="single"><Accordion.Item value="a"><Accordion.Header><Accordion.Trigger>A</Accordion.Trigger></Accordion.Header><Accordion.Content>Body</Accordion.Content></Accordion.Item></Accordion.Root>
        <Tabs.Root defaultValue="a"><Tabs.List><Tabs.Trigger value="a">A</Tabs.Trigger><Tabs.Indicator /></Tabs.List><Tabs.Content value="a">A</Tabs.Content></Tabs.Root>
        <Slider.Root defaultValue={3} aria-label="S"><Slider.Track><Slider.Range><Slider.Thumb aria-label="S" /></Slider.Range></Slider.Track></Slider.Root>
        <NumberField.Root defaultValue={1}><NumberField.Input aria-label="N" /></NumberField.Root>
        <OTPField.Root length={2}><OTPField.Input /><OTPField.Input /></OTPField.Root>
        <Toast.Provider><Toast.Viewport>{null}</Toast.Viewport></Toast.Provider>
    </Theme>
);

const injected = () => Array.from(document.querySelectorAll('style, script, link[rel="stylesheet"]'));

describe('Content-Security-Policy', () => {
    test('rendering and opening components adds no <style>, <script> or stylesheet link', () => {
        const before = injected();
        const { unmount } = render(app);
        expect(injected()).toEqual(before);
        unmount();
        expect(injected()).toEqual(before);
    });

    test('server HTML has no <style> or <script> elements', () => {
        // react-dom/server needs TextEncoder, which jsdom lacks.
        (globalThis as { TextEncoder?: unknown }).TextEncoder ??= TextEncoder;
        const { renderToString } = require('react-dom/server') as typeof import('react-dom/server');
        const html = renderToString(app);
        expect(html).not.toMatch(/<style[\s>]/i);
        expect(html).not.toMatch(/<script[\s>]/i);
    });
});
