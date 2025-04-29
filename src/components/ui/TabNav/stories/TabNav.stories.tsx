import React from 'react';
import TabNav from '../TabNav';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/TabNav',
    component: TabNav,
    render: (args: React.JSX.IntrinsicAttributes) => <SandboxEditor>
        <div >
            <TabNav.Root>
                <TabNav.Link disabled href={'###'}>Tab 1</TabNav.Link>
                <TabNav.Link>Tab 2</TabNav.Link>
                <TabNav.Link>Tab 3</TabNav.Link>
            </TabNav.Root>
        </div>
    </SandboxEditor>
};

export const All = {
    args: {
        className: 'text-gray-950'
    }
};
