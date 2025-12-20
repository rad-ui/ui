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
            <div className="w-[240px]">
                <Combobox.Root>
                    <Combobox.Trigger>
                        <span>Combobox an option</span>
                    </Combobox.Trigger>
                    <Combobox.Portal>
                        <Combobox.Content>
                            <Combobox.Group>
                                <Combobox.Item value="apple"> <Combobox.Indicator />Apple</Combobox.Item>
                                <Combobox.Item value="banana"> <Combobox.Indicator />Banana</Combobox.Item>
                                <Combobox.Item value="orange"> <Combobox.Indicator />Orange</Combobox.Item>
                                <Combobox.Item value="grape"> <Combobox.Indicator />Grape</Combobox.Item>
                            </Combobox.Group>
                        </Combobox.Content>
                    </Combobox.Portal>
                </Combobox.Root>
            </div>
        </SandboxEditor>
    );
};

export const BasicPortal = () => {
    return (
        <SandboxEditor>
            <div className="w-[240px]">
                <Combobox.Root>
                    <Combobox.Trigger>
                        <span>Combobox an option</span>
                    </Combobox.Trigger>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value="apple"> <Combobox.Indicator />Apple</Combobox.Item>
                            <Combobox.Item value="banana"> <Combobox.Indicator />Banana</Combobox.Item>
                            <Combobox.Item value="orange"> <Combobox.Indicator />Orange</Combobox.Item>
                            <Combobox.Item value="grape"> <Combobox.Indicator />Grape</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Root>
            </div>
        </SandboxEditor>
    );
};

export const WithDisabledOptions = () => {
    return (
        <SandboxEditor>
            <div className="w-[240px]">
                <Combobox.Root>
                    <Combobox.Trigger>
                        <span>Combobox a fruit</span>
                    </Combobox.Trigger>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value="apple">Apple</Combobox.Item>
                            <Combobox.Item value="banana">Banana</Combobox.Item>
                            <Combobox.Item value="orange" disabled>Orange (Sold Out)</Combobox.Item>
                            <Combobox.Item value="grape">Grape</Combobox.Item>
                            <Combobox.Item value="pear" disabled>Pear (Sold Out)</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Root>
            </div>
        </SandboxEditor>
    );
};

export const WithInitialValue = () => {
    return (
        <SandboxEditor>
            <div className="w-[240px]">
                <Combobox.Root defaultValue="react">
                    <Combobox.Trigger>
                        <span>Favorite Framework</span>
                    </Combobox.Trigger>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value="react">React</Combobox.Item>
                            <Combobox.Item value="angular">Angular</Combobox.Item>
                            <Combobox.Item value="vue">Vue</Combobox.Item>
                            <Combobox.Item value="svelte">Svelte</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Root>
            </div>
        </SandboxEditor>
    );
};

export const MultipleComboboxs = () => {
    return (
        <SandboxEditor>
            <div className="flex flex-col gap-4">
                <div className="w-[240px]">
                    <Combobox.Root>
                        <Combobox.Trigger>
                            <span>Combobox a color</span>
                        </Combobox.Trigger>
                        <Combobox.Content>
                            <Combobox.Group>
                                <Combobox.Item value="red">Red</Combobox.Item>
                                <Combobox.Item value="green">Green</Combobox.Item>
                                <Combobox.Item value="blue">Blue</Combobox.Item>
                                <Combobox.Item value="yellow">Yellow</Combobox.Item>
                            </Combobox.Group>
                        </Combobox.Content>
                    </Combobox.Root>
                </div>

                <div className="w-[240px]">
                    <Combobox.Root>
                        <Combobox.Trigger>
                            <span>Combobox a size</span>
                        </Combobox.Trigger>
                        <Combobox.Content>
                            <Combobox.Group>
                                <Combobox.Item value="sm">Small</Combobox.Item>
                                <Combobox.Item value="md">Medium</Combobox.Item>
                                <Combobox.Item value="lg">Large</Combobox.Item>
                                <Combobox.Item value="xl">Extra Large</Combobox.Item>
                            </Combobox.Group>
                        </Combobox.Content>
                    </Combobox.Root>
                </div>
            </div>
        </SandboxEditor>
    );
};

export const ControlledExample = () => {
    const [value, setValue] = React.useState('');
    return (
        <SandboxEditor>
            <div className="w-[240px]">
                <Combobox.Root defaultValue="option1" value={value} onValueChange={setValue}>
                    <Combobox.Trigger>
            helo
                    </Combobox.Trigger>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value='option1'>Option 1</Combobox.Item>
                            <Combobox.Item value='option2'>Option 2</Combobox.Item>
                            <Combobox.Item value='option3'>Option 3</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Root>
            </div>

            <div className='mt-32'>
                <p className='text-gray-950'>Value: {value}</p>
            </div>
        </SandboxEditor>
    );
};

export const GroupExample = () => {
    return (
        <SandboxEditor>
            <Combobox.Root>
                <Combobox.Trigger>
                    Combobox an option
                </Combobox.Trigger>
                <Combobox.Content>
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
