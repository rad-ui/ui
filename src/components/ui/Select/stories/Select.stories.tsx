import React from 'react';
import Select from '../Select';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import SelectPrimitive from '~/core/primitives/Select/Select';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/Select',
    component: Select
};

export const Basic = () => {
    return (
        <SandboxEditor>
            <div className="w-[240px]">
                <Select.Root>
                    <Select.Trigger>
                        <span>Select an option</span>
                    </Select.Trigger>
                    <Select.Portal>
                        <Select.Content>
                            <Select.Item value="apple"> <Select.Indicator />Apple</Select.Item>
                            <Select.Item value="banana"> <Select.Indicator />Banana</Select.Item>
                            <Select.Item value="orange"> <Select.Indicator />Orange</Select.Item>
                            <Select.Item value="grape"> <Select.Indicator />Grape</Select.Item>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>
        </SandboxEditor>
    );
};

export const BasicPortal = () => {
    return (
        <SandboxEditor>
            <div className="w-[240px]">
                <Select.Root>
                    <Select.Trigger>
                        <span>Select an option</span>
                    </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="apple"> <Select.Indicator />Apple</Select.Item>
                            <Select.Item value="banana"> <Select.Indicator />Banana</Select.Item>
                            <Select.Item value="orange"> <Select.Indicator />Orange</Select.Item>
                            <Select.Item value="grape"> <Select.Indicator />Grape</Select.Item>
                        </Select.Content>
                </Select.Root>
            </div>
        </SandboxEditor>
    );
};

export const WithDisabledOptions = () => {
    return (
        <SandboxEditor>
            <div className="w-[240px]">
                <Select.Root>
                    <Select.Trigger>
                        <span>Select a fruit</span>
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="banana">Banana</Select.Item>
                        <Select.Item value="orange" disabled>Orange (Sold Out)</Select.Item>
                        <Select.Item value="grape">Grape</Select.Item>
                        <Select.Item value="pear" disabled>Pear (Sold Out)</Select.Item>
                    </Select.Content>
                </Select.Root>
            </div>
        </SandboxEditor>
    );
};

export const WithInitialValue = () => {
    return (
        <SandboxEditor>
            <div className="w-[240px]">
                <Select.Root defaultValue="react">
                    <Select.Trigger>
                        <span>Favorite Framework</span>
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="react">React</Select.Item>
                        <Select.Item value="angular">Angular</Select.Item>
                        <Select.Item value="vue">Vue</Select.Item>
                        <Select.Item value="svelte">Svelte</Select.Item>
                    </Select.Content>
                </Select.Root>
            </div>
        </SandboxEditor>
    );
};

export const MultipleSelects = () => {
    return (
        <SandboxEditor>
            <div className="flex flex-col gap-4">
                <div className="w-[240px]">
                    <Select.Root>
                        <Select.Trigger>
                            <span>Select a color</span>
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="red">Red</Select.Item>
                            <Select.Item value="green">Green</Select.Item>
                            <Select.Item value="blue">Blue</Select.Item>
                            <Select.Item value="yellow">Yellow</Select.Item>
                        </Select.Content>
                    </Select.Root>
                </div>

                <div className="w-[240px]">
                    <Select.Root>
                        <Select.Trigger>
                            <span>Select a size</span>
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="sm">Small</Select.Item>
                            <Select.Item value="md">Medium</Select.Item>
                            <Select.Item value="lg">Large</Select.Item>
                            <Select.Item value="xl">Extra Large</Select.Item>
                        </Select.Content>
                    </Select.Root>
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
                <Select.Root defaultValue="option1" value={value} onValueChange={setValue}>
                    <Select.Trigger>
            helo
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value='option1'>Option 1</Select.Item>
                        <Select.Item value='option2'>Option 2</Select.Item>
                        <Select.Item value='option3'>Option 3</Select.Item>
                    </Select.Content>
                </Select.Root>
            </div>

            <div className='mt-32'>
                <p className='text-gray-950'>Value: {value}</p>
            </div>
        </SandboxEditor>
    );
};
