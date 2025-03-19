import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

import RovingFocusGroup from '../index';

import Button from '~/components/ui/Button/Button';

// Define args type to fix linter error
type StoryArgs = {
    direction?: 'horizontal' | 'vertical';
    loop?: boolean;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/RovingFocusGroup',
    component: RovingFocusGroup,
    render: (args: StoryArgs) => <>
        <SandboxEditor className="space-y-2">
            <RovingFocusGroup.Root className="flex items-center gap-2" {...args}>
                <RovingFocusGroup.Group className="flex gap-2 border border-green-500 p-2" >
                    <RovingFocusGroup.Item>
                        <Button>Button 1 Group 1</Button>
                    </RovingFocusGroup.Item>
                    <RovingFocusGroup.Item>
                        <Button>Button 2 Group 1</Button>
                    </RovingFocusGroup.Item>
                    <RovingFocusGroup.Item>
                        <a href="#" className="border border-green-500">Link 1 Group 1</a>
                    </RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
                <RovingFocusGroup.Group className="flex gap-2 border border-red-500 p-2" >
                    <RovingFocusGroup.Item>
                        <Button>Button 1 Group 2</Button>
                    </RovingFocusGroup.Item>
                    <RovingFocusGroup.Item>
                        <Button>Button 2 Group 2</Button>
                    </RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </SandboxEditor>
    </>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Horizontal = {
    args: {
        direction: 'horizontal',
        loop: true
    }
};

export const Vertical = {
    args: {
        direction: 'vertical',
        loop: true
    }
};

// Story demonstrating the keyboard navigation behavior
export const KeyboardNavigation = {
    render: () => (
        <SandboxEditor className="space-y-8 bg-gray-50">
            <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                <h2 className="text-lg font-semibold mb-2">Keyboard Navigation Demonstration</h2>
                <p className="mb-1">Try using arrow keys to navigate between buttons in both examples below.</p>
                <p className="mb-1"><strong>Behavior:</strong> Arrow keys navigate between buttons without scrolling the page.</p>
                <p className="text-sm text-gray-600">The component prevents default browser scrolling by calling preventDefault() on arrow key events.</p>
            </div>

            <div className="space-y-6 bg-gray-50">
                <div>
                    <h3 className="text-md font-medium mb-2">Vertical Navigation (Up/Down keys)</h3>
                    <RovingFocusGroup.Root direction="vertical" loop={true}>
                        <RovingFocusGroup.Group className="border border-blue-500 p-2">
                            <div className="flex flex-col gap-2">
                                <RovingFocusGroup.Item>
                                    <Button>Button 1</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Button 2</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Button 3</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Button 4</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Button 5</Button>
                                </RovingFocusGroup.Item>
                            </div>
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                </div>

                <div>
                    <h3 className="text-md font-medium mb-2">Horizontal Navigation (Left/Right keys)</h3>
                    <p className="text-sm text-gray-600 mb-2">This container has horizontally scrollable content but arrow keys won't trigger scrolling</p>
                    <div className="overflow-x-auto pb-4 border border-gray-200 max-w-[500px]">
                        <RovingFocusGroup.Root direction="horizontal" loop={true}>
                            <RovingFocusGroup.Group className="border border-green-500 p-2 min-w-max">
                                <div className="flex gap-2">
                                    <RovingFocusGroup.Item>
                                        <Button>Button A</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button B</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button C</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button D</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button E</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button F</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button G</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button H</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button I</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button J</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button K</Button>
                                    </RovingFocusGroup.Item>
                                    <RovingFocusGroup.Item>
                                        <Button>Button L</Button>
                                    </RovingFocusGroup.Item>
                                </div>
                            </RovingFocusGroup.Group>
                        </RovingFocusGroup.Root>
                    </div>
                </div>
            </div>

            {/* Add empty space to make the page scrollable */}
            <div className="h-[600px] bg-gray-100" />
            <div className="rounded">
                <p>This content is at the bottom of the page to demonstrate that even with scrollable content, arrow keys won't scroll the page.</p>
            </div>
        </SandboxEditor>
    )
};
