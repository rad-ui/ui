import React, { useState } from 'react';
import Tabs from '../Tabs';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { TabProps } from '../types';

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

    const handleTabChange = (tab: TabProps) => {
        console.log('tab', tab);
        setActiveTab(tab.value);
    };

    return (
        <div className="w-full my-4">

            {/* Using the actual Tabs composable API */}
            <div className="border  shadow rounded-md p-4">
                <Tabs.Root
                    defaultTab={activeTab}
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
