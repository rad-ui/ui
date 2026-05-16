import React from 'react';
import Select from '../Select';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Select',
    component: Select
} as any;

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
                            <Select.Group>
                                <Select.Item value="apple"> <Select.Indicator />Apple</Select.Item>
                                <Select.Item value="banana"> <Select.Indicator />Banana</Select.Item>
                                <Select.Item value="orange"> <Select.Indicator />Orange</Select.Item>
                                <Select.Item value="grape"> <Select.Indicator />Grape</Select.Item>
                            </Select.Group>
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
                        <Select.Group>
                            <Select.Item value="apple"> <Select.Indicator />Apple</Select.Item>
                            <Select.Item value="banana"> <Select.Indicator />Banana</Select.Item>
                            <Select.Item value="orange"> <Select.Indicator />Orange</Select.Item>
                            <Select.Item value="grape"> <Select.Indicator />Grape</Select.Item>
                        </Select.Group>
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
                        <Select.Group>
                            <Select.Item value="apple">Apple</Select.Item>
                            <Select.Item value="banana">Banana</Select.Item>
                            <Select.Item value="orange" disabled>Orange (Sold Out)</Select.Item>
                            <Select.Item value="grape">Grape</Select.Item>
                            <Select.Item value="pear" disabled>Pear (Sold Out)</Select.Item>
                        </Select.Group>
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
                        <Select.Group>
                            <Select.Item value="react">React</Select.Item>
                            <Select.Item value="angular">Angular</Select.Item>
                            <Select.Item value="vue">Vue</Select.Item>
                            <Select.Item value="svelte">Svelte</Select.Item>
                        </Select.Group>
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
                            <Select.Group>
                                <Select.Item value="red">Red</Select.Item>
                                <Select.Item value="green">Green</Select.Item>
                                <Select.Item value="blue">Blue</Select.Item>
                                <Select.Item value="yellow">Yellow</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </div>

                <div className="w-[240px]">
                    <Select.Root>
                        <Select.Trigger>
                            <span>Select a size</span>
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="sm">Small</Select.Item>
                                <Select.Item value="md">Medium</Select.Item>
                                <Select.Item value="lg">Large</Select.Item>
                                <Select.Item value="xl">Extra Large</Select.Item>
                            </Select.Group>
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
                        <Select.Group>
                            <Select.Item value='option1'>Option 1</Select.Item>
                            <Select.Item value='option2'>Option 2</Select.Item>
                            <Select.Item value='option3'>Option 3</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </div>

            <div className='mt-32'>
                <p className='text-gray-950'>Value: {value}</p>
            </div>
        </SandboxEditor>
    );
};

export const GroupExample = () => {
    return (
        <SandboxEditor className="min-h-[520px]">
            <div className="w-[260px]">
                <Select.Root defaultValue="fruit-grapes">
                    <Select.Trigger>
                        Select an option
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group role="group" aria-labelledby="select-fruits-label">
                            <div id="select-fruits-label" className="rad-ui-select-label">Fruits</div>
                            <Select.Item value="fruit-apple"><Select.Indicator />Apple</Select.Item>
                            <Select.Item value="fruit-banana"><Select.Indicator />Banana</Select.Item>
                            <Select.Item value="fruit-blueberry"><Select.Indicator />Blueberry</Select.Item>
                            <Select.Item value="fruit-grapes"><Select.Indicator />Grapes</Select.Item>
                            <Select.Item value="fruit-pineapple"><Select.Indicator />Pineapple</Select.Item>
                            <Select.Item value="fruit-watermelon"><Select.Indicator />Watermelon</Select.Item>
                        </Select.Group>

                        <Select.Group role="group" aria-labelledby="select-vegetables-label">
                            <div id="select-vegetables-label" className="rad-ui-select-label">Vegetables</div>
                            <Select.Item value="vegetable-carrot"><Select.Indicator />Carrot</Select.Item>
                            <Select.Item value="vegetable-cucumber"><Select.Indicator />Cucumber</Select.Item>
                            <Select.Item value="vegetable-spinach"><Select.Indicator />Spinach</Select.Item>
                            <Select.Item value="vegetable-tomato"><Select.Indicator />Tomato</Select.Item>
                            <Select.Item value="vegetable-zucchini"><Select.Indicator />Zucchini</Select.Item>
                        </Select.Group>

                        <Select.Group role="group" aria-labelledby="select-drinks-label">
                            <div id="select-drinks-label" className="rad-ui-select-label">Drinks</div>
                            <Select.Item value="drink-coffee"><Select.Indicator />Coffee</Select.Item>
                            <Select.Item value="drink-green-tea"><Select.Indicator />Green Tea</Select.Item>
                            <Select.Item value="drink-lemonade"><Select.Indicator />Lemonade</Select.Item>
                            <Select.Item value="drink-sparkling-water"><Select.Indicator />Sparkling Water</Select.Item>
                        </Select.Group>

                        <Select.Group role="group" aria-labelledby="select-desserts-label">
                            <div id="select-desserts-label" className="rad-ui-select-label">Desserts</div>
                            <Select.Item value="dessert-brownie"><Select.Indicator />Brownie</Select.Item>
                            <Select.Item value="dessert-cheesecake"><Select.Indicator />Cheesecake</Select.Item>
                            <Select.Item value="dessert-ice-cream"><Select.Indicator />Ice Cream</Select.Item>
                            <Select.Item value="dessert-pudding"><Select.Indicator />Pudding</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </div>
        </SandboxEditor>
    );
};

export const LongGroupedList = () => {
    return (
        <SandboxEditor className="min-h-[620px]">
            <div className="w-[280px]">
                <Select.Root>
                    <Select.Trigger>
                        Pick an item
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group role="group" aria-labelledby="select-citrus-label">
                            <div id="select-citrus-label" className="rad-ui-select-label">Citrus</div>
                            <Select.Item value="citrus-blood-orange"><Select.Indicator />Blood Orange</Select.Item>
                            <Select.Item value="citrus-grapefruit"><Select.Indicator />Grapefruit</Select.Item>
                            <Select.Item value="citrus-lemon"><Select.Indicator />Lemon</Select.Item>
                            <Select.Item value="citrus-lime"><Select.Indicator />Lime</Select.Item>
                            <Select.Item value="citrus-mandarin"><Select.Indicator />Mandarin</Select.Item>
                            <Select.Item value="citrus-orange"><Select.Indicator />Orange</Select.Item>
                        </Select.Group>

                        <Select.Group role="group" aria-labelledby="select-berries-label">
                            <div id="select-berries-label" className="rad-ui-select-label">Berries</div>
                            <Select.Item value="berry-blackberry"><Select.Indicator />Blackberry</Select.Item>
                            <Select.Item value="berry-blueberry"><Select.Indicator />Blueberry</Select.Item>
                            <Select.Item value="berry-cranberry"><Select.Indicator />Cranberry</Select.Item>
                            <Select.Item value="berry-raspberry"><Select.Indicator />Raspberry</Select.Item>
                            <Select.Item value="berry-strawberry"><Select.Indicator />Strawberry</Select.Item>
                        </Select.Group>

                        <Select.Group role="group" aria-labelledby="select-stone-fruit-label">
                            <div id="select-stone-fruit-label" className="rad-ui-select-label">Stone Fruit</div>
                            <Select.Item value="stone-apricot"><Select.Indicator />Apricot</Select.Item>
                            <Select.Item value="stone-cherry"><Select.Indicator />Cherry</Select.Item>
                            <Select.Item value="stone-nectarine"><Select.Indicator />Nectarine</Select.Item>
                            <Select.Item value="stone-peach"><Select.Indicator />Peach</Select.Item>
                            <Select.Item value="stone-plum"><Select.Indicator />Plum</Select.Item>
                        </Select.Group>

                        <Select.Group role="group" aria-labelledby="select-melons-label">
                            <div id="select-melons-label" className="rad-ui-select-label">Melons</div>
                            <Select.Item value="melon-cantaloupe"><Select.Indicator />Cantaloupe</Select.Item>
                            <Select.Item value="melon-honeydew"><Select.Indicator />Honeydew</Select.Item>
                            <Select.Item value="melon-watermelon"><Select.Indicator />Watermelon</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </div>
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
                <div className="w-[260px]">
                    <Select.Root collisionBoundary={container}>
                        <Select.Trigger>
                            Scroll test
                        </Select.Trigger>
                        <Select.Portal container={container}>
                            <Select.Content>
                                <Select.Group>
                                    <Select.Item value="alpha"><Select.Indicator />Alpha</Select.Item>
                                    <Select.Item value="bravo"><Select.Indicator />Bravo</Select.Item>
                                    <Select.Item value="charlie"><Select.Indicator />Charlie</Select.Item>
                                    <Select.Item value="delta"><Select.Indicator />Delta</Select.Item>
                                    <Select.Item value="echo"><Select.Indicator />Echo</Select.Item>
                                    <Select.Item value="foxtrot"><Select.Indicator />Foxtrot</Select.Item>
                                    <Select.Item value="golf"><Select.Indicator />Golf</Select.Item>
                                    <Select.Item value="hotel"><Select.Indicator />Hotel</Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                </div>
                <div className="h-[520px]" />
            </div>
        </SandboxEditor>
    );
};
