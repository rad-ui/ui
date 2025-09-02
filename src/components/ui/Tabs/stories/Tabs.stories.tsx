import React, { useState, useEffect } from 'react';
import Tabs from '../Tabs';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';
// import { TabProps } from '../fragments/TabContent'; // Removed - not exported

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Tabs> = {
    title: 'WIP/Tabs',
    component: Tabs,
    decorators: [(Story) => (
        <SandboxEditor>
            <div>
                <Story />
            </div>
        </SandboxEditor>
    )]
};

export default meta;
type Story = StoryObj<any>;

const ArrowIcon = ({ className }: { className: string }) => {
    return <svg className={className} width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

// Create a composable Tabs example
const TabsExample = () => {
    // Create a custom Tabs component using the fragments

    const [activeTab, setActiveTab] = useState('meteora');

    const handleTabChange = (value: string) => {
        // console.log('tab', value);
        setActiveTab(value);
    };

    return (
        <div className="w-full my-4">

            {/* Using the actual Tabs composable API */}
            <div className="border  shadow rounded-md p-4">
                <Tabs.Root
                    defaultValue={activeTab}
                    onValueChange={handleTabChange}
                >
                    <Tabs.List>
                        <Tabs.Trigger value="meteora">Meteora (album)</Tabs.Trigger>
                        <Tabs.Trigger className="space-x-2" value="history">History <ArrowIcon className="w-4 h-4" /></Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="meteora">
                            Following the success of Hybrid Theory and Reanimation, Linkin Park spent a significant amount of time touring around the United States. The band members began to work on new material amidst their saturated schedule, spending a sliver of their free time in their tour bus\'s studio.[34] The band officially announced the production of a new studio album in December 2002, revealing their new work was inspired by the rocky region of Meteora in Greece, where numerous monasteries have been built on top of the rocks.[35] Meteora features a mixture of the band\'s nu metal and rap metal style with newer innovative effects, including the induction of a shakuhachi (a Japanese flute made of bamboo) and other instruments
                    </Tabs.Content>
                    <Tabs.Content value="history">
                            Linkin Park was founded by three high school friends: Mike Shinoda, Rob Bourdon, and Brad Delson.[6][7] The three attended Agoura High School in Agoura Hills, California, a suburb of Los Angeles.[6][7] After graduating from high school, the three began to take their musical interests more seriously, recruiting Joe Hahn, Dave "Phoenix" Farrell, and Mark Wakefield to perform in their band, then called Xero. Though limited in resources, the band began recording and producing songs within Shinoda\'s makeshift bedroom studio in 1996, resulting in a four-track demo album, entitled Xero, released in November 1997.[6][8] Delson introduced the band to Jeff Blue, the vice president of A&R for Zomba Music, whom he had interned for in college.[9][10] Blue offered the band constructive criticism to catch the attention of record labels. Blue himself was impressed with Xero after watching them play a live show in 1998, but believed the band needed a different vocalist.[9][10] Tensions and frustration within the band grew after they failed to land a record deal.[6] The lack of success and stalemate in progress prompted Wakefield, at that time the band\'s vocalist, to leave the band in search of other projects.[6][8] Farrell also left to tour with Tasty Snax, a Christian punk and ska band.
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
};

// TabInTabOut example
const TabInTabOutExample = () => {
    return (
        <div>
            <Button>Click me</Button>

            <div className="my-4">
                <TabsExample />
            </div>

            <Button>Click me</Button>
        </div>
    );
};

export const All: Story = {
    render: () => <TabsExample />
};

export const TabInTabOut: Story = {
    render: () => <TabInTabOutExample />
};

// Dynamic Tabs example
const DynamicUncontrolledTabsExample = () => {
    // Initialize with default placeholder tabs
    const [tabs, setTabs] = useState<string[]>(['placeholder1', 'placeholder2']);
    const [activeTab, setActiveTab] = useState<string>('placeholder1');

    useEffect(() => {
        // Simulate loading tabs from an API after 2 seconds
        const timer = setTimeout(() => {
            const newTabs = ['first', 'second', 'third'];
            setTabs(newTabs);
            setActiveTab(newTabs[1]);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <Tabs.Root
                    defaultValue={activeTab}
                >
                    <Tabs.List>
                        {tabs.map((tab) => (
                            <Tabs.Trigger key={tab} value={tab}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)} Tab
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    {tabs.map((tab) => (
                        <Tabs.Content key={tab} value={tab}>
                            <div className="p-4">
                                {tab.includes('placeholder')
                                    ? 'This is a default tab that will update soon...'
                                    : `Content for the ${tab} tab that was loaded dynamically after a delay.`}
                            </div>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </div>
        </div>
    );
};

export const DynamicUncontrolledTabs: Story = {
    render: () => <DynamicUncontrolledTabsExample />
};

// Controlled Tabs example (explicit state management)
const ControlledTabsExample = () => {
    const [value, setValue] = useState('tab1');

    const handleValueChange = (newValue: string) => {
        console.log('Tab changed to:', newValue);
        setValue(newValue);
    };

    return (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <div className="mb-4">
                    <strong>Controlled Tabs</strong> - Current tab: {value}
                </div>

                <div className="mb-4">
                    <button
                        onClick={() => setValue('tab1')}
                        className={`mr-2 px-4 py-2 rounded ${value === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Select Tab 1
                    </button>
                    <button
                        onClick={() => setValue('tab2')}
                        className={`mr-2 px-4 py-2 rounded ${value === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Select Tab 2
                    </button>
                    <button
                        onClick={() => setValue('tab3')}
                        className={`px-4 py-2 rounded ${value === 'tab3' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Select Tab 3
                    </button>
                </div>

                <Tabs.Root
                    value={value}
                    onValueChange={handleValueChange}
                >
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="tab1">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 1 (Controlled)
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 2 (Controlled)
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 3 (Controlled)
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
};

// Uncontrolled Tabs example (internal state management)
const UncontrolledTabsExample = () => {
    return (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <div className="mb-4">
                    <strong>Uncontrolled Tabs</strong> - Using defaultValue
                </div>

                <Tabs.Root defaultValue="tab2">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="tab1">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 1 (Uncontrolled)
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 2 (Uncontrolled) - This tab is selected by default
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 3 (Uncontrolled)
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
};

export const ControlledTabs: Story = {
    render: () => <ControlledTabsExample />
};

export const UncontrolledTabs: Story = {
    render: () => <UncontrolledTabsExample />
};

// =================== TESTS ===================

// Test for disabled tabs
const DisabledTabsExample = () => {
    return (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <div className="mb-4">
                    <strong>Disabled Tabs Test</strong>
                    <p className="text-sm text-gray-500">
                        Testing tabs with disabled states - the second tab should be disabled and not selectable.
                    </p>
                </div>

                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2" disabled aria-disabled="true">Tab 2 (Disabled)</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="tab1">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 1
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 2 - This content should not be visible since the tab is disabled
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 3
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
};

// Test for many tabs (horizontal scrolling)
const ManyTabsExample = () => {
    return (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <div className="mb-4">
                    <strong>Many Tabs Test</strong>
                    <p className="text-sm text-gray-500">
                        Testing tabs with many items to ensure proper horizontal scrolling/overflow behavior.
                    </p>
                </div>

                <Tabs.Root defaultValue="tab1">
                    <Tabs.List className="overflow-x-auto">
                        {[...Array(10)].map((_, i) => (
                            <Tabs.Trigger key={i} value={`tab${i + 1}`}>Tab {i + 1}</Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    {[...Array(10)].map((_, i) => (
                        <Tabs.Content key={i} value={`tab${i + 1}`}>
                            <div className="p-4 bg-gray-100 mt-2">
                                Content for Tab {i + 1}
                            </div>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </div>
        </div>
    );
};

// Test for nested tabs
const NestedTabsExample = () => {
    return (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <div className="mb-4">
                    <strong>Nested Tabs Test</strong>
                    <p className="text-sm text-gray-500">
                        Testing tabs nested within other tabs to ensure proper context isolation.
                    </p>
                </div>

                <Tabs.Root defaultValue="outer1">
                    <Tabs.List>
                        <Tabs.Trigger value="outer1">Outer Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="outer2">Outer Tab 2</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="outer1">
                        <div className="p-4 bg-gray-100 mt-2">
                            <h3 className="font-medium mb-2">Outer Tab 1 Content</h3>

                            <Tabs.Root defaultValue="inner1">
                                <Tabs.List>
                                    <Tabs.Trigger value="inner1">Inner Tab 1</Tabs.Trigger>
                                    <Tabs.Trigger value="inner2">Inner Tab 2</Tabs.Trigger>
                                </Tabs.List>

                                <Tabs.Content value="inner1">
                                    <div className="p-4 bg-white mt-2 border">
                                        Inner Tab 1 Content
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content value="inner2">
                                    <div className="p-4 bg-white mt-2 border">
                                        Inner Tab 2 Content
                                    </div>
                                </Tabs.Content>
                            </Tabs.Root>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="outer2">
                        <div className="p-4 bg-gray-100 mt-2">
                            <h3 className="font-medium mb-2">Outer Tab 2 Content</h3>

                            <Tabs.Root defaultValue="inner3">
                                <Tabs.List>
                                    <Tabs.Trigger value="inner3">Inner Tab 3</Tabs.Trigger>
                                    <Tabs.Trigger value="inner4">Inner Tab 4</Tabs.Trigger>
                                </Tabs.List>

                                <Tabs.Content value="inner3">
                                    <div className="p-4 bg-white mt-2 border">
                                        Inner Tab 3 Content
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content value="inner4">
                                    <div className="p-4 bg-white mt-2 border">
                                        Inner Tab 4 Content
                                    </div>
                                </Tabs.Content>
                            </Tabs.Root>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
};

// Test for programmatic tab changes
const ProgrammaticTabsExample = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    useEffect(() => {
        // Change tabs programmatically every 2 seconds
        const tabIds = ['tab1', 'tab2', 'tab3'];
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabIds.length;
            setActiveTab(tabIds[currentIndex]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <div className="mb-4">
                    <strong>Programmatic Tabs Test</strong>
                    <p className="text-sm text-gray-500">
                        Testing tabs that change automatically every 2 seconds. Current tab: {activeTab}
                    </p>
                </div>

                <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="tab1">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 1 - This will automatically change in 2 seconds
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 2 - This will automatically change in 2 seconds
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3">
                        <div className="p-4 bg-gray-100 mt-2">
                            Content for Tab 3 - This will automatically change in 2 seconds
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
};

export const DisabledTabs: Story = {
    render: () => <DisabledTabsExample />
};

export const ManyTabs: Story = {
    render: () => <ManyTabsExample />
};

export const NestedTabs: Story = {
    render: () => <NestedTabsExample />
};

export const ProgrammaticTabs: Story = {
    render: () => <ProgrammaticTabsExample />
};

// New stories for the GitHub issue #1271 features
export const VerticalOrientation: Story = {
    render: () => (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Vertical Tabs</h3>
                <Tabs.Root defaultValue="tab1" orientation="vertical">
                    <Tabs.List className="flex flex-col gap-2">
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 1</h4>
                            <p>This is the content for the first tab. Notice how the tabs are arranged vertically.</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 2</h4>
                            <p>This is the content for the second tab. Use arrow keys to navigate vertically.</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 3</h4>
                            <p>This is the content for the third tab. The orientation is set to vertical.</p>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    )
};

export const ManualActivationMode: Story = {
    render: () => (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Manual Activation Mode</h3>
                <p className="text-sm text-gray-600 mb-4">
                    In manual mode, tabs only activate when clicked, not when focused with keyboard.
                </p>
                <Tabs.Root defaultValue="tab1" activationMode="manual">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 1</h4>
                            <p>Try using arrow keys to focus different tabs. The content won't change until you click.</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 2</h4>
                            <p>This tab content only shows when you click the tab, not when you focus it.</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 3</h4>
                            <p>Manual activation mode provides more control over when tabs activate.</p>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    )
};

export const ForceMount: Story = {
    render: () => (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Force Mount</h3>
                <p className="text-sm text-gray-600 mb-4">
                    The second tab content is force-mounted, so it stays in the DOM even when inactive.
                </p>
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2 (Force Mounted)</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 1</h4>
                            <p>This content is normally mounted/unmounted based on active state.</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2" forceMount className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 2</h4>
                            <p>This content is force-mounted and stays in the DOM. Check the browser inspector to see it's always there.</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Content for Tab 3</h4>
                            <p>This content is normally mounted/unmounted based on active state.</p>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    )
};

export const RTLDirection: Story = {
    render: () => (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">RTL Direction</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Tabs with right-to-left text direction support.
                </p>
                <Tabs.Root defaultValue="tab1" dir="rtl">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">تب 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">تب 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">تب 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">محتوى التب الأول</h4>
                            <p>هذا هو محتوى التب الأول مع دعم الاتجاه من اليمين إلى اليسار.</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">محتوى التب الثاني</h4>
                            <p>هذا هو محتوى التب الثاني مع دعم الاتجاه من اليمين إلى اليسار.</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">محتوى التب الثالث</h4>
                            <p>هذا هو محتوى التب الثالث مع دعم الاتجاه من اليمين إلى اليسار.</p>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    )
};

export const DataAttributes: Story = {
    render: () => (
        <div className="w-full my-4">
            <div className="border shadow rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Data Attributes</h3>
                <p className="text-sm text-gray-600 mb-4">
                    This example shows the data attributes that are automatically added to tabs.
                    Open the browser inspector to see data-state, data-orientation, and data-disabled attributes.
                </p>
                <Tabs.Root defaultValue="tab1" orientation="horizontal">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Active Tab</Tabs.Trigger>
                        <Tabs.Trigger value="tab2" disabled>Disabled Tab</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Inactive Tab</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Active Tab Content</h4>
                            <p>This tab has data-state="active" and data-orientation="horizontal".</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Disabled Tab Content</h4>
                            <p>This tab has data-state="inactive", data-orientation="horizontal", and data-disabled="".</p>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab3" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Inactive Tab Content</h4>
                            <p>This tab has data-state="inactive" and data-orientation="horizontal".</p>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    )
};
