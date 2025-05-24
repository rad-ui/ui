import React from 'react';
import ScrollArea from '../ScrollArea';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const ScrollAreaTemplate = (args) => {
    return (
        <SandboxEditor>
            <ScrollArea.Root>
                <ScrollArea.Viewport className='h-[100px] w-[400px]'>
                    <div className='bg-gray-100 p-4'>
                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content

                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content
                        This is scrollArea content
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
    render: (args) => <ScrollAreaTemplate {...args}/>
};

export const All = {};
All.args = {};
