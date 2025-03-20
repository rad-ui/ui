import Accordion from '../Accordion';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    decorators: [(Story) => (
        <SandboxEditor>
            <div>
                <div className="flex space-x-2 w-full flex-1">
                    <Story />
                </div>
            </div>
        </SandboxEditor>
    )]
};

export default meta;
type Story = StoryObj<any>;

// Create a sample Accordion using the composable API
const AccordionExample = () => {
    const items = [
        {
            title: 'The Matrix (1999)',
            content: <div>
                <ul>
                    <li>Summary: A hacker discovers the true nature of reality and his role in the war against its controllers.</li>
                    <li>Key Characters: Neo, Morpheus, Trinity, Agent Smith</li>
                    <li>Memorable Quote: "There is no spoon."</li>
                </ul>
            </div>
        },
        {
            title: 'The Dark Knight (2008)',
            content: <div>
                <ul>
                    <li>Summary: Batman faces his greatest challenge yet as the Joker wreaks havoc on Gotham City.</li>
                    <li>Key Characters: Batman, Joker, Harvey Dent, Alfred</li>
                    <li>Memorable Quote: "Why so serious?"</li>
                </ul>
            </div>
        },
        {
            title: 'Inception (2010)',
            content: <div>
                <ul>
                    <li>Summary: A thief who enters people's dreams to steal their secrets must plant an idea in someone's mind.</li>
                    <li>Key Characters: Cobb, Ariadne, Mal, Saito</li>
                    <li>Memorable Quote: "You mustn't be afraid to dream a little bigger, darling."</li>
                </ul>
            </div>
        },
        {
            title: 'The Shawshank Redemption (1994)',
            content: <div>
                <ul>
                    <li>Summary: A banker is wrongly convicted</li>
                    <li>Key Characters: Andy Dufresne, Red, Warden Norton, Tommy</li>
                    <li>Memorable Quote: "Get busy living or get busy dying."</li>
                </ul>
            </div>
        }
    ];

    return (
        <Accordion.Root>
            {items.map((item, index) => (
                <Accordion.Item value={index} key={index}>
                    <Accordion.Header>
                        <Accordion.Trigger>
                            {item.title}
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content index={index}>
                        {item.content}
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All: Story = {
    render: () => <AccordionExample />
};
