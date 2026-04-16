import { Meta } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Collapsible from '~/components/ui/Collapsible/Collapsible';

const Items = [
    {
        content:
            '“One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.“ – Plato'
    },
    {
        content:
            '“The superior man understands what is right; the inferior man understands what will sell.” – Confucius'
    },
    {
        content: '“There are no secrets on the internet.” – Paul Babicki'
    }
];

const meta: Meta<typeof Collapsible> = {
    component: Collapsible,
    title: 'Components/Collapsible'
};

export default meta;

const DoubleChevronIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M5.146 5.146a.5.5 0 0 1 .708 0L8 7.293l2.146-2.147a.5.5 0 1 1 .708.708l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708Z" fill="currentColor" />
            <path d="M5.146 8.646a.5.5 0 0 1 .708 0L8 10.793l2.146-2.147a.5.5 0 1 1 .708.708l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708Z" fill="currentColor" />
        </svg>
    );
};

export const Default = () => {
    return (
        <SandboxEditor>
            <div className="w-full max-w-[28rem]">
                <Collapsible.Root transitionDuration={200} className="group">
                    <Collapsible.Trigger>
                        <span>Order #4189</span>
                        <DoubleChevronIcon className="rad-ui-collapsible-trigger-icon" />
                    </Collapsible.Trigger>

                    <Collapsible.Content>
                        <div className="rad-ui-collapsible-panel">
                            <div className="rad-ui-collapsible-panel-row">
                                <span className="rad-ui-collapsible-panel-row-label">Status</span>
                                <span className="rad-ui-collapsible-panel-row-value">Shipped</span>
                            </div>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>
        </SandboxEditor>
    );
};

export const WithCustomContent = () => {
    return (
        <SandboxEditor>
            <div className="w-full max-w-[24rem] space-y-4">
                <Collapsible.Root transitionDuration={200} className="group">
                    <Collapsible.Trigger>
                        <span>Settings</span>
                        <DoubleChevronIcon className="rad-ui-collapsible-trigger-icon" />
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <div className="rad-ui-collapsible-panel">
                            <div className="rad-ui-collapsible-panel-row">
                                <span className="rad-ui-collapsible-panel-row-label">Notifications</span>
                                <span className="rad-ui-collapsible-panel-row-value">Enabled</span>
                            </div>
                            <div className="rad-ui-collapsible-panel-row">
                                <span className="rad-ui-collapsible-panel-row-label">Theme</span>
                                <span className="rad-ui-collapsible-panel-row-value">System</span>
                            </div>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>
        </SandboxEditor>
    );
};
