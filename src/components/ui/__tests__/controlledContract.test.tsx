import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox/Checkbox';
import Switch from '../Switch/Switch';
import Toggle from '../Toggle/Toggle';
import Collapsible from '../Collapsible/Collapsible';
import Accordion from '../Accordion/Accordion';
import Tabs from '../Tabs/Tabs';
import RadioGroup from '../RadioGroup/RadioGroup';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import Dialog from '../Dialog/Dialog';
import Popover from '../Popover/Popover';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Select from '../Select/Select';
import Slider from '../Slider/Slider';
import NumberField from '../NumberField/NumberField';
import AlertDialog from '../AlertDialog/AlertDialog';
import Drawer from '../Drawer/Drawer';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import Combobox from '../Combobox/Combobox';

// #1825: every stateful component works both ways.
// Uncontrolled: the default applies, and an interaction changes the state and reports it.
// Controlled: an interaction only reports the change; the state follows the prop.

type Contract = {
    name: string;
    /** The prop pair and the change callback. */
    value: string; defaultValue: string; onChange: string;
    initial: unknown; next: unknown;
    render: (props: Record<string, unknown>) => React.ReactElement;
    interact: (user: ReturnType<typeof userEvent.setup>) => Promise<void>;
    /** The state as the DOM shows it, comparable with `initial` / `next` through `shows`. */
    read: () => string;
    shows: (state: unknown) => string;
};

const flush = () => act(async() => { await new Promise((resolve) => setTimeout(resolve, 0)); });
const stateOf = (el: Element | null) => el?.getAttribute('data-state') ?? 'absent';

const contracts: Contract[] = [
    {
        name: 'Checkbox',
        value: 'checked',
        defaultValue: 'defaultChecked',
        onChange: 'onCheckedChange',
        initial: false,
        next: true,
        render: (p) => <Checkbox.Root aria-label="Terms" {...p}><Checkbox.Indicator /></Checkbox.Root>,
        interact: (u) => u.click(screen.getByRole('checkbox')),
        read: () => String(screen.getByRole('checkbox').getAttribute('aria-checked')),
        shows: String
    },
    {
        name: 'Switch',
        value: 'checked',
        defaultValue: 'defaultChecked',
        onChange: 'onCheckedChange',
        initial: false,
        next: true,
        render: (p) => <Switch.Root aria-label="Wifi" {...p}><Switch.Thumb /></Switch.Root>,
        interact: (u) => u.click(screen.getByRole('switch')),
        read: () => String(screen.getByRole('switch').getAttribute('aria-checked')),
        shows: String
    },
    {
        name: 'Toggle',
        value: 'pressed',
        defaultValue: 'defaultPressed',
        onChange: 'onPressedChange',
        initial: false,
        next: true,
        render: (p) => <Toggle aria-label="Bold" {...p}>B</Toggle>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'Bold' })),
        read: () => String(screen.getByRole('button', { name: 'Bold' }).getAttribute('aria-pressed')),
        shows: String
    },
    {
        name: 'Collapsible',
        value: 'open',
        defaultValue: 'defaultOpen',
        onChange: 'onOpenChange',
        initial: false,
        next: true,
        render: (p) => <Collapsible.Root {...p}><Collapsible.Trigger>More</Collapsible.Trigger><Collapsible.Content>Body</Collapsible.Content></Collapsible.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'More' })),
        read: () => String(screen.getByRole('button', { name: 'More' }).getAttribute('aria-expanded')),
        shows: String
    },
    {
        name: 'Accordion',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: [],
        next: ['a'],
        render: (p) => <Accordion.Root {...p}><Accordion.Item value="a"><Accordion.Header><Accordion.Trigger>A</Accordion.Trigger></Accordion.Header><Accordion.Content>Body</Accordion.Content></Accordion.Item></Accordion.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'A' })),
        read: () => String(screen.getByRole('button', { name: 'A' }).getAttribute('aria-expanded')),
        shows: (s) => String((s as string[]).includes('a'))
    },
    {
        name: 'Tabs',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: 'one',
        next: 'two',
        render: (p) => <Tabs.Root {...p}><Tabs.List><Tabs.Trigger value="one">One</Tabs.Trigger><Tabs.Trigger value="two">Two</Tabs.Trigger></Tabs.List><Tabs.Content value="one">1</Tabs.Content><Tabs.Content value="two">2</Tabs.Content></Tabs.Root>,
        interact: (u) => u.click(screen.getByRole('tab', { name: 'Two' })),
        read: () => screen.getByRole('tab', { selected: true }).textContent!.toLowerCase(),
        shows: String
    },
    {
        name: 'RadioGroup',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: 'a',
        next: 'b',
        render: (p) => <RadioGroup.Root aria-label="Plan" {...p}><RadioGroup.Item value="a" aria-label="a"><RadioGroup.Indicator /></RadioGroup.Item><RadioGroup.Item value="b" aria-label="b"><RadioGroup.Indicator /></RadioGroup.Item></RadioGroup.Root>,
        interact: (u) => u.click(screen.getByRole('radio', { name: 'b' })),
        read: () => screen.getAllByRole('radio').find((r) => r.getAttribute('aria-checked') === 'true')?.getAttribute('aria-label') ?? 'none',
        shows: String
    },
    {
        name: 'ToggleGroup',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: ['a'],
        next: ['b'],
        render: (p) => <ToggleGroup.Root type="single" aria-label="Align" {...p}><ToggleGroup.Item value="a" aria-label="a">A</ToggleGroup.Item><ToggleGroup.Item value="b" aria-label="b">B</ToggleGroup.Item></ToggleGroup.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'b' })),
        read: () => screen.getAllByRole('button').filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.getAttribute('aria-label')).join(','),
        shows: (s) => (s as string[]).join(',')
    },
    {
        name: 'Dialog',
        value: 'open',
        defaultValue: 'defaultOpen',
        onChange: 'onOpenChange',
        initial: false,
        next: true,
        render: (p) => <Dialog.Root {...p}><Dialog.Trigger>Open</Dialog.Trigger><Dialog.Portal><Dialog.Content><Dialog.Title>T</Dialog.Title></Dialog.Content></Dialog.Portal></Dialog.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'Open' })),
        read: () => String(screen.queryByRole('dialog') !== null),
        shows: String
    },
    {
        name: 'Popover',
        value: 'open',
        defaultValue: 'defaultOpen',
        onChange: 'onOpenChange',
        initial: false,
        next: true,
        render: (p) => <Popover.Root {...p}><Popover.Trigger>Open</Popover.Trigger><Popover.Portal><Popover.Content>Body</Popover.Content></Popover.Portal></Popover.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'Open' })),
        read: () => String(screen.getByRole('button', { name: 'Open' }).getAttribute('aria-expanded')),
        shows: String
    },
    {
        name: 'DropdownMenu',
        value: 'open',
        defaultValue: 'defaultOpen',
        onChange: 'onOpenChange',
        initial: false,
        next: true,
        render: (p) => <DropdownMenu.Root {...p}><DropdownMenu.Trigger>Menu</DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content><DropdownMenu.Item label="One">One</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'Menu' })),
        read: () => String(screen.getByRole('button', { name: 'Menu' }).getAttribute('aria-expanded')),
        shows: String
    },
    {
        name: 'Select',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: 'a',
        next: 'b',
        render: (p) => <Select.Root {...p}><Select.Trigger aria-label="Pick"><Select.Value /></Select.Trigger><Select.Portal><Select.Content><Select.Item value="a">a</Select.Item><Select.Item value="b">b</Select.Item></Select.Content></Select.Portal></Select.Root>,
        interact: async(u) => { await u.click(screen.getByRole('combobox', { name: 'Pick' })); await u.click(await screen.findByRole('option', { name: 'b' })); },
        read: () => screen.getByRole('combobox', { name: 'Pick' }).textContent!.trim(),
        shows: String
    },
    {
        name: 'Slider',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: 40,
        next: 41,
        render: (p) => <Slider.Root aria-label="Volume" {...p}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="Volume" /></Slider.Root>,
        interact: async(u) => { screen.getByRole('slider').focus(); await u.keyboard('{ArrowRight}'); },
        read: () => String(screen.getByRole('slider').getAttribute('aria-valuenow')),
        shows: (s) => String(Array.isArray(s) ? s[0] : s)
    },
    {
        name: 'NumberField',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: 5,
        next: 6,
        render: (p) => <NumberField.Root {...p}><NumberField.Input aria-label="Qty" /><NumberField.Increment aria-label="More">+</NumberField.Increment></NumberField.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'More' })),
        read: () => (screen.getByRole('spinbutton', { name: 'Qty' }) as HTMLInputElement).value,
        shows: String
    },
    {
        name: 'AlertDialog',
        value: 'open',
        defaultValue: 'defaultOpen',
        onChange: 'onOpenChange',
        initial: false,
        next: true,
        render: (p) => <AlertDialog.Root {...p}><AlertDialog.Trigger>Delete</AlertDialog.Trigger><AlertDialog.Portal><AlertDialog.Content><AlertDialog.Title>Sure?</AlertDialog.Title><AlertDialog.Cancel>No</AlertDialog.Cancel></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'Delete' })),
        read: () => String(screen.queryByRole('alertdialog') !== null),
        shows: String
    },
    {
        name: 'Drawer',
        value: 'open',
        defaultValue: 'defaultOpen',
        onChange: 'onOpenChange',
        initial: false,
        next: true,
        render: (p) => <Drawer.Root swipeDirection="right" {...p}><Drawer.Trigger>Panel</Drawer.Trigger><Drawer.Portal><Drawer.Content><Drawer.Title>Panel</Drawer.Title></Drawer.Content></Drawer.Portal></Drawer.Root>,
        interact: (u) => u.click(screen.getByRole('button', { name: 'Panel' })),
        read: () => String(screen.queryByRole('dialog') !== null),
        shows: String
    },
    {
        name: 'CheckboxGroup',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: [],
        next: ['a'],
        render: (p) => <CheckboxGroup.Root aria-label="Toppings" {...p}><CheckboxGroup.Label><CheckboxGroup.Trigger value="a" aria-label="a"><CheckboxGroup.Indicator /></CheckboxGroup.Trigger>a</CheckboxGroup.Label></CheckboxGroup.Root>,
        interact: (u) => u.click(screen.getByRole('checkbox', { name: 'a' })),
        read: () => String(screen.getByRole('checkbox', { name: 'a' }).getAttribute('aria-checked')),
        shows: (s) => String((s as string[]).includes('a'))
    },
    {
        name: 'Combobox',
        value: 'value',
        defaultValue: 'defaultValue',
        onChange: 'onValueChange',
        initial: 'a',
        next: 'b',
        render: (p) => <Combobox.Root {...p}><Combobox.Trigger aria-label="Pick"><Combobox.Value /></Combobox.Trigger><Combobox.Portal><Combobox.Content><Combobox.Item value="a">a</Combobox.Item><Combobox.Item value="b">b</Combobox.Item></Combobox.Content></Combobox.Portal></Combobox.Root>,
        interact: async(u) => { await u.click(screen.getByRole('combobox', { name: 'Pick' })); await u.click(await screen.findByRole('option', { name: 'b' })); },
        read: () => screen.getByRole('combobox', { name: 'Pick' }).textContent!.trim(),
        shows: String
    }
];

describe.each(contracts)('$name', (c) => {
    test('uncontrolled: the default applies and an interaction changes it', async() => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(c.render({ [c.defaultValue]: c.initial, [c.onChange]: onChange }));
        await flush();
        expect(c.read()).toBe(c.shows(c.initial));
        await c.interact(user);
        await flush();
        expect(c.read()).toBe(c.shows(c.next));
        expect(onChange).toHaveBeenCalled();
    });

    test('controlled: an interaction reports the change, and the state follows the prop', async() => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        const { rerender } = render(c.render({ [c.value]: c.initial, [c.onChange]: onChange }));
        await flush();
        await c.interact(user);
        await flush();
        expect(onChange).toHaveBeenCalled();
        expect(c.read()).toBe(c.shows(c.initial));
        rerender(c.render({ [c.value]: c.next, [c.onChange]: onChange }));
        await flush();
        expect(c.read()).toBe(c.shows(c.next));
    });
});
