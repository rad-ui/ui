import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

import RovingFocusGroup from '../index';

import Button from '~/components/ui/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/RovingFocusGroup',
    component: RovingFocusGroup,
    render: (args) => <>
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
