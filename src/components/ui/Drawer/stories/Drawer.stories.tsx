import React from 'react';
import { X } from 'lucide-react';
import Drawer from '../Drawer';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

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
            <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection='right'>
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
                                    This example emphasizes the drawer panel swiping in with a slower,
                                    more obvious motion curve.
                                </Drawer.Description>
                                <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.25rem' }}>
                                    {['Design review', 'Build pipeline', 'Marketing copy'].map((item) => (
                                        <div
                                            key={item}
                                            style={{
                                                display: 'grid',
                                                gap: '0.4rem',
                                                padding: '0.875rem 0.9rem',
                                                border: '1px solid var(--rad-ui-border-soft)',
                                                borderRadius: 'var(--rad-ui-radius-lg)',
                                                background: 'color-mix(in oklab, var(--rad-ui-surface-subtle) 70%, white)'
                                            }}
                                        >
                                            <strong style={{ fontSize: '0.875rem', lineHeight: 1.2 }}>
                                                {item}
                                            </strong>
                                            <span
                                                style={{
                                                    fontSize: '0.8125rem',
                                                    color: 'var(--rad-ui-text-secondary)'
                                                }}
                                            >
                                                Static content, animated shell.
                                            </span>
                                        </div>
                                    ))}
                                </div>
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
