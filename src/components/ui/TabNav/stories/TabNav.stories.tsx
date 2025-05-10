import React, { useState } from 'react';
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

export const Controlled = {
    render: () => {
        const [activeTab, setActiveTab] = useState('tab2');

        return (
            <SandboxEditor>
                <div className="space-y-4">
                    <TabNav.Root
                        value={activeTab}
                        onValueChange={setActiveTab}
                    >
                        <TabNav.Link value="tab1" href="#tab1">Tab 1</TabNav.Link>
                        <TabNav.Link value="tab2" href="#tab2">Tab 2</TabNav.Link>
                        <TabNav.Link value="tab3" href="#tab3">Tab 3</TabNav.Link>
                    </TabNav.Root>

                    <div className="mt-4 p-4 border rounded">
                        <p>Active Tab: {activeTab}</p>
                    </div>
                </div>
            </SandboxEditor>
        );
    }
};
