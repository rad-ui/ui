import React from 'react';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import ContextMenu from '../ContextMenu';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

type Story = StoryObj<typeof ContextMenu>;

export default {
    title: 'Components/ContextMenu',
    component: ContextMenu
} as Meta<typeof ContextMenu>;

const ChevronRight = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;

const MenuItems = () => (
    <>
        <ContextMenu.Item label="Profile">Profile</ContextMenu.Item>
        <ContextMenu.Item label="Settings">Settings</ContextMenu.Item>
        <ContextMenu.Item label="Notifications">Notifications</ContextMenu.Item>
        <ContextMenu.Item label="Profile">Profile</ContextMenu.Item>
        <ContextMenu.Item label="Settings">Settings</ContextMenu.Item>
        <ContextMenu.Item label="Notifications">Notifications</ContextMenu.Item>
        <ContextMenu.Item label="Profile">Profile</ContextMenu.Item>
        <ContextMenu.Item label="Settings">Settings</ContextMenu.Item>
        <ContextMenu.Item label="Notifications">Notifications</ContextMenu.Item>
        <ContextMenu.Item label="Profile">Profile</ContextMenu.Item>
        <ContextMenu.Item label="Settings">Settings</ContextMenu.Item>
        <ContextMenu.Item label="Notifications">Notifications</ContextMenu.Item>
        <ContextMenu.Item label="Profile">Profile</ContextMenu.Item>
        <ContextMenu.Item label="Settings">Settings</ContextMenu.Item>
        <ContextMenu.Item label="Notifications">Notifications</ContextMenu.Item>
        <ContextMenu.Item label="Profile">Profile</ContextMenu.Item>
        <ContextMenu.Item label="Settings">Settings</ContextMenu.Item>
        <ContextMenu.Item label="Notifications">Notifications</ContextMenu.Item>
        <ContextMenu.Item label="Profile">Profile</ContextMenu.Item>
        <ContextMenu.Item label="Settings">Settings</ContextMenu.Item>
        <ContextMenu.Item label="Notifications">Notifications</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
            <ContextMenu.SubTrigger>More Options <ChevronRight /></ContextMenu.SubTrigger>
            <ContextMenu.Content>
                <ContextMenu.Item label="Help Center">Help Center</ContextMenu.Item>
                <ContextMenu.Item label="Feedback">Feedback</ContextMenu.Item>
                <ContextMenu.Item label="About">About</ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Sub>
        <ContextMenu.Item label="Logout">Logout</ContextMenu.Item>
    </>
);

export const Basic: Story = {
    render: () => (
        <SandboxEditor>
            <ContextMenu.Root customRootClass="">
                <ContextMenu.Trigger style={{ padding: '6rem 1.5rem', width: '24rem', minHeight: '13.5rem' }}>
                    Right click here
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <MenuItems />
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        </SandboxEditor>
    )
};

export const Variants: Story = {
    render: () => (
        <SandboxEditor>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {(['default', 'soft', 'outline'] as const).map((variant) => (
                    <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--rad-ui-text-muted)' }}>{variant}</span>
                        <ContextMenu.Root customRootClass="" variant={variant === 'default' ? undefined : variant}>
                            <ContextMenu.Trigger style={{ padding: '4rem 1.5rem', width: '16rem', minHeight: '10rem' }}>
                                Right click — {variant}
                            </ContextMenu.Trigger>
                            <ContextMenu.Portal>
                                <ContextMenu.Content>
                                    <MenuItems />
                                </ContextMenu.Content>
                            </ContextMenu.Portal>
                        </ContextMenu.Root>
                    </div>
                ))}
            </div>
        </SandboxEditor>
    )
};

export const Sizes: Story = {
    render: () => (
        <SandboxEditor>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                    <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--rad-ui-text-muted)' }}>{size}</span>
                        <ContextMenu.Root customRootClass="" size={size}>
                            <ContextMenu.Trigger style={{ padding: '4rem 1.5rem', width: '16rem', minHeight: '10rem' }}>
                                Right click — {size}
                            </ContextMenu.Trigger>
                            <ContextMenu.Portal>
                                <ContextMenu.Content>
                                    <MenuItems />
                                </ContextMenu.Content>
                            </ContextMenu.Portal>
                        </ContextMenu.Root>
                    </div>
                ))}
            </div>
        </SandboxEditor>
    )
};

export const VariantsAndSizes: Story = {
    render: () => (
        <SandboxEditor>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {(['default', 'soft', 'outline'] as const).map((variant) => (
                    <div key={variant}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--rad-ui-text-muted)', marginBottom: '1rem' }}>
                            variant: {variant}
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {(['small', 'medium', 'large'] as const).map((size) => (
                                <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--rad-ui-text-muted)' }}>{size}</span>
                                    <ContextMenu.Root customRootClass="" variant={variant === 'default' ? undefined : variant} size={size}>
                                        <ContextMenu.Trigger style={{ padding: '3rem 1rem', width: '13rem', minHeight: '8rem' }}>
                                            Right click
                                        </ContextMenu.Trigger>
                                        <ContextMenu.Portal>
                                            <ContextMenu.Content>
                                                <MenuItems />
                                            </ContextMenu.Content>
                                        </ContextMenu.Portal>
                                    </ContextMenu.Root>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SandboxEditor>
    )
};
