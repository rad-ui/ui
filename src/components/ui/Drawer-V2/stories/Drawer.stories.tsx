import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Drawer from '../Drawer';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';
import { X } from 'lucide-react';

const meta: Meta<typeof Drawer> = {
    title: 'Components/Drawer',
    component: Drawer,
    decorators: [(Story) => (
        <SandboxEditor>
            <Story />
        </SandboxEditor>
    )]
};

export default meta;
type Story = StoryObj<any>;

// ── Helpers ────────────────────────────────────────────────────────────────

type Direction = 'right' | 'left' | 'top' | 'bottom';

const DrawerExample = ({ swipeDirection = 'right' as Direction, label = 'Open Drawer' }) => (
    <Drawer.Root swipeDirection={swipeDirection}>
        <Drawer.Trigger>
            <>{label}</>
        </Drawer.Trigger>
        <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
                <Drawer.Title>Drawer</Drawer.Title>
                <Drawer.Description>
                    This drawer slides in from the {swipeDirection}. Press Escape or click outside to dismiss.
                </Drawer.Description>
                <div style={{ padding: '0 1.25rem 1.25rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)', lineHeight: 1.6 }}>
                        Place any content here — navigation links, settings panels, filters, or forms.
                    </p>
                </div>
                <Drawer.Close>
                    <X width={15} height={15} />
                </Drawer.Close>
            </Drawer.Content>
        </Drawer.Portal>
    </Drawer.Root>
);

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
    render: () => <DrawerExample swipeDirection="right" label="Open Drawer (from right)" />
};

export const FromLeft: Story = {
    render: () => <DrawerExample swipeDirection="left" label="Open Drawer (from left)" />
};

export const FromTop: Story = {
    render: () => <DrawerExample swipeDirection="top" label="Open Drawer (from top)" />
};

export const FromBottom: Story = {
    render: () => <DrawerExample swipeDirection="bottom" label="Open Drawer (from bottom)" />
};

export const AllDirections: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <DrawerExample swipeDirection="right" label="→ From right" />
            <DrawerExample swipeDirection="left" label="← From left" />
            <DrawerExample swipeDirection="top" label="↓ From top" />
            <DrawerExample swipeDirection="bottom" label="↑ From bottom" />
        </div>
    )
};

export const Controlled: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button onClick={() => setOpen(true)}>Open programmatically</Button>
                    <Button onClick={() => setOpen(false)}>Close programmatically</Button>
                </div>
                <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
                    <Drawer.Trigger>
                        <>Open via trigger</>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Title>Controlled Drawer</Drawer.Title>
                            <Drawer.Description>
                                This drawer is controlled externally. Use the buttons above to open and close it.
                            </Drawer.Description>
                            <Drawer.Close>
                                <X width={15} height={15} />
                            </Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        );
    }
};

export const WithForm: Story = {
    render: () => (
        <Drawer.Root swipeDirection="right">
            <Drawer.Trigger>
                <>Edit Profile</>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Title>Edit Profile</Drawer.Title>
                    <Drawer.Description>
                        Make changes to your profile here.
                    </Drawer.Description>
                    <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                            <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--rad-ui-text-primary)' }}>
                                Name
                            </label>
                            <input
                                type="text"
                                defaultValue="[name]"
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: 'var(--rad-ui-radius-md)',
                                    border: '1px solid var(--rad-ui-border-soft)',
                                    background: 'var(--rad-ui-surface-panel)',
                                    color: 'var(--rad-ui-text-primary)',
                                    fontSize: '0.875rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                            <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--rad-ui-text-primary)' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                defaultValue="[email]"
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: 'var(--rad-ui-radius-md)',
                                    border: '1px solid var(--rad-ui-border-soft)',
                                    background: 'var(--rad-ui-surface-panel)',
                                    color: 'var(--rad-ui-text-primary)',
                                    fontSize: '0.875rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                            <Drawer.Close asChild>
                                <Button>Cancel</Button>
                            </Drawer.Close>
                            <Drawer.Close asChild>
                                <Button>Save changes</Button>
                            </Drawer.Close>
                        </div>
                    </div>
                    <Drawer.Close>
                        <X width={15} height={15} />
                    </Drawer.Close>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
};

// ── Nested drawers ─────────────────────────────────────────────────────────
//
// Each level offsets slightly so all three panels are visible simultaneously.
// z-index steps up per level so the innermost drawer always sits on top.

const drawerContentStyle = (level: 1 | 2 | 3): React.CSSProperties => {
    // Each successive drawer is narrower and inset from the right edge,
    // creating a visible stack effect.
    const insetMap = { 1: '0px', 2: '1.5rem', 3: '3rem' };
    const widthMap  = { 1: 'min(26rem, 85vw)', 2: 'min(24rem, 85vw)', 3: 'min(22rem, 85vw)' };
    const zMap      = { 1: 1000, 2: 1010, 3: 1020 };

    return {
        right: insetMap[level],
        width: widthMap[level],
        zIndex: zMap[level],
    };
};

export const NestedDrawers: Story = {
    render: () => (
        // Level 1 — outermost
        <Drawer.Root swipeDirection="right">
            <Drawer.Trigger>
                <>Open Settings</>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content style={drawerContentStyle(1)}>
                    <Drawer.Title>Settings</Drawer.Title>
                    <Drawer.Description>
                        Manage your account and preferences.
                    </Drawer.Description>

                    <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            Open the profile panel to edit your personal details.
                        </p>

                        {/* Level 2 — nested inside level 1 */}
                        <Drawer.Root swipeDirection="right">
                            <Drawer.Trigger>
                                <>Edit Profile →</>
                            </Drawer.Trigger>
                            <Drawer.Portal>
                                <Drawer.Overlay />
                                <Drawer.Content style={drawerContentStyle(2)}>
                                    <Drawer.Title>Edit Profile</Drawer.Title>
                                    <Drawer.Description>
                                        Update your name, email, and avatar.
                                    </Drawer.Description>

                                    <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {(['Name', 'Email'] as const).map((field) => (
                                            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                                                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--rad-ui-text-primary)' }}>
                                                    {field}
                                                </label>
                                                <input
                                                    type={field === 'Email' ? 'email' : 'text'}
                                                    defaultValue={field === 'Email' ? '[email]' : '[name]'}
                                                    style={{
                                                        padding: '0.5rem 0.75rem',
                                                        borderRadius: 'var(--rad-ui-radius-md)',
                                                        border: '1px solid var(--rad-ui-border-soft)',
                                                        background: 'var(--rad-ui-surface-panel)',
                                                        color: 'var(--rad-ui-text-primary)',
                                                        fontSize: '0.875rem',
                                                        outline: 'none',
                                                    }}
                                                />
                                            </div>
                                        ))}

                                        <p style={{ fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                            Need to change your password? Open security settings.
                                        </p>

                                        {/* Level 3 — nested inside level 2 */}
                                        <Drawer.Root swipeDirection="right">
                                            <Drawer.Trigger>
                                                <>Security Settings →</>
                                            </Drawer.Trigger>
                                            <Drawer.Portal>
                                                <Drawer.Overlay />
                                                <Drawer.Content style={drawerContentStyle(3)}>
                                                    <Drawer.Title>Security</Drawer.Title>
                                                    <Drawer.Description>
                                                        Change your password and manage two-factor authentication.
                                                    </Drawer.Description>

                                                    <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                        {(['Current password', 'New password', 'Confirm password'] as const).map((field) => (
                                                            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                                                                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--rad-ui-text-primary)' }}>
                                                                    {field}
                                                                </label>
                                                                <input
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                    style={{
                                                                        padding: '0.5rem 0.75rem',
                                                                        borderRadius: 'var(--rad-ui-radius-md)',
                                                                        border: '1px solid var(--rad-ui-border-soft)',
                                                                        background: 'var(--rad-ui-surface-panel)',
                                                                        color: 'var(--rad-ui-text-primary)',
                                                                        fontSize: '0.875rem',
                                                                        outline: 'none',
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                                                            <Drawer.Close asChild>
                                                                <Button>Cancel</Button>
                                                            </Drawer.Close>
                                                            <Drawer.Close asChild>
                                                                <Button>Save password</Button>
                                                            </Drawer.Close>
                                                        </div>
                                                    </div>

                                                    <Drawer.Close>
                                                        <X width={15} height={15} />
                                                    </Drawer.Close>
                                                </Drawer.Content>
                                            </Drawer.Portal>
                                        </Drawer.Root>
                                    </div>

                                    <Drawer.Close>
                                        <X width={15} height={15} />
                                    </Drawer.Close>
                                </Drawer.Content>
                            </Drawer.Portal>
                        </Drawer.Root>
                    </div>

                    <Drawer.Close>
                        <X width={15} height={15} />
                    </Drawer.Close>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
};
