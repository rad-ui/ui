import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import RovingFocusGroup from '../RovingFocusGroup';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const items = [
    {title: "1", content: "RovingFocusGroup"},
    {title: "2", content: "RovingFocusGroup"},

]
export default {
    title: 'WIP/RovingFocusGroup',
    component: RovingFocusGroup,
    render: (args: any) => <SandboxEditor>
        <div >
            <RovingFocusGroup items={items}/>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ""
    }
}

