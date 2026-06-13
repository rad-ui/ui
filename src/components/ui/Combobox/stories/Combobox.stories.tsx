import React from 'react';
import Combobox from '../Combobox';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Combobox',
    component: Combobox
} as any;

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

export const ScrollCollisionVisualTest = () => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    return (
        <SandboxEditor className="min-h-[620px]">
            <div
                ref={setContainer}
                className="relative h-[360px] w-[420px] overflow-y-auto border border-[var(--rad-ui-border-default)] p-6"
            >
                <div className="h-[280px]" />
                <Combobox.Root collisionBoundary={container}>
                    <Combobox.Trigger>
                        Scroll test
                    </Combobox.Trigger>
                    <Combobox.Portal container={container}>
                        <Combobox.Content>
                            <Combobox.Search />
                            <Combobox.Group>
                                <Combobox.Item value="alpha">Alpha</Combobox.Item>
                                <Combobox.Item value="bravo">Bravo</Combobox.Item>
                                <Combobox.Item value="charlie">Charlie</Combobox.Item>
                                <Combobox.Item value="delta">Delta</Combobox.Item>
                                <Combobox.Item value="echo">Echo</Combobox.Item>
                                <Combobox.Item value="foxtrot">Foxtrot</Combobox.Item>
                                <Combobox.Item value="golf">Golf</Combobox.Item>
                                <Combobox.Item value="hotel">Hotel</Combobox.Item>
                            </Combobox.Group>
                        </Combobox.Content>
                    </Combobox.Portal>
                </Combobox.Root>
                <div className="h-[520px]" />
            </div>
        </SandboxEditor>
    );
};
