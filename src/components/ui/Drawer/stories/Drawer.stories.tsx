import React from 'react';
import { X } from 'lucide-react';
import Drawer from '../Drawer';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const STORY_STACK_STYLE: React.CSSProperties = {
    display: 'grid',
    gap: '0.75rem',
    marginTop: '0.25rem'
};

const STORY_SURFACE_STYLE: React.CSSProperties = {
    padding: '0.875rem 0.9rem',
    border: '1px solid var(--rad-ui-border-soft)',
    borderRadius: 'var(--rad-ui-radius-lg)',
    background: 'color-mix(in oklab, var(--rad-ui-surface-subtle) 70%, white)'
};

const STORY_PANEL_STYLE: React.CSSProperties = {
    position: 'relative',
    minHeight: '26rem',
    padding: '1rem',
    borderRadius: '1rem',
    border: '1px dashed var(--rad-ui-border-soft)',
    background:
        'radial-gradient(circle at center, color-mix(in oklab, var(--rad-ui-surface-subtle) 62%, white), transparent 68%)'
};

const StoryList = ({ items }: { items: string[] }) => (
    <div style={STORY_STACK_STYLE}>
        {items.map((item) => (
            <div key={item} style={STORY_SURFACE_STYLE}>
                {item}
            </div>
        ))}
    </div>
);

const StoryField = ({ children }: { children: React.ReactNode }) => <div style={STORY_SURFACE_STYLE}>{children}</div>;

const StoryPanel = ({ children }: { children: React.ReactNode }) => (
    <div style={STORY_PANEL_STYLE}>{children}</div>
);

const AnimatedDrawerStory = () => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const previousOpenRef = React.useRef(open);

    React.useEffect(() => {
        if (previousOpenRef.current && !open) {
            requestAnimationFrame(() => {
                triggerRef.current?.focus();
            });
        }

        previousOpenRef.current = open;
    }, [open]);

    return (
        <SandboxEditor>
            {/* TODO: forceMount is required for enter/exit swipe animation here, but
                focus will not return to Drawer.Trigger on close until the shared
                dialog forceMount focus-restoration gap is fixed. */}
            <Drawer.Root open={open} onOpenChange={setOpen}>
                <Drawer.Trigger ref={triggerRef}>Open Animated Drawer</Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Backdrop
                        forceMount
                        style={{
                            transitionDuration: '420ms',
                            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    />
                    <Drawer.Viewport>
                        <Drawer.Popup
                            forceMount
                            style={{
                                transitionDuration: '420ms',
                                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            <Drawer.Content>
                                <Drawer.Close aria-label='Close drawer'>
                                    <X size={16} strokeWidth={2} />
                                </Drawer.Close>
                                <Drawer.Title>Activity Feed</Drawer.Title>
                                <Drawer.Description>
                                    This example uses a bottom sheet so you can drag downward from the
                                    sheet header area to dismiss it.
                                </Drawer.Description>
                                <StoryList
                                    items={[
                                        'Design review',
                                        'Build pipeline',
                                        'Marketing copy'
                                    ]}
                                />
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            </Drawer.Root>
        </SandboxEditor>
    );
};

export default {
    title: 'Components/Drawer',
    component: Drawer,
    render: () => {
        return (
            <SandboxEditor>
                <Drawer.Root swipeDirection='right'>
                    <Drawer.Trigger>Open Drawer</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Backdrop />
                        <Drawer.Viewport>
                            <Drawer.Popup>
                                <Drawer.Content>
                                    <Drawer.Close aria-label='Close drawer'>
                                        <X size={16} strokeWidth={2} />
                                    </Drawer.Close>
                                    <Drawer.Title>Filters</Drawer.Title>
                                    <Drawer.Description>
                                        A slide-in surface for settings, navigation, or secondary tasks.
                                    </Drawer.Description>
                                </Drawer.Content>
                            </Drawer.Popup>
                        </Drawer.Viewport>
                    </Drawer.Portal>
                </Drawer.Root>
            </SandboxEditor>
        );
    }
} as any;

export const Default = {};

export const BottomSheet = {
    render: () => (
        <SandboxEditor>
            <Drawer.Root>
                <Drawer.Trigger>Open Sheet</Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Backdrop />
                    <Drawer.Viewport>
                        <Drawer.Popup>
                            <Drawer.Content>
                                <Drawer.Close aria-label='Close drawer'>
                                    <X size={16} strokeWidth={2} />
                                </Drawer.Close>
                                <Drawer.Title>Notifications</Drawer.Title>
                                <Drawer.Description>
                                    This uses the default bottom-sheet direction.
                                </Drawer.Description>
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            </Drawer.Root>
        </SandboxEditor>
    )
};

export const Animated = {
    render: () => <AnimatedDrawerStory />
};

export const Nested = {
    render: () => (
        <SandboxEditor>
            <Drawer.Root>
                <Drawer.Trigger>Open Parent Drawer</Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Backdrop />
                    <Drawer.Viewport>
                        <Drawer.Popup>
                            <Drawer.Content>
                                <Drawer.Close aria-label='Close parent drawer'>
                                    <X size={16} strokeWidth={2} />
                                </Drawer.Close>
                                <Drawer.Title>Parent Drawer</Drawer.Title>
                                <Drawer.Description>
                                    Nested drawers keep their own open state and focus flow.
                                </Drawer.Description>
                                <div style={STORY_STACK_STYLE}>
                                    <StoryField>
                                        Prepare the outer sheet, then open a second sheet from inside it.
                                    </StoryField>
                                    <Drawer.Root>
                                        <Drawer.Trigger>Open Child Drawer</Drawer.Trigger>
                                        <Drawer.Portal>
                                            <Drawer.Backdrop />
                                            <Drawer.Viewport>
                                                <Drawer.Popup>
                                                    <Drawer.Content>
                                                        <Drawer.Close aria-label='Close child drawer'>
                                                            <X size={16} strokeWidth={2} />
                                                        </Drawer.Close>
                                                        <Drawer.Title>Child Drawer</Drawer.Title>
                                                        <Drawer.Description>
                                                            This nested sheet stacks above the parent and can open one more level.
                                                        </Drawer.Description>
                                                        <div style={STORY_STACK_STYLE}>
                                                            <StoryField>Confirm details</StoryField>
                                                            <StoryField>Review summary</StoryField>
                                                            <Drawer.Root>
                                                                <Drawer.Trigger>Open Grandchild Drawer</Drawer.Trigger>
                                                                <Drawer.Portal>
                                                                    <Drawer.Backdrop />
                                                                    <Drawer.Viewport>
                                                                        <Drawer.Popup>
                                                                            <Drawer.Content>
                                                                                <Drawer.Close aria-label='Close grandchild drawer'>
                                                                                    <X size={16} strokeWidth={2} />
                                                                                </Drawer.Close>
                                                                                <Drawer.Title>Grandchild Drawer</Drawer.Title>
                                                                                <Drawer.Description>
                                                                                    A third level can still compose cleanly when each drawer owns
                                                                                    its own state and close control.
                                                                                </Drawer.Description>
                                                                                <StoryList
                                                                                    items={[
                                                                                        'Finalize changes',
                                                                                        'Check side effects',
                                                                                        'Submit updates'
                                                                                    ]}
                                                                                />
                                                                            </Drawer.Content>
                                                                        </Drawer.Popup>
                                                                    </Drawer.Viewport>
                                                                </Drawer.Portal>
                                                            </Drawer.Root>
                                                        </div>
                                                    </Drawer.Content>
                                                </Drawer.Popup>
                                            </Drawer.Viewport>
                                        </Drawer.Portal>
                                    </Drawer.Root>
                                </div>
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            </Drawer.Root>
        </SandboxEditor>
    )
};

export const SpawnPoints = {
    render: () => (
        <SandboxEditor>
            <StoryPanel>
                <div
                    style={{
                        position: 'absolute',
                        inset: '0',
                        display: 'grid',
                        placeItems: 'center'
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            zIndex: 0,
                            textAlign: 'center',
                            maxWidth: '20rem',
                            color: 'var(--rad-ui-text-secondary)'
                        }}
                    >
                        Open any of the four triggers to inspect the drawer spawn direction and default chrome.
                    </div>
                </div>

                <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)' }}>
                    <Drawer.Root swipeDirection='up'>
                        <Drawer.Trigger>Top</Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Backdrop />
                            <Drawer.Viewport>
                                <Drawer.Popup>
                                    <Drawer.Content>
                                        <Drawer.Close aria-label='Close top drawer'>
                                            <X size={16} strokeWidth={2} />
                                        </Drawer.Close>
                                        <Drawer.Title>Top Drawer</Drawer.Title>
                                        <Drawer.Description>
                                            Spawns from the top edge and slides downward into view.
                                        </Drawer.Description>
                                    </Drawer.Content>
                                </Drawer.Popup>
                            </Drawer.Viewport>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>

                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                    <Drawer.Root swipeDirection='right'>
                        <Drawer.Trigger>Right</Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Backdrop />
                            <Drawer.Viewport>
                                <Drawer.Popup>
                                    <Drawer.Content>
                                        <Drawer.Close aria-label='Close right drawer'>
                                            <X size={16} strokeWidth={2} />
                                        </Drawer.Close>
                                        <Drawer.Title>Right Drawer</Drawer.Title>
                                        <Drawer.Description>
                                            Spawns from the right edge as a traditional side panel.
                                        </Drawer.Description>
                                    </Drawer.Content>
                                </Drawer.Popup>
                            </Drawer.Viewport>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>

                <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)' }}>
                    <Drawer.Root swipeDirection='down'>
                        <Drawer.Trigger>Bottom</Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Backdrop />
                            <Drawer.Viewport>
                                <Drawer.Popup>
                                    <Drawer.Content>
                                        <Drawer.Close aria-label='Close bottom drawer'>
                                            <X size={16} strokeWidth={2} />
                                        </Drawer.Close>
                                        <Drawer.Title>Bottom Drawer</Drawer.Title>
                                        <Drawer.Description>
                                            Spawns from the bottom edge and supports drag-close behavior.
                                        </Drawer.Description>
                                    </Drawer.Content>
                                </Drawer.Popup>
                            </Drawer.Viewport>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>

                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                    <Drawer.Root swipeDirection='left'>
                        <Drawer.Trigger>Left</Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Backdrop />
                            <Drawer.Viewport>
                                <Drawer.Popup>
                                    <Drawer.Content>
                                        <Drawer.Close aria-label='Close left drawer'>
                                            <X size={16} strokeWidth={2} />
                                        </Drawer.Close>
                                        <Drawer.Title>Left Drawer</Drawer.Title>
                                        <Drawer.Description>
                                            Spawns from the left edge and slides into the viewport.
                                        </Drawer.Description>
                                    </Drawer.Content>
                                </Drawer.Popup>
                            </Drawer.Viewport>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>
            </StoryPanel>
        </SandboxEditor>
    )
};
