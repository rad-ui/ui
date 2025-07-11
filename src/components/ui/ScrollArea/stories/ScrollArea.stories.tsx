import React from 'react';
import ScrollArea from '../ScrollArea';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

import Text from '~/components/ui/Text/Text';
import Heading from '~/components/ui/Heading/Heading';

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
// Layout.args = {}; // Not needed, Layout is not a function story
// TODO: Add proper typing for args if needed in the future
