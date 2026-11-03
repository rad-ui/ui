/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Field from '../Field/Field';
import Form from '../Form/Form';
import OTPField from '../OTPField/OTPField';
import Autocomplete from '../Autocomplete/Autocomplete';
import Combobox from '../Combobox/Combobox';
import Select from '../Select/Select';
import Tabs from '../Tabs/Tabs';
import Tooltip from '../Tooltip/Tooltip';
import Popover from '../Popover/Popover';
import Dialog from '../Dialog/Dialog';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import NumberField from '../NumberField/NumberField';
import Progress from '../Progress/Progress';
import ScrollArea from '../ScrollArea/ScrollArea';
import Slider from '../Slider/Slider';
import Toolbar from '../Toolbar/Toolbar';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import Accordion from '../Accordion/Accordion';
import DirectionProvider from '../DirectionProvider/DirectionProvider';
import Slot from '../Slot/Slot';
import Avatar from '../Avatar/Avatar';

const trees: Array<[string, React.ReactElement]> = [
    ['Field + Form', <Form key="f"><Field.Root name="email" required validate={() => null}><Field.Label>Email</Field.Label><Field.Control /><Field.Description>d</Field.Description><Field.Error /></Field.Root></Form>],
    ['OTPField', <OTPField.Root key="o" length={4} name="code"><OTPField.Input /><OTPField.Input /><OTPField.Input /><OTPField.Input /></OTPField.Root>],
    ['Autocomplete', <Autocomplete.Root key="a"><Autocomplete.Input aria-label="City" /><Autocomplete.Content><Autocomplete.Item value="A">A</Autocomplete.Item><Autocomplete.Empty>None</Autocomplete.Empty></Autocomplete.Content></Autocomplete.Root>],
    ['Combobox multiple', <Combobox.Root key="c" multiple defaultValue={['a']}><Combobox.Trigger><Combobox.Value placeholder="x" /></Combobox.Trigger><Combobox.Chips /><Combobox.Content><Combobox.Item value="a">A</Combobox.Item></Combobox.Content></Combobox.Root>],
    ['Select parts', <Select.Root key="s" defaultValue="a"><Select.Trigger><Select.Value placeholder="Pick" /><Select.Icon /></Select.Trigger><Select.Content><Select.Group><Select.GroupLabel>G</Select.GroupLabel><Select.Item value="a">A</Select.Item></Select.Group><Select.Separator /></Select.Content></Select.Root>],
    ['Tabs indicator', <Tabs.Root key="t" defaultValue="a"><Tabs.List><Tabs.Trigger value="a">A</Tabs.Trigger><Tabs.Indicator /></Tabs.List><Tabs.Content value="a">A</Tabs.Content></Tabs.Root>],
    ['Tooltip provider + handle', <Tooltip.Provider key="tp"><Tooltip.Root defaultOpen><Tooltip.Trigger>T</Tooltip.Trigger><Tooltip.Content>C</Tooltip.Content></Tooltip.Root></Tooltip.Provider>],
    ['Popover handle', <Popover.Root key="p" handle={Popover.createHandle()} openOnHover>{() => <Popover.Content>C</Popover.Content>}</Popover.Root>],
    ['Dialog handle', <Dialog.Root key="d" handle={Dialog.createHandle()}>{() => <Dialog.Content>C</Dialog.Content>}</Dialog.Root>],
    ['DropdownMenu items', <DropdownMenu.Root key="m" openOnHover><DropdownMenu.Trigger>M</DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.CheckboxItem>C</DropdownMenu.CheckboxItem><DropdownMenu.RadioGroup><DropdownMenu.RadioItem value="a">A</DropdownMenu.RadioItem></DropdownMenu.RadioGroup></DropdownMenu.Content></DropdownMenu.Root>],
    ['NumberField format + scrub', <NumberField.Root key="n" defaultValue={0.5} format={{ style: 'percent' }} allowWheelScrub><NumberField.ScrubArea>W</NumberField.ScrubArea><NumberField.Input aria-label="N" /></NumberField.Root>],
    ['Progress parts', <Progress.Root key="pr" value={40}><Progress.Label>L</Progress.Label><Progress.Value /><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root>],
    ['ScrollArea', <ScrollArea.Root key="sa"><ScrollArea.Viewport>x</ScrollArea.Viewport></ScrollArea.Root>],
    ['Slider value', <Slider.Root key="sl" defaultValue={3} aria-label="S"><Slider.Value /><Slider.Track><Slider.Range><Slider.Thumb aria-label="S" /></Slider.Range></Slider.Track></Slider.Root>],
    ['Toolbar input', <Toolbar.Root key="tb" aria-label="T"><Toolbar.Input aria-label="I" /></Toolbar.Root>],
    ['CheckboxGroup parent', <CheckboxGroup.Root key="cg" allValues={['a']}><CheckboxGroup.Trigger parent /><CheckboxGroup.Trigger value="a" /></CheckboxGroup.Root>],
    ['Accordion hiddenUntilFound', <Accordion.Root key="ac" type="single"><Accordion.Item value="a"><Accordion.Header><Accordion.Trigger>A</Accordion.Trigger></Accordion.Header><Accordion.Content hiddenUntilFound>Body</Accordion.Content></Accordion.Item></Accordion.Root>],
    ['DirectionProvider + Slot', <DirectionProvider key="dp" dir="rtl"><Slot className="x"><button>b</button></Slot></DirectionProvider>],
    ['Avatar delay', <Avatar.Root key="av"><Avatar.Fallback delay={300}>AL</Avatar.Fallback></Avatar.Root>]
];

describe('new parts render on the server', () => {
    test.each(trees)('%s', (_name, tree) => {
        expect(() => renderToString(tree)).not.toThrow();
    });
});
