import React from 'react';
import type { StoryObj } from '@storybook/react';
import Menubar from '../Menubar';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

type Story = StoryObj<typeof Menubar>;

export default {
    title: 'WIP/Menubar',
    component: Menubar
};

const ChevronRight = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        />
    </svg>
);
const SampleMenu = () => (
    <Menubar.Menu>
        <Menubar.Trigger >Trigger</Menubar.Trigger>
        <Menubar.Portal>
            <Menubar.Content >
                <Menubar.Item label="Profile">Profile</Menubar.Item>
                <Menubar.Item label="Settings">Settings</Menubar.Item>
                <Menubar.Item label="Notifications">Notifications</Menubar.Item>
                <Menubar.Sub >
                    <Menubar.SubTrigger >More Options <ChevronRight /></Menubar.SubTrigger>
                    <Menubar.Content >
                        <Menubar.Item label="Help Center">Help Center</Menubar.Item>
                        <Menubar.Item label="Feedback">Feedback</Menubar.Item>
                        <Menubar.Item label="About">About</Menubar.Item>
                        <Menubar.Sub >
                            <Menubar.SubTrigger >Legal <ChevronRight /></Menubar.SubTrigger>
                            <Menubar.Content >
                                <Menubar.Item label="Terms of Service">Terms of Service</Menubar.Item>
                                <Menubar.Item label="Privacy Policy">Privacy Policy</Menubar.Item>
                                <Menubar.Item label="Licenses">Licenses</Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Sub>
                        <Menubar.Item label="Contact">Contact</Menubar.Item>
                        <Menubar.Item label="Support">Support</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Sub>
                <Menubar.Item label="Logout">Logout</Menubar.Item>
                <Menubar.Item label="Switch Account">Switch Account</Menubar.Item>
            </Menubar.Content>
        </Menubar.Portal>
    </Menubar.Menu>
);
export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <Menubar.Root>
                <SampleMenu/>
                <SampleMenu/>
                <SampleMenu/>
                <SampleMenu/>

            </Menubar.Root>
        </SandboxEditor>
    )
};
