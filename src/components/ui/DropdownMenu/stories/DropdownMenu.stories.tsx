import React from 'react';
import type { StoryObj } from '@storybook/react';
import DropdownMenu from '../DropdownMenu';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

type Story = StoryObj<typeof DropdownMenu>;

export default {
    title: 'WIP/DropdownMenu',
    component: DropdownMenu
};

const ChevronRight = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>;

const Hamburger = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>;
export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <DropdownMenu.Root customRootClass="" >
                <DropdownMenu.Trigger ><Hamburger /></DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content >
                        <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                        <DropdownMenu.Item label="Settings">Settings</DropdownMenu.Item>
                        <DropdownMenu.Item label="Notifications">Notifications</DropdownMenu.Item>
                        <DropdownMenu.Sub >
                            <DropdownMenu.SubTrigger >More Options <ChevronRight /></DropdownMenu.SubTrigger>
                            <DropdownMenu.Content >
                                <DropdownMenu.Item label="Help Center">Help Center</DropdownMenu.Item>
                                <DropdownMenu.Item label="Feedback">Feedback</DropdownMenu.Item>
                                <DropdownMenu.Item label="About">About</DropdownMenu.Item>
                                <DropdownMenu.Sub >
                                    <DropdownMenu.SubTrigger >Legal <ChevronRight /></DropdownMenu.SubTrigger>
                                    <DropdownMenu.Content >
                                        <DropdownMenu.Item label="Terms of Service">Terms of Service</DropdownMenu.Item>
                                        <DropdownMenu.Item label="Privacy Policy">Privacy Policy</DropdownMenu.Item>
                                        <DropdownMenu.Item label="Licenses">Licenses</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Sub>
                                <DropdownMenu.Item label="Contact">Contact</DropdownMenu.Item>
                                <DropdownMenu.Item label="Support">Support</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Sub>
                        <DropdownMenu.Item label="Logout">Logout</DropdownMenu.Item>
                        <DropdownMenu.Item label="Switch Account">Switch Account</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </SandboxEditor>
    )
};
