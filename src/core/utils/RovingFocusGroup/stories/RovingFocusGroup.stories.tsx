import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

import RovingFocusGroup from '../index';

import Button from '~/components/ui/Button/Button';

// Define args type to fix linter error
type StoryArgs = {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Utils/RovingFocusGroup',
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
        orientation: 'horizontal',
        loop: true
    }
};

export const Vertical = {
    args: {
        orientation: 'vertical',
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
                    <RovingFocusGroup.Root orientation="vertical" loop={true}>
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
                        <RovingFocusGroup.Root orientation="horizontal" loop={true}>
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

// Story demonstrating the disabled state functionality
export const DisabledItems = {
    render: () => (
        <SandboxEditor className="space-y-8 bg-gray-50">
            <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                <h2 className="text-lg font-semibold mb-2">Disabled Items Demonstration</h2>
                <p className="mb-1">This example shows how disabled buttons are automatically skipped during keyboard navigation.</p>
                <p className="mb-1"><strong>Instructions:</strong> Use arrow keys, Home, and End to navigate. Notice how disabled buttons are skipped.</p>
                <p className="text-sm text-gray-600">Simply use the standard disabled attribute on your buttons, inputs, or other elements.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-md font-medium mb-2">Horizontal Navigation with Disabled Items</h3>
                    <RovingFocusGroup.Root orientation="horizontal" loop={true}>
                        <RovingFocusGroup.Group className="border border-blue-500 p-4">
                            <div className="flex gap-3">
                                <RovingFocusGroup.Item>
                                    <Button>Item 1</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button disabled className="opacity-50 cursor-not-allowed">Disabled Item</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Item 3</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button disabled className="opacity-50 cursor-not-allowed">Disabled Item</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Item 5</Button>
                                </RovingFocusGroup.Item>
                            </div>
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                </div>

                <div>
                    <h3 className="text-md font-medium mb-2">Vertical Navigation with Disabled Items</h3>
                    <div className="flex gap-8">
                        <div>
                            <h4 className="text-sm font-medium mb-2">With looping enabled</h4>
                            <RovingFocusGroup.Root orientation="vertical" loop={true}>
                                <RovingFocusGroup.Group className="border border-green-500 p-4">
                                    <div className="flex flex-col gap-2">
                                        <RovingFocusGroup.Item>
                                            <Button>First Item</Button>
                                        </RovingFocusGroup.Item>
                                        <RovingFocusGroup.Item>
                                            <Button disabled className="opacity-50 cursor-not-allowed">Disabled</Button>
                                        </RovingFocusGroup.Item>
                                        <RovingFocusGroup.Item>
                                            <Button>Middle Item</Button>
                                        </RovingFocusGroup.Item>
                                        <RovingFocusGroup.Item>
                                            <Button disabled className="opacity-50 cursor-not-allowed">Disabled</Button>
                                        </RovingFocusGroup.Item>
                                        <RovingFocusGroup.Item>
                                            <Button>Last Item</Button>
                                        </RovingFocusGroup.Item>
                                    </div>
                                </RovingFocusGroup.Group>
                            </RovingFocusGroup.Root>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-2">With looping disabled</h4>
                            <RovingFocusGroup.Root orientation="vertical" loop={false}>
                                <RovingFocusGroup.Group className="border border-red-500 p-4">
                                    <div className="flex flex-col gap-2">
                                        <RovingFocusGroup.Item>
                                            <Button>First Item</Button>
                                        </RovingFocusGroup.Item>
                                        <RovingFocusGroup.Item>
                                            <Button disabled className="opacity-50 cursor-not-allowed">Disabled</Button>
                                        </RovingFocusGroup.Item>
                                        <RovingFocusGroup.Item>
                                            <Button>Middle Item</Button>
                                        </RovingFocusGroup.Item>
                                        <RovingFocusGroup.Item>
                                            <Button disabled className="opacity-50 cursor-not-allowed">Disabled</Button>
                                        </RovingFocusGroup.Item>
                                        <RovingFocusGroup.Item>
                                            <Button>Last Item</Button>
                                        </RovingFocusGroup.Item>
                                    </div>
                                </RovingFocusGroup.Group>
                            </RovingFocusGroup.Root>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                <h3 className="text-md font-medium mb-2">Home/End Key Navigation</h3>
                <p className="text-sm text-gray-600">Press Home to jump to the first enabled item, End to jump to the last enabled item.</p>
                <p className="text-sm text-gray-600 mt-1">On Mac, use Fn+Left Arrow for Home and Fn+Right Arrow for End.</p>
            </div>
        </SandboxEditor>
    )
};

// Story demonstrating the ARIA roles and attributes for screen reader accessibility
export const AccessibilityDemo = {
    render: () => (
        <SandboxEditor className="space-y-8 bg-gray-50">
            <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                <h2 className="text-lg font-semibold mb-2">Screen Reader Accessibility</h2>
                <p className="mb-1">This example demonstrates ARIA roles and attributes for screen reader accessibility.</p>
                <p className="mb-1"><strong>Features:</strong> Proper ARIA roles, labels, and states for screen readers.</p>
                <p className="text-sm text-gray-600">The component uses listbox/option pattern with aria-selected state.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-md font-medium mb-2">ARIA Labeled Navigation Example</h3>
                    <RovingFocusGroup.Root
                        orientation="horizontal"
                        loop={true}
                        aria-label="Main navigation menu"
                        className="rounded-md border border-blue-500 p-4"
                    >
                        <RovingFocusGroup.Group
                            className="flex gap-3"
                            aria-label="Primary actions"
                        >
                            <RovingFocusGroup.Item aria-label="Dashboard view">
                                <Button>Dashboard</Button>
                            </RovingFocusGroup.Item>
                            <RovingFocusGroup.Item aria-label="User profile settings">
                                <Button>Profile</Button>
                            </RovingFocusGroup.Item>
                            <RovingFocusGroup.Item aria-label="System settings">
                                <Button>Settings</Button>
                            </RovingFocusGroup.Item>
                            <RovingFocusGroup.Item>
                                <Button disabled className="opacity-50">Admin (Disabled)</Button>
                            </RovingFocusGroup.Item>
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                </div>

                <div>
                    <h3 className="text-md font-medium mb-2">ARIA Attributes Explained</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm border border-gray-200 p-4 rounded-md">
                        <div className="font-semibold">Root Component</div>
                        <div>role="listbox", aria-orientation, aria-label</div>

                        <div className="font-semibold">Group Component</div>
                        <div>role="group", aria-label</div>

                        <div className="font-semibold">Item Component</div>
                        <div>role="option", aria-selected, aria-disabled</div>

                        <div className="font-semibold">Navigation</div>
                        <div>Arrow keys, Home/End, with proper ARIA states</div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                <h3 className="text-md font-medium mb-2">Screen Reader Testing Instructions</h3>
                <p className="text-sm text-gray-600">Use VoiceOver (Mac) or NVDA/JAWS (Windows) to test the component.</p>
                <p className="text-sm text-gray-600 mt-1">Tab to the group, then use arrow keys to navigate between options.</p>
                <p className="text-sm text-gray-600 mt-1">The screen reader should announce:</p>
                <ul className="list-disc pl-5 text-sm text-gray-600 mt-1">
                    <li>When you enter the navigation menu</li>
                    <li>The name of each option as you navigate</li>
                    <li>The selected state of the focused option</li>
                    <li>When an option is disabled</li>
                </ul>
            </div>
        </SandboxEditor>
    )
};

// Story demonstrating the disableTabIndexing functionality
export const DisableTabIndexing = {
    render: () => (
        <SandboxEditor className="space-y-8 bg-gray-50">
            <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                <h2 className="text-lg font-semibold mb-2">Disable Tab Indexing Demonstration</h2>
                <p className="mb-1">This example shows how <code>disableTabIndexing</code> affects keyboard navigation behavior.</p>
                <p className="mb-1"><strong>Normal behavior:</strong> Only one item has tabindex="0", others have tabindex="-1".</p>
                <p className="mb-1"><strong>With disableTabIndexing:</strong> All items maintain their original tabindex values.</p>
                <p className="text-sm text-gray-600">Useful when you want to preserve existing tab order while still enabling arrow key navigation.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-md font-medium mb-2">Normal Tab Indexing (Default Behavior)</h3>
                    <p className="text-sm text-gray-600 mb-2">Only the focused item has tabindex="0", others have tabindex="-1"</p>
                    <RovingFocusGroup.Root orientation="horizontal" loop={true}>
                        <RovingFocusGroup.Group className="border border-blue-500 p-4">
                            <div className="flex gap-3">
                                <RovingFocusGroup.Item>
                                    <Button>Item 1</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Item 2</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Item 3</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Item 4</Button>
                                </RovingFocusGroup.Item>
                            </div>
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                    <p className="text-xs text-gray-500 mt-2">Try tabbing - only one item will be focusable at a time</p>
                </div>

                <div>
                    <h3 className="text-md font-medium mb-2">Disabled Tab Indexing</h3>
                    <p className="text-sm text-gray-600 mb-2">All items maintain their original tabindex values</p>
                    <RovingFocusGroup.Root orientation="horizontal" loop={true} disableTabIndexing={true}>
                        <RovingFocusGroup.Group className="border border-green-500 p-4">
                            <div className="flex gap-3">
                                <RovingFocusGroup.Item>
                                    <Button>Item 1</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Item 2</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Item 3</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button>Item 4</Button>
                                </RovingFocusGroup.Item>
                            </div>
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                    <p className="text-xs text-gray-500 mt-2">Try tabbing - all items remain in the normal tab order</p>
                </div>

                <div>
                    <h3 className="text-md font-medium mb-2">Mixed Tab Index Values</h3>
                    <p className="text-sm text-gray-600 mb-2">Items with different tabindex values maintain their original values</p>
                    <RovingFocusGroup.Root orientation="horizontal" loop={true} disableTabIndexing={true}>
                        <RovingFocusGroup.Group className="border border-purple-500 p-4">
                            <div className="flex gap-3">
                                <RovingFocusGroup.Item>
                                    <Button tabIndex={0}>Tab 0</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button tabIndex={1}>Tab 1</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button tabIndex={2}>Tab 2</Button>
                                </RovingFocusGroup.Item>
                                <RovingFocusGroup.Item>
                                    <Button tabIndex={-1}>Tab -1</Button>
                                </RovingFocusGroup.Item>
                            </div>
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                    <p className="text-xs text-gray-500 mt-2">Arrow keys still work for navigation, but tab order is preserved</p>
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                <h3 className="text-md font-medium mb-2">Use Cases for disableTabIndexing</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li><strong>Form Navigation:</strong> When you want arrow keys to work but preserve the natural tab order for form submission</li>
                    <li><strong>Existing Tab Order:</strong> When components already have a carefully planned tab sequence</li>
                    <li><strong>Accessibility Compliance:</strong> When you need to maintain specific tab order for screen readers</li>
                    <li><strong>Mixed Focus Management:</strong> When some items should be focusable and others shouldn't</li>
                </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                <h3 className="text-md font-medium mb-2">Testing Instructions</h3>
                <p className="text-sm text-gray-600 mb-2"><strong>Normal Mode:</strong></p>
                <ul className="list-disc pl-5 text-sm text-gray-600 mb-3">
                    <li>Tab to the group - only one item will be focusable</li>
                    <li>Use arrow keys to navigate between items</li>
                    <li>Notice that tabindex changes as you navigate</li>
                </ul>
                <p className="text-sm text-gray-600 mb-2"><strong>Disabled Tab Indexing Mode:</strong></p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>Tab through all items in their natural order</li>
                    <li>Use arrow keys to navigate - works the same as normal mode</li>
                    <li>Notice that tabindex values remain unchanged</li>
                </ul>
            </div>
        </SandboxEditor>
    )
};
