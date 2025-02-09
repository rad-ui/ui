import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import RovingFocus from '../RovingFocus';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export


export default {
    title: 'WIP/RovingFocusGroup',
    component: RovingFocus,
    render: (args: any) => <SandboxEditor>
        <div >
            
                <RovingFocus.Group>
                    <RovingFocus.Item>
                        Item 1
                    </RovingFocus.Item>
                    <RovingFocus.Item>
                        Item 1
                    </RovingFocus.Item>
                    <RovingFocus.Item>
                        Item 1
                    </RovingFocus.Item>
                </RovingFocus.Group>

                <RovingFocus.Group>
                    <RovingFocus.Item>
                        Item 2
                    </RovingFocus.Item>
                </RovingFocus.Group>
           

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ""
    }
}

