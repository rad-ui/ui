import React from 'react';
import Accordion from '../Accordion/Accordion';
import AlertDialog from '../AlertDialog/AlertDialog';
import Autocomplete from '../Autocomplete/Autocomplete';
import Avatar from '../Avatar/Avatar';
import Checkbox from '../Checkbox/Checkbox';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import Collapsible from '../Collapsible/Collapsible';
import Combobox from '../Combobox/Combobox';
import ContextMenu from '../ContextMenu/ContextMenu';
import Dialog from '../Dialog/Dialog';
import DirectionProvider from '../DirectionProvider/DirectionProvider';
import Drawer from '../Drawer/Drawer';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Field from '../Field/Field';
import Form from '../Form/Form';
import Menubar from '../Menubar/Menubar';
import Meter from '../Meter/Meter';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import NumberField from '../NumberField/NumberField';
import OTPField from '../OTPField/OTPField';
import Progress from '../Progress/Progress';
import RadioGroup from '../RadioGroup/RadioGroup';
import ScrollArea from '../ScrollArea/ScrollArea';
import Slider from '../Slider/Slider';
import Splitter from '../Splitter/Splitter';
import Steps from '../Steps/Steps';
import Switch from '../Switch/Switch';
import Tabs from '../Tabs/Tabs';
import TextArea from '../TextArea/TextArea';
import TextField from '../TextField/TextField';
import Theme from '../Theme/Theme';
import Toast from '../Toast/Toast';
import Toggle from '../Toggle/Toggle';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import Toolbar from '../Toolbar/Toolbar';
import Tree from '../Tree/Tree';

const treeItem = { label: 'Parent', expanded: true, items: [{ label: 'Child', expanded: false }] };

/** One small tree per component, popups open where they can start open. Shared by the SSR tests. */
export const componentTrees: Array<[string, () => React.ReactElement]> = [
    ['Accordion', () => <Accordion.Root type="single" defaultValue="a"><Accordion.Item value="a"><Accordion.Header><Accordion.Trigger>A</Accordion.Trigger></Accordion.Header><Accordion.Content>Body</Accordion.Content></Accordion.Item><Accordion.Item value="b"><Accordion.Header><Accordion.Trigger>B</Accordion.Trigger></Accordion.Header><Accordion.Content hiddenUntilFound>Hidden</Accordion.Content></Accordion.Item></Accordion.Root>],
    ['AlertDialog open', () => <AlertDialog.Root open><AlertDialog.Trigger>Delete</AlertDialog.Trigger><AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content><AlertDialog.Title>Sure?</AlertDialog.Title><AlertDialog.Description>It goes.</AlertDialog.Description><AlertDialog.Cancel>No</AlertDialog.Cancel><AlertDialog.Action>Yes</AlertDialog.Action></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root>],
    ['Autocomplete', () => <Autocomplete.Root><Autocomplete.Input aria-label="City" /><Autocomplete.Content><Autocomplete.Item value="Paris">Paris</Autocomplete.Item></Autocomplete.Content></Autocomplete.Root>],
    ['Avatar', () => <Avatar.Root><Avatar.Image src="/a.png" alt="A" /><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root>],
    ['Checkbox', () => <Checkbox.Root defaultChecked name="terms" aria-label="Accept terms"><Checkbox.Indicator /></Checkbox.Root>],
    ['CheckboxGroup', () => <CheckboxGroup.Root defaultValue={['a']} name="opts"><CheckboxGroup.Label><CheckboxGroup.Trigger value="a"><CheckboxGroup.Indicator /></CheckboxGroup.Trigger>A</CheckboxGroup.Label></CheckboxGroup.Root>],
    ['Collapsible open', () => <Collapsible.Root defaultOpen><Collapsible.Trigger>T</Collapsible.Trigger><Collapsible.Content>Body</Collapsible.Content></Collapsible.Root>],
    ['Combobox', () => <Combobox.Root defaultValue="a"><Combobox.Trigger aria-label="Letter"><Combobox.Value placeholder="Pick" /></Combobox.Trigger><Combobox.Content><Combobox.Item value="a">A</Combobox.Item></Combobox.Content></Combobox.Root>],
    ['ContextMenu', () => <ContextMenu.Root><ContextMenu.Trigger>Area</ContextMenu.Trigger><ContextMenu.Portal><ContextMenu.Content><ContextMenu.Item label="Copy">Copy</ContextMenu.Item></ContextMenu.Content></ContextMenu.Portal></ContextMenu.Root>],
    ['Dialog open', () => <Dialog.Root defaultOpen><Dialog.Trigger>Open</Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Title>T</Dialog.Title><Dialog.Description>D</Dialog.Description><Dialog.Close>Close</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>],
    ['DirectionProvider', () => <DirectionProvider dir="rtl"><Tabs.Root defaultValue="a"><Tabs.List><Tabs.Trigger value="a">A</Tabs.Trigger></Tabs.List><Tabs.Content value="a">A</Tabs.Content></Tabs.Root></DirectionProvider>],
    ['Drawer open', () => <Drawer.Root defaultOpen><Drawer.Trigger>Open</Drawer.Trigger><Drawer.Portal><Drawer.Overlay /><Drawer.Content><Drawer.Handle /><Drawer.Title>T</Drawer.Title><Drawer.Description>D</Drawer.Description><Drawer.Close>Close</Drawer.Close></Drawer.Content></Drawer.Portal></Drawer.Root>],
    ['DropdownMenu open', () => <DropdownMenu.Root open><DropdownMenu.Trigger>Menu</DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content><DropdownMenu.Item label="One">One</DropdownMenu.Item><DropdownMenu.CheckboxItem>Check</DropdownMenu.CheckboxItem></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>],
    ['Field + Form', () => <Form><Field.Root name="email" required><Field.Label>Email</Field.Label><Field.Control /><Field.Description>We reply here.</Field.Description><Field.Error /></Field.Root></Form>],
    ['Menubar', () => <Menubar.Root><Menubar.Menu><Menubar.Trigger>File</Menubar.Trigger><Menubar.Portal><Menubar.Content><Menubar.Item label="New">New</Menubar.Item></Menubar.Content></Menubar.Portal></Menubar.Menu></Menubar.Root>],
    ['Meter', () => <Meter.Root aria-label="Storage" value={72} minValue={0} maxValue={100}><Meter.Indicator /></Meter.Root>],
    ['NavigationMenu', () => <NavigationMenu.Root><NavigationMenu.Item value="a"><NavigationMenu.Trigger>A</NavigationMenu.Trigger><NavigationMenu.Content><NavigationMenu.Link href="#a">Link</NavigationMenu.Link></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Viewport /></NavigationMenu.Root>],
    ['NumberField', () => <NumberField.Root defaultValue={3} name="qty"><NumberField.Decrement>-</NumberField.Decrement><NumberField.Input aria-label="Quantity" /><NumberField.Increment>+</NumberField.Increment></NumberField.Root>],
    ['NumberField formatted', () => <NumberField.Root defaultValue={1299.5} format={{ style: 'currency', currency: 'USD' }} locale="en-US"><NumberField.Input aria-label="Price" /></NumberField.Root>],
    ['OTPField', () => <OTPField.Root length={4} name="code"><OTPField.Input /><OTPField.Input /><OTPField.Input /><OTPField.Input /></OTPField.Root>],
    ['Progress', () => <Progress.Root value={40}><Progress.Label>Upload</Progress.Label><Progress.Value /><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root>],
    ['RadioGroup', () => <RadioGroup.Root aria-label="Size" defaultValue="s" name="size"><RadioGroup.Label><RadioGroup.Item value="s"><RadioGroup.Indicator /></RadioGroup.Item>Small</RadioGroup.Label></RadioGroup.Root>],
    ['ScrollArea', () => <ScrollArea.Root><ScrollArea.Viewport>Long content</ScrollArea.Viewport><ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar><ScrollArea.Corner /></ScrollArea.Root>],
    ['Slider', () => <Slider.Root defaultValue={[20, 60]} aria-label="Range"><Slider.Track><Slider.Range><Slider.Thumb aria-label="Min" /><Slider.Thumb aria-label="Max" /></Slider.Range></Slider.Track></Slider.Root>],
    ['Splitter', () => <Splitter.Root orientation="horizontal"><Splitter.Panel index={0}>Left</Splitter.Panel><Splitter.Handle index={0} /><Splitter.Panel index={1}>Right</Splitter.Panel></Splitter.Root>],
    ['Steps', () => <Steps.Root><Steps.Item value={0}><Steps.Track><Steps.Bubble /><Steps.Line /></Steps.Track><Steps.Content><Steps.Title>One</Steps.Title><Steps.Description>First</Steps.Description></Steps.Content></Steps.Item></Steps.Root>],
    ['Switch', () => <Switch.Root defaultChecked name="on" aria-label="Notifications"><Switch.Thumb /></Switch.Root>],
    ['Tabs', () => <Tabs.Root defaultValue="a"><Tabs.List><Tabs.Trigger value="a">A</Tabs.Trigger><Tabs.Trigger value="b">B</Tabs.Trigger><Tabs.Indicator /></Tabs.List><Tabs.Content value="a">A</Tabs.Content><Tabs.Content value="b">B</Tabs.Content></Tabs.Root>],
    ['TextArea', () => <TextArea aria-label="Notes" defaultValue="Hi" />],
    ['TextField', () => <TextField.Root><TextField.Slot>@</TextField.Slot><TextField.Input aria-label="Handle" defaultValue="me" /></TextField.Root>],
    ['Theme', () => <Theme appearance="light"><span>Themed</span></Theme>],
    ['Toast', () => <Toast.Provider><Toast.Viewport>{null}</Toast.Viewport></Toast.Provider>],
    ['Toggle', () => <Toggle defaultPressed aria-label="Bold">B</Toggle>],
    ['ToggleGroup', () => <ToggleGroup.Root type="single" defaultValue="a"><ToggleGroup.Item value="a" aria-label="A">A</ToggleGroup.Item><ToggleGroup.Item value="b" aria-label="B">B</ToggleGroup.Item></ToggleGroup.Root>],
    ['Toolbar', () => <Toolbar.Root aria-label="Formatting"><Toolbar.Button>Cut</Toolbar.Button><Toolbar.Separator /><Toolbar.Link href="#">Help</Toolbar.Link></Toolbar.Root>],
    ['Tree', () => <Tree.Root><Tree.Item item={treeItem}>{treeItem.label}</Tree.Item></Tree.Root>]
];

