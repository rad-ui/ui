import React, { useState, useEffect } from 'react';
import Toast, {toast} from '../Toast';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';
// import { TabProps } from '../fragments/TabContent'; // Removed - not exported

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Toast> = {
    title: 'WIP/Toast',
    component: Toast,
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
export const ToastExample = () => {
    // Create a custom Tabs component using the fragments

    const [activeTab, setActiveTab] = useState('meteora');

    const handleTabChange = (value: string) => {
        // console.log('tab', value);
        setActiveTab(value);
    };

    return (
        <div className="w-full my-4">
            <Toast.Toaster />

            {/* Using the actual Tabs composable API */}
            <div className="border  shadow rounded-md p-4">
                <Toast.Provider>
                    <Button onClick={() => toast.success('Hello')}>Show Toast</Button>
                    {/* <Toast.Root>
                        <Toast.Title>
                            <h1>Hello</h1>
                        </Toast.Title>
                    </Toast.Root> */}
                </Toast.Provider>
            </div>
        </div>
    );
};


