import React from 'react';
import type { StoryObj } from '@storybook/react';
import ContextMenu from '../ContextMenu';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

type Story = StoryObj<typeof ContextMenu>;

export default {
    title: 'WIP/ContextMenu',
    component: ContextMenu
};

const ChevronRight =() => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <ContextMenu.Root customRootClass="" >
                <ContextMenu.Trigger >Right click here</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content >
                        <ContextMenu.Item  label="Profile">Profile</ContextMenu.Item>
                        <ContextMenu.Item  label="Settings">Settings</ContextMenu.Item>
                        <ContextMenu.Item  label="Notifications">Notifications</ContextMenu.Item>
                        <ContextMenu.Sub >
                            <ContextMenu.SubTrigger >More Options <ChevronRight /></ContextMenu.SubTrigger>
                            <ContextMenu.Content >
                                <ContextMenu.Item  label="Help Center">Help Center</ContextMenu.Item>
                                <ContextMenu.Item  label="Feedback">Feedback</ContextMenu.Item>
                                <ContextMenu.Item label="About">About</ContextMenu.Item>
                                <ContextMenu.Sub >
                                    <ContextMenu.SubTrigger >Legal <ChevronRight /></ContextMenu.SubTrigger>
                                    <ContextMenu.Content >
                                        <ContextMenu.Item  label="Terms of Service">Terms of Service</ContextMenu.Item>
                                        <ContextMenu.Item  label="Privacy Policy">Privacy Policy</ContextMenu.Item>
                                        <ContextMenu.Item  label="Licenses">Licenses</ContextMenu.Item>
                                    </ContextMenu.Content>
                                </ContextMenu.Sub>
                                <ContextMenu.Item  label="Contact">Contact</ContextMenu.Item>
                                <ContextMenu.Item  label="Support">Support</ContextMenu.Item>
                            </ContextMenu.Content>
                        </ContextMenu.Sub>
                        <ContextMenu.Item  label="Logout">Logout</ContextMenu.Item>
                        <ContextMenu.Item  label="Switch Account">Switch Account</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        </SandboxEditor>
    )
};
