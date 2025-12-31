import React from 'react';
import Combobox from '../Combobox';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/Combobox',
    component: Combobox
};

export const Basic = () => {
    return (
        <SandboxEditor>
            <Combobox.Root>
                <Combobox.Trigger>
                    Select an option
                </Combobox.Trigger>
                <Combobox.Content>
                    <Combobox.Search />
                    <Combobox.Group>
                        <Combobox.Item value="g1option 1">g1Option 1</Combobox.Item>
                        <Combobox.Item value="g1option 2">g1Option 2</Combobox.Item>
                        <Combobox.Item value="g1option 3">g1Option 3</Combobox.Item>
                    </Combobox.Group>

                    <Combobox.Group>
                        <Combobox.Item value="g2option 1">g2Option 1</Combobox.Item>
                        <Combobox.Item value="g2option 2">g2Option 2</Combobox.Item>
                        <Combobox.Item value="g2option 3">g2Option 3</Combobox.Item>
                    </Combobox.Group>
                </Combobox.Content>
            </Combobox.Root>
        </SandboxEditor>
    );
};
