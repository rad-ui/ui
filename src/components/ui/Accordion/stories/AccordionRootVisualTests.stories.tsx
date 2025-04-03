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
            <Accordion.Content>
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
                        <Accordion.Content>
                            abc
                        </Accordion.Content>
                    </Accordion.Item>
                </span>
            </Accordion.Root>
        </SandboxEditor>
    );
};

export const AsChild = AsChildTemplate.bind({});
