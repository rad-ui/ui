import Accordion from '../Accordion';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/Accordion/AccordionItem',
    component: 'AccordionItem'
};

const DisabledTemplate: Story = (args) => <SandboxEditor>
    <Accordion.Root>
        <Accordion.Item value={'1'}>
            <Accordion.Trigger>
                Item 1
            </Accordion.Trigger>
            <Accordion.Content index={0}>
                        abc
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value={'2'} disabled>
            <Accordion.Trigger>
                Item 2
            </Accordion.Trigger>
            <Accordion.Content index={1}>
                        abc
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value={'3'}>
            <Accordion.Trigger>
                Item 3
            </Accordion.Trigger>
            <Accordion.Content index={2}>
                        abc
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</SandboxEditor>;

export const Disabled = DisabledTemplate.bind({});

const AsChildTemplate: Story = (args) => <SandboxEditor>
    <Accordion.Root>
        <Accordion.Item value={'1'} asChild>
            <span style={{ display: 'block' }}>
                <Accordion.Trigger >
                Trigger
                </Accordion.Trigger>
                <Accordion.Content index={0}>
                Content
                </Accordion.Content>
            </span>
        </Accordion.Item>
        <Accordion.Item value={'2'} asChild disabled>
            <span style={{ display: 'block' }}>
                <Accordion.Trigger >
                Trigger
                </Accordion.Trigger>
                <Accordion.Content index={0}>
                Content
                </Accordion.Content>
            </span>
        </Accordion.Item>
    </Accordion.Root>
</SandboxEditor>;

export const AsChild = AsChildTemplate.bind({});
