import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';

import RovingFocusGroup from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/RovingFocusGroup',
    component: RovingFocusGroup,
    render: () => <>
        <SandboxEditor className="space-y-2">
            <RovingFocusGroup.Root>
                <div>RovingFocusGroup</div>
            </RovingFocusGroup.Root>
        </SandboxEditor>
    </>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
