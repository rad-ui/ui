import React from 'react';
import ScrollArea from '../ScrollArea';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

import Text from '~/components/ui/Text/Text';
import Heading from '~/components/ui/Heading/Heading';
import Card from '~/components/ui/Card/Card';

const ScrollAreaTemplate = (args: any) => {
    return (
        <SandboxEditor>
            <ScrollArea.Root>
                <ScrollArea.Viewport>
                    <div className='bg-gray-100 text-gray-950 p-4 max-h-screen'>
                        <Heading>Scroll Area</Heading>
                        <Text>This is scrollArea content</Text>

                        {Array.from({ length: 10 }).map((_, index) => (
                            <>
                                <Heading as='h2'>Scroll Area</Heading>
                                <Text>
                        Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets. It is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin.Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets. It is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin.Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets. It is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin.
                                </Text>
                            </>
                        ))}

                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation='horizontal'>
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar orientation='vertical'>
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'WIP/ScrollArea',
    component: ScrollArea,
    render: (args: any) => <ScrollAreaTemplate {...args}/>
};

export const All = {};
// All.args = {}; // Not needed, All is not a function story

const LayoutTemplate = () => {
    return <SandboxEditor>
        <div className='w-full h-screen bg-gray-200 text-gray-950 border-2 border-gray-300 max-h-screen'>
            <ScrollArea.Root>
                <ScrollArea.Viewport>
                    <div className='w-full bg-gray-200 text-gray-950 p-4'>
                        <Heading>Scroll Area</Heading>
                        {Array.from({ length: 100 }).map((_, index) => (
                            <>
                                <Heading as='h2'>Scroll Area</Heading>
                                <Text>This is scrollArea content</Text>
                            </>
                        ))}
                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation='vertical'>
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>

    </SandboxEditor>;
};

export const Layout = LayoutTemplate.bind({});

export const AutoType = {
    render: () => (
        <SandboxEditor>
            <div className="h-64 border border-gray-300">
                <ScrollArea.Root type="auto">
                    <ScrollArea.Viewport>
                        <div className="p-4">
                            <Heading>Auto Type</Heading>
                            <Text>Scrollbars appear when content overflows.</Text>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <Text key={i}>Item {i + 1}</Text>
                            ))}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical">
                        <ScrollArea.Thumb orientation="vertical" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </SandboxEditor>
    )
};

export const AlwaysType = {
    render: () => (
        <SandboxEditor>
            <div className="h-64 border border-gray-300">
                <ScrollArea.Root type="always">
                    <ScrollArea.Viewport>
                        <div className="p-4">
                            <Heading>Always Type</Heading>
                            <Text>Scrollbars are always visible.</Text>
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical">
                        <ScrollArea.Thumb orientation="vertical" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </SandboxEditor>
    )
};

export const ScrollType = {
    render: () => (
        <SandboxEditor>
            <div className="h-64 border border-gray-300">
                <ScrollArea.Root type="scroll">
                    <ScrollArea.Viewport>
                        <div className="p-4">
                            <Heading>Scroll Type</Heading>
                            <Text>Scrollbars appear only when scrolling.</Text>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <Text key={i}>Item {i + 1}</Text>
                            ))}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical">
                        <ScrollArea.Thumb orientation="vertical" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </SandboxEditor>
    )
};

export const HoverType = {
    render: () => (
        <SandboxEditor>
            <div className="h-64 border border-gray-300">
                <ScrollArea.Root type="hover">
                    <ScrollArea.Viewport>
                        <div className="p-4">
                            <Heading>Hover Type</Heading>
                            <Text>Scrollbars appear on hover or scroll.</Text>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <Text key={i}>Item {i + 1}</Text>
                            ))}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical">
                        <ScrollArea.Thumb orientation="vertical" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </SandboxEditor>
    )
};

export const BothOrientations = {
    render: () => (
        <SandboxEditor>
            <div className="h-64 border border-gray-300">
                <ScrollArea.Root type="always">
                    <ScrollArea.Viewport>
                        <div className="p-4 w-[1000px]">
                            <Heading>Both Orientations</Heading>
                            <Text>Try scrolling both vertically and horizontally.</Text>
                            <div className="flex gap-4">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div key={i} className="min-w-[200px] h-96 bg-gray-100 border border-gray-200 flex items-center justify-center">
                                        Card {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical">
                        <ScrollArea.Thumb orientation="vertical" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar orientation="horizontal">
                        <ScrollArea.Thumb orientation="horizontal" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner />
                </ScrollArea.Root>
            </div>
        </SandboxEditor>
    )
};

export const HorizontalOnly = {
    render: () => (
        <SandboxEditor>
            <div className="h-32 border border-gray-300">
                <ScrollArea.Root type="always">
                    <ScrollArea.Viewport>
                        <div className="p-4 w-[1000px] whitespace-nowrap">
                            <Heading>Horizontal Only</Heading>
                            <div className="flex gap-4">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="min-w-[200px] h-16 bg-blue-50 border border-blue-200 flex items-center justify-center">
                                        Horizontal Item {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="horizontal">
                        <ScrollArea.Thumb orientation="horizontal" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </SandboxEditor>
    )
};

export const InsideCard = {
    render: () => (
        <SandboxEditor>
            <Card className="w-80 overflow-hidden h-[200px]" style={{ padding: 0 }}>
                <ScrollArea.Root type="hover" className="h-48">
                    <ScrollArea.Viewport>
                        <div className="p-4">
                            <Heading as="h3" className="mb-2">Card with ScrollArea</Heading>
                            <Text className="mb-4">
                                This content is inside a ScrollArea which is itself inside a Card component.
                            </Text>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="py-2 border-t border-gray-100 flex items-center justify-between">
                                    <Text>Option {i + 1}</Text>
                                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                                </div>
                            ))}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical">
                        <ScrollArea.Thumb orientation="vertical" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </Card>
        </SandboxEditor>
    )
};
