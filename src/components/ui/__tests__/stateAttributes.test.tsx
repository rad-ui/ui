import React from 'react';
import { act, render } from '@testing-library/react';
import { componentTrees } from '../tests/componentTrees';
import Toggle from '../Toggle/Toggle';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Popover from '../Popover/Popover';
import Tooltip from '../Tooltip/Tooltip';
import HoverCard from '../HoverCard/HoverCard';
import Select from '../Select/Select';
import Disclosure from '../Disclosure/Disclosure';

// Every element with a `data-state` that has a boolean form also carries it:
// open -> data-open, checked -> data-checked, on -> data-pressed, and so on.

const COMPANIONS: Record<string, string> = {
    open: 'data-open',
    closed: 'data-closed',
    checked: 'data-checked',
    unchecked: 'data-unchecked',
    indeterminate: 'data-indeterminate',
    on: 'data-pressed',
    complete: 'data-complete',
    dragging: 'data-dragging',
    loading: 'data-loading'
};

const missing = (root: ParentNode) => Array.from(root.querySelectorAll<HTMLElement>('[data-state]'))
    .filter((element) => {
        const attribute = COMPANIONS[element.getAttribute('data-state')!];
        return attribute && !element.hasAttribute(attribute);
    })
    .map((element) => [element.tagName.toLowerCase(), element.getAttribute('role'), element.className, element.getAttribute('data-slot'), element.getAttribute('data-state')].filter(Boolean).join(' '));

const extraTrees: [string, () => React.ReactElement][] = [
    ['Toggle', () => <Toggle defaultPressed aria-label="Bold">B</Toggle>],
    ['ToggleGroup', () => <ToggleGroup.Root type="single" defaultValue={['a']}><ToggleGroup.Item value="a">A</ToggleGroup.Item><ToggleGroup.Item value="b">B</ToggleGroup.Item></ToggleGroup.Root>],
    ['DropdownMenu', () => (
        <DropdownMenu.Root open>
            <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content>
                    <DropdownMenu.CheckboxItem checked label="Wrap">Wrap<DropdownMenu.ItemIndicator>✓</DropdownMenu.ItemIndicator></DropdownMenu.CheckboxItem>
                    <DropdownMenu.RadioGroup value="a"><DropdownMenu.RadioItem value="a" label="A">A</DropdownMenu.RadioItem></DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )],
    ['Popover', () => <Popover.Root open><Popover.Trigger>P</Popover.Trigger><Popover.Portal><Popover.Content>Body</Popover.Content></Popover.Portal></Popover.Root>],
    ['Tooltip', () => <Tooltip.Root open><Tooltip.Trigger>T</Tooltip.Trigger><Tooltip.Content>Tip</Tooltip.Content></Tooltip.Root>],
    ['HoverCard', () => <HoverCard.Root open><HoverCard.Trigger>H</HoverCard.Trigger><HoverCard.Portal><HoverCard.Content>Card</HoverCard.Content></HoverCard.Portal></HoverCard.Root>],
    ['Select', () => <Select.Root open defaultValue="a"><Select.Trigger><Select.Value /></Select.Trigger><Select.Portal><Select.Content><Select.Item value="a">A</Select.Item></Select.Content></Select.Portal></Select.Root>],
    ['Disclosure', () => <Disclosure.Root defaultValue={['a']}><Disclosure.Item value="a"><Disclosure.Trigger>T</Disclosure.Trigger><Disclosure.Content>C</Disclosure.Content></Disclosure.Item></Disclosure.Root>]
];

describe('boolean state attributes', () => {
    test.each([...componentTrees, ...extraTrees])('%s', async(_name, make) => {
        const { unmount } = render(make());
        await act(async() => { await new Promise((resolve) => setTimeout(resolve, 0)); });
        expect(missing(document.body)).toEqual([]);
        unmount();
    });
});
