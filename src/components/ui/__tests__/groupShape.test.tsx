import React from 'react';
import { render } from '@testing-library/react';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import Toolbar from '../Toolbar/Toolbar';
import Accordion from '../Accordion/Accordion';
import Tabs from '../Tabs/Tabs';
import Disclosure from '../Disclosure/Disclosure';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import RadioGroup from '../RadioGroup/RadioGroup';

// #2301: a component's outer DOM (tags, roles, where role="group" sits) must not
// change with how many children the consumer passes.

const shape = (container: HTMLElement) => {
    const root = container.firstElementChild as HTMLElement;
    const describe = (element: Element | null) => element && `${element.tagName.toLowerCase()}[role=${element.getAttribute('role') ?? ''}]`;
    return [describe(root), describe(root.firstElementChild)];
};

const cases: [string, (count: number) => React.ReactElement][] = [
    ['ToggleGroup', (n) => <ToggleGroup.Root type="multiple">{['a', 'b'].slice(0, n).map((v) => <ToggleGroup.Item key={v} value={v}>{v}</ToggleGroup.Item>)}</ToggleGroup.Root>],
    ['Toolbar', (n) => <Toolbar.Root aria-label="Tools">{['a', 'b'].slice(0, n).map((v) => <Toolbar.Button key={v}>{v}</Toolbar.Button>)}</Toolbar.Root>],
    ['Accordion', (n) => <Accordion.Root type="single">{['a', 'b'].slice(0, n).map((v) => <Accordion.Item key={v} value={v}><Accordion.Header><Accordion.Trigger>{v}</Accordion.Trigger></Accordion.Header><Accordion.Content>{v}</Accordion.Content></Accordion.Item>)}</Accordion.Root>],
    ['Tabs', (n) => <Tabs.Root defaultValue="a"><Tabs.List>{['a', 'b'].slice(0, n).map((v) => <Tabs.Trigger key={v} value={v}>{v}</Tabs.Trigger>)}</Tabs.List></Tabs.Root>],
    ['Disclosure', (n) => <Disclosure.Root>{['a', 'b'].slice(0, n).map((v) => <Disclosure.Item key={v} value={v}><Disclosure.Trigger>{v}</Disclosure.Trigger><Disclosure.Content>{v}</Disclosure.Content></Disclosure.Item>)}</Disclosure.Root>],
    ['CheckboxGroup', (n) => <CheckboxGroup.Root name="f">{['a', 'b'].slice(0, n).map((v) => <CheckboxGroup.Label key={v}><CheckboxGroup.Trigger value={v}><CheckboxGroup.Indicator /></CheckboxGroup.Trigger>{v}</CheckboxGroup.Label>)}</CheckboxGroup.Root>],
    ['RadioGroup', (n) => <RadioGroup.Root aria-label="Plan">{['a', 'b'].slice(0, n).map((v) => <RadioGroup.Item key={v} value={v} aria-label={v}><RadioGroup.Indicator /></RadioGroup.Item>)}</RadioGroup.Root>]
];

describe('outer DOM does not depend on the child count', () => {
    test.each(cases)('%s', (_name, make) => {
        const one = render(make(1));
        const oneShape = shape(one.container);
        one.unmount();
        const two = render(make(2));
        expect(shape(two.container)).toEqual(oneShape);
    });
});
