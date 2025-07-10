import React, { JSX } from 'react';
import Disclosure, { DisclosureProps } from '../Disclosure';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/Disclosure',
    component: Disclosure,
    render: (args: JSX.IntrinsicAttributes & DisclosureProps) => <SandboxEditor>

        <div>
            <Disclosure {...args} />
        </div>

    </SandboxEditor>
};

export const All = {
    args: {
        className: '',
        items: [
            {
                title: 'Why can\'t I access certain websites?',
                content: 'Clear your browser\'s cache and cookies.'
            },

            {
                title: 'Why do I keep getting disconnected from the network?',
                content: 'Ensure that your network drivers are up-to-date.'
            }
        ]
    }
};

const disclosureItems = [
    {
        title: 'Section 1',
        content: 'Content for section 1'
    },
    {
        title: 'Section 2',
        content: 'Content for section 2'
    }
];

export const Composed = () => {
    return <SandboxEditor>
        <Disclosure.Root>
            {disclosureItems.map((item) => (
                <Disclosure.Item key={item.title} value={0}>
                    <Disclosure.Trigger>
                        {item.title}
                    </Disclosure.Trigger>
                    <Disclosure.Content>
                        {item.content}
                    </Disclosure.Content>
                </Disclosure.Item>
            ))}
        </Disclosure.Root>

    </SandboxEditor>;
};
