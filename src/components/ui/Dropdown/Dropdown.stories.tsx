import Dropdown from '~/components/ui/Dropdown/Dropdown';
import {Meta} from '@storybook/react/*';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

const placeholderWords= ['Eternity', 'Wisdom', 'Truth', 'Love', 'Freedom', 'Serenity', 'Hope', 'Courage', 'Grace', 'Harmony', 'Solitude', 'Enlightenment', 'Peace', 'Joy', 'Unity', 'Transcendence', 'Mystery', 'Compassion', 'Faith', 'Destiny'].map((v) => (<div key={v}>{v}</div>));

const meta: Meta<typeof Dropdown['Root']> = {
    component: Dropdown.Root,
    title: 'UI/Input/Dropdown',
};

export default meta;

export const DefaultTrigger= () => {
    return (
        <section>
            <SandboxEditor>
                <Dropdown.Root>
                    <Dropdown.Trigger/>

                    <Dropdown.Content>
                        {placeholderWords}
                    </Dropdown.Content>
                </Dropdown.Root>
            </SandboxEditor>
        </section>
    );
};

export const Styled = () => {
    return (
        <section>
            <SandboxEditor>
                <Dropdown.Root defaultOpen={true}>
                    <Dropdown.Trigger className='p-3 border border-red-500 rounded-lg'>
                        Toggle
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <div className='border p-4 rounded-lg mt-2 border-red-600'>
                        This is an example
                        </div>
                    </Dropdown.Content>
                </Dropdown.Root>
            </SandboxEditor>
        </section>
    );
};
