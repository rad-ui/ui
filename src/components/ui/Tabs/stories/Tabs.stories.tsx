import React from 'react';
import Tabs from '../Tabs';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

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

const ArrowIcon = ({ className } : { className:string }) => {
    return <svg className={className} width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

// Create a basic TabsContentRenderer component
const TabsWithContext = ({ children }: { children: React.ReactNode }) => {
    // In this example, we're not accessing the active tab from our component directly
    // We're letting the context handle it instead
    return children;
};

// Create a TabsExample component using the composable API
const TabsExample = () => {
    const tabs = [
        {
            label: 'Meteora (album)',
            value: 'tab1',
            content: 'Following the success of Hybrid Theory and Reanimation, Linkin Park spent a significant amount of time touring around the United States. The band members began to work on new material amidst their saturated schedule, spending a sliver of their free time in their tour bus\'s studio.[34] The band officially announced the production of a new studio album in December 2002, revealing their new work was inspired by the rocky region of Meteora in Greece, where numerous monasteries have been built on top of the rocks.[35] Meteora features a mixture of the band\'s nu metal and rap metal style with newer innovative effects, including the induction of a shakuhachi (a Japanese flute made of bamboo) and other instruments'
        },
        {
            label: 'History',
            value: 'tab2',
            content: <div className='text-gray-1000'>
                {'Linkin Park was founded by three high school friends: Mike Shinoda, Rob Bourdon, and Brad Delson.[6][7] The three attended Agoura High School in Agoura Hills, California, a suburb of Los Angeles.[6][7] After graduating from high school, the three began to take their musical interests more seriously, recruiting Joe Hahn, Dave "Phoenix" Farrell, and Mark Wakefield to perform in their band, then called Xero. Though limited in resources, the band began recording and producing songs within Shinoda\'s makeshift bedroom studio in 1996, resulting in a four-track demo album, entitled Xero, released in November 1997.[6][8] Delson introduced the band to Jeff Blue, the vice president of A&R for Zomba Music, whom he had interned for in college.[9][10] Blue offered the band constructive criticism to catch the attention of record labels. Blue himself was impressed with Xero after watching them play a live show in 1998, but believed the band needed a different vocalist.[9][10] Tensions and frustration within the band grew after they failed to land a record deal.[6] The lack of success and stalemate in progress prompted Wakefield, at that time the band\'s vocalist, to leave the band in search of other projects.[6][8] Farrell also left to tour with Tasty Snax, a Christian punk and ska band.'}
            </div>
        }
    ];

    return (
        <div className="w-full">
            {/* Since we can't directly use Tabs due to the empty implementation
                we need to create the structure manually using the fragments */}
            <TabsWithContext>
                <h3 className="text-lg font-bold mb-4">Linkin Park Information</h3>
                <div
                    style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        padding: '1rem',
                        maxWidth: '800px'
                    }}
                >
                    <div className="flex border-b mb-4">
                        {tabs.map((tab) => (
                            <div
                                key={tab.value}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                style={{
                                    borderBottom: tab.value === 'tab1' ? '2px solid #3b82f6' : 'none'
                                }}
                            >
                                {tab.value === 'tab2'
                                    ? (
                                        <div className='flex items-center space-x-2'>
                                            <span>{tab.label}</span> <ArrowIcon className=''/>
                                        </div>
                                    )
                                    : tab.label}
                            </div>
                        ))}
                    </div>
                    <div className="p-2">
                        {tabs[0].content}
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    Note: This is a static example showing how the UI would look.
                    In a real implementation, the tabs would be interactive using Tabs.Root, Tabs.List, etc.
                </p>
            </TabsWithContext>
        </div>
    );
};

// TabInTabOut example component
const TabInTabOutExample = () => {
    return (
        <div>
            <Button>Click me</Button>

            <div className="my-4 p-4 border rounded">
                <div className="flex border-b mb-4">
                    <div
                        className="px-4 py-2 cursor-pointer"
                        style={{
                            borderBottom: '2px solid #3b82f6'
                        }}
                    >
                        Tabbing In
                    </div>
                    <div className="px-4 py-2 cursor-pointer">
                        <div className='flex items-center space-x-2'>
                            <span>Tab Out</span> <ArrowIcon className=''/>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    Focus on the first button, press tab to move to the Tab component, it tabs into the selected tab.
                </div>
            </div>

            <Button>Click me</Button>
            <p className="text-sm text-gray-500 mt-4">
                Note: This is a static example showing how the UI would look.
                In a real implementation, you would be able to tab between buttons and tabs.
            </p>
        </div>
    );
};

export const All: Story = {
    render: () => <TabsExample />
};

export const TabInTabOut: Story = {
    render: () => <TabInTabOutExample />
};
