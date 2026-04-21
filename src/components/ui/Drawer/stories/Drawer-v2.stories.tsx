import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Drawer from '../Drawer';
import type { DrawerRootActions } from '../Drawer';
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

const DrawerShell = ({
    swipeDirection = 'right' as Direction,
    label = 'Open Drawer',
    children
}: {
    swipeDirection?: Direction;
    label?: string;
    children: React.ReactNode;
}) => (
    <Drawer.Root swipeDirection={swipeDirection}>
        <Drawer.Trigger><>{label}</></Drawer.Trigger>
        <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
                {children}
                <Drawer.Close><X width={15} height={15} /></Drawer.Close>
            </Drawer.Content>
        </Drawer.Portal>
    </Drawer.Root>
);

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
    render: () => (
        <DrawerShell swipeDirection="right" label="Open Drawer (from right)">
            <Drawer.Title>Drawer</Drawer.Title>
            <Drawer.Description>Slides in from the right.</Drawer.Description>
        </DrawerShell>
    )
};

export const AllDirections: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {(['right', 'left', 'top', 'bottom'] as Direction[]).map((dir) => (
                <DrawerShell key={dir} swipeDirection={dir} label={`From ${dir}`}>
                    <Drawer.Title>Drawer</Drawer.Title>
                    <Drawer.Description>Slides in from the {dir}.</Drawer.Description>
                </DrawerShell>
            ))}
        </div>
    )
};

// ── Controlled open state ──────────────────────────────────────────────────

export const Controlled: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button onClick={() => setOpen(true)}>Open</Button>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </div>
                <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
                    <Drawer.Trigger><>Open via trigger</></Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Title>Controlled Drawer</Drawer.Title>
                            <Drawer.Description>
                                Controlled via the <code>open</code> + <code>onOpenChange</code> props.
                            </Drawer.Description>
                            <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        );
    }
};

// ── defaultOpen ────────────────────────────────────────────────────────────

export const DefaultOpen: Story = {
    render: () => (
        <Drawer.Root defaultOpen swipeDirection="right">
            <Drawer.Trigger><>Re-open</></Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Title>Initially Open</Drawer.Title>
                    <Drawer.Description>
                        This drawer opens immediately via <code>defaultOpen</code>.
                    </Drawer.Description>
                    <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
};

// ── actionsRef — imperative close ──────────────────────────────────────────

export const ImperativeActions: Story = {
    render: () => {
        const actionsRef = useRef<DrawerRootActions | null>(null);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Button onClick={() => actionsRef.current?.close()}>
                    Close via actionsRef
                </Button>
                <Drawer.Root actionsRef={actionsRef} swipeDirection="right">
                    <Drawer.Trigger><>Open Drawer</></Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Title>Imperative Close</Drawer.Title>
                            <Drawer.Description>
                                The button above uses <code>actionsRef.current.close()</code> to close this drawer from outside.
                            </Drawer.Description>
                            <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        );
    }
};

// ── disablePointerDismissal ────────────────────────────────────────────────

export const DisablePointerDismissal: Story = {
    render: () => (
        <Drawer.Root swipeDirection="right" disablePointerDismissal>
            <Drawer.Trigger><>Open (no outside-click close)</></Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Title>Pointer Dismissal Disabled</Drawer.Title>
                    <Drawer.Description>
                        Clicking outside or on the overlay does nothing , Even escape doesnt do anything. Use the close btn.
                    </Drawer.Description>
                    <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
};

// ── modal modes ────────────────────────────────────────────────────────────

export const ModalModes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {([true, false, 'trap-focus'] as const).map((mode) => (
                <Drawer.Root key={String(mode)} swipeDirection="right" modal={mode}>
                    <Drawer.Trigger><>modal={String(mode)}</></Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Title>modal={String(mode)}</Drawer.Title>
                            <Drawer.Description>
                                {mode === true && 'Focus trapped, scroll locked, outside pointer events disabled.'}
                                {mode === false && 'Full document interaction allowed. No focus trap, no scroll lock.'}
                                {mode === 'trap-focus' && 'Focus trapped, but scroll and outside pointer events remain enabled.'}
                            </Drawer.Description>
                            <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            ))}
        </div>
    )
};

// ── onOpenChangeComplete ───────────────────────────────────────────────────

export const OnOpenChangeComplete: Story = {
    render: () => {
        const [log, setLog] = useState<string[]>([]);
        const addLog = (msg: string) => setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Drawer.Root
                    swipeDirection="right"
                    onOpenChange={(open) => addLog(`onOpenChange(${open})`)}
                    onOpenChangeComplete={(open) => addLog(`onOpenChangeComplete(${open}) ← animation done`)}
                >
                    <Drawer.Trigger><>Open Drawer</></Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Title>Animation Callbacks</Drawer.Title>
                            <Drawer.Description>
                                Watch the log below — <code>onOpenChangeComplete</code> fires after the animation finishes.
                            </Drawer.Description>
                            <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
                <div
                    style={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        color: 'var(--rad-ui-text-secondary)',
                        background: 'var(--rad-ui-surface-subtle)',
                        border: '1px solid var(--rad-ui-border-soft)',
                        borderRadius: 'var(--rad-ui-radius-md)',
                        padding: '0.75rem',
                        minWidth: '22rem',
                        minHeight: '5rem'
                    }}>
                    {log.length === 0 ? 'Open/close the drawer to see events…' : log.map((l, i) => <div key={i}>{l}</div>)}
                </div>
            </div>
        );
    }
};

// ── Handle ────────────────────────────────────────────────────────────────

export const WithHandle: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {(['right', 'left', 'top', 'bottom'] as Direction[]).map((dir) => (
                <Drawer.Root key={dir} swipeDirection={dir}>
                    <Drawer.Trigger><>From {dir}</></Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Handle />
                            <Drawer.Title>Drawer with Handle</Drawer.Title>
                            <Drawer.Description>
                                Drag the handle outward past the threshold to close, or inward to feel the rubber-band spring.
                            </Drawer.Description>
                            <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            ))}
        </div>
    )
};

// ── Snap points ────────────────────────────────────────────────────────────

export const SnapPoints: Story = {
    render: () => {
        const [snapPoint, setSnapPoint] = useState<number | string | null>(0.4);

        return (
            <Drawer.Root
                swipeDirection="bottom"
                snapPoints={[0.4, 0.7, 1]}
                snapPoint={snapPoint}
                onSnapPointChange={setSnapPoint}
            >
                <Drawer.Trigger><>Open with snap points</></Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Title>Snap Points</Drawer.Title>
                        <Drawer.Description>
                            Active snap point: <strong>{snapPoint}</strong>
                        </Drawer.Description>
                        <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {[0.4, 0.7, 1].map((p) => (
                                <Button key={p} onClick={() => setSnapPoint(p)}>
                                    Snap to {p * 100}%
                                </Button>
                            ))}
                        </div>
                        <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        );
    }
};

// ── Nested with handles (initially open) ──────────────────────────────────

export const NestedWithHandles: Story = {
    render: () => (
        <Drawer.Root swipeDirection="right">
            <Drawer.Trigger><>Open Settings</></Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Handle />
                    <Drawer.Title>Settings</Drawer.Title>
                    <Drawer.Description>Manage your account and preferences.</Drawer.Description>

                    <Drawer.Root swipeDirection="right" defaultOpen>
                        <Drawer.Trigger><>Edit Profile →</></Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Overlay />
                            <Drawer.Content>
                                <Drawer.Handle />
                                <Drawer.Title>Edit Profile</Drawer.Title>
                                <Drawer.Description>Update your name and email.</Drawer.Description>

                                <Drawer.Root swipeDirection="right">
                                    <Drawer.Trigger><>Security Settings →</></Drawer.Trigger>
                                    <Drawer.Portal>
                                        <Drawer.Overlay />
                                        <Drawer.Content>
                                            <Drawer.Handle />
                                            <Drawer.Title>Security</Drawer.Title>
                                            <Drawer.Description>Change your password and 2FA.</Drawer.Description>
                                            <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                                        </Drawer.Content>
                                    </Drawer.Portal>
                                </Drawer.Root>

                                <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>

                    <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
};

const innerPad: React.CSSProperties = { padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' };

type Dir = 'right' | 'left' | 'top' | 'bottom';

const DirectionSelector = ({ value, onChange }: { value: Dir; onChange: (d: Dir) => void }) => (
    <div style={{ padding: '0 1.25rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--rad-ui-text-secondary)', fontFamily: 'monospace' }}>direction:</span>
        {(['right', 'left', 'top', 'bottom'] as Dir[]).map((d) => (
            <button
                key={d}
                onClick={() => onChange(d)}
                style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--rad-ui-radius-md)',
                    border: '1px solid var(--rad-ui-border-soft)',
                    background: value === d ? 'var(--rad-ui-surface-active)' : 'var(--rad-ui-surface-subtle)',
                    color: value === d ? 'var(--rad-ui-text-primary)' : 'var(--rad-ui-text-secondary)',
                    cursor: 'pointer',
                    fontWeight: value === d ? 600 : 400
                }}
            >
                {d}
            </button>
        ))}
    </div>
);

export const NestedDrawers: Story = {
    render: () => {
        const [dir, setDir] = useState<Dir>('right');

        return (
            <Drawer.Root swipeDirection={dir}>
                <Drawer.Trigger><>Open Settings</></Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Title>Settings</Drawer.Title>
                        <Drawer.Description>Manage your account and preferences.</Drawer.Description>
                        <DirectionSelector value={dir} onChange={setDir} />
                        <div style={innerPad}>
                            <Drawer.Root swipeDirection={dir}>
                                <Drawer.Trigger><>Edit Profile →</></Drawer.Trigger>
                                <Drawer.Portal>
                                    <Drawer.Overlay />
                                    <Drawer.Content>
                                        <Drawer.Title>Edit Profile</Drawer.Title>
                                        <Drawer.Description>Update your name and email.</Drawer.Description>
                                        <DirectionSelector value={dir} onChange={setDir} />
                                        <div style={innerPad}>
                                            <Drawer.Root swipeDirection={dir}>
                                                <Drawer.Trigger><>Security Settings →</></Drawer.Trigger>
                                                <Drawer.Portal>
                                                    <Drawer.Overlay />
                                                    <Drawer.Content>
                                                        <Drawer.Title>Security</Drawer.Title>
                                                        <Drawer.Description>Change your password and 2FA.</Drawer.Description>
                                                        <DirectionSelector value={dir} onChange={setDir} />
                                                        <div style={innerPad}>
                                                            <Drawer.Root swipeDirection={dir}>
                                                                <Drawer.Trigger><>Connected Apps →</></Drawer.Trigger>
                                                                <Drawer.Portal>
                                                                    <Drawer.Overlay />
                                                                    <Drawer.Content>
                                                                        <Drawer.Title>Connected Apps</Drawer.Title>
                                                                        <Drawer.Description>Manage third-party app access.</Drawer.Description>
                                                                        <DirectionSelector value={dir} onChange={setDir} />
                                                                        <div style={innerPad}>
                                                                            <Drawer.Root swipeDirection={dir}>
                                                                                <Drawer.Trigger><>Danger Zone →</></Drawer.Trigger>
                                                                                <Drawer.Portal>
                                                                                    <Drawer.Overlay />
                                                                                    <Drawer.Content>
                                                                                        <Drawer.Title>Danger Zone</Drawer.Title>
                                                                                        <Drawer.Description>Irreversible account actions.</Drawer.Description>
                                                                                        <DirectionSelector value={dir} onChange={setDir} />
                                                                                        <div style={innerPad}>
                                                                                            <Drawer.Root swipeDirection={dir}>
                                                                                                <Drawer.Trigger><>Delete Account →</></Drawer.Trigger>
                                                                                                <Drawer.Portal>
                                                                                                    <Drawer.Overlay />
                                                                                                    <Drawer.Content>
                                                                                                        <Drawer.Title>Delete Account</Drawer.Title>
                                                                                                        <Drawer.Description>This cannot be undone. Are you sure?</Drawer.Description>
                                                                                                        <DirectionSelector value={dir} onChange={setDir} />
                                                                                                        <div style={{ ...innerPad, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                                                                            <Drawer.Close asChild><Button>Cancel</Button></Drawer.Close>
                                                                                                            <Drawer.Close asChild><Button>Delete</Button></Drawer.Close>
                                                                                                        </div>
                                                                                                        <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                                                                                                    </Drawer.Content>
                                                                                                </Drawer.Portal>
                                                                                            </Drawer.Root>
                                                                                        </div>
                                                                                        <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                                                                                    </Drawer.Content>
                                                                                </Drawer.Portal>
                                                                            </Drawer.Root>
                                                                        </div>
                                                                        <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                                                                    </Drawer.Content>
                                                                </Drawer.Portal>
                                                            </Drawer.Root>
                                                        </div>
                                                        <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                                                    </Drawer.Content>
                                                </Drawer.Portal>
                                            </Drawer.Root>
                                        </div>
                                        <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                                    </Drawer.Content>
                                </Drawer.Portal>
                            </Drawer.Root>
                        </div>
                        <Drawer.Close><X width={15} height={15} /></Drawer.Close>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        );
    }
};
