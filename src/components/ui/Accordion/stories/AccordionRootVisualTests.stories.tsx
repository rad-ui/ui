import React from 'react';
import Accordion from '../Accordion';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { Story } from '@storybook/react';

export default {
    title: 'Components/Accordion/AccordionRoot',
    component: 'AccordionRoot'
};

const Template: Story = (args) => <SandboxEditor>
    <Accordion.Root>
        <Accordion.Item>
            <Accordion.Trigger>
                Hello
            </Accordion.Trigger>
            <Accordion.Content index={0}>
                        abc
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</SandboxEditor>;

export const Default = Template.bind({});
Default.args = {
    children: 'Accordion Root'
};

const AsChildTemplate: Story = (args) => {
    return (
        <SandboxEditor>
            <Accordion.Root asChild>
                <span>
                    <Accordion.Item>
                        <Accordion.Trigger>
                            Hello
                        </Accordion.Trigger>
                        <Accordion.Content index={0}>
                            abc
                        </Accordion.Content>
                    </Accordion.Item>
                </span>
            </Accordion.Root>
        </SandboxEditor>
    );
};

export const AsChild = AsChildTemplate.bind({});

const HorizontalTemplate: Story = (args) => {
    return (
        <SandboxEditor>
            <Accordion.Root orientation="horizontal">
                <Accordion.Item value={'1'}>
                    <Accordion.Trigger>
                        Item 1
                    </Accordion.Trigger>
                    <Accordion.Content index={0}>
                        abc
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value={'2'}>
                    <Accordion.Trigger>
                        Item 2
                    </Accordion.Trigger>
                    <Accordion.Content index={1}>
                        abc
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </SandboxEditor>
    );
};

export const Horizontal = HorizontalTemplate.bind({});

const LoopOffTemplate: Story = (args) => {
    return (
        <SandboxEditor>
            <Accordion.Root loop={false}>
                <Accordion.Item value={'1'}>
                    <Accordion.Trigger>
                        Item 1
                    </Accordion.Trigger>
                    <Accordion.Content index={0}>
                        abc
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value={'2'}>
                    <Accordion.Trigger>
                        Item 2
                    </Accordion.Trigger>
                    <Accordion.Content index={1}>
                        abc
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </SandboxEditor>
    );
};

export const LoopOff = LoopOffTemplate.bind({});
