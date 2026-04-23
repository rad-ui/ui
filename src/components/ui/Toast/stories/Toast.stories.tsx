import React, { useEffect } from 'react';
import Toast, { toast, ToastState } from '../Toast';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

export default {
    title: 'Components/Toast',
    component: Toast.Provider,
    parameters: {
        layout: 'fullscreen',
    },
} as any;

// ─────────────────────────────────────────────────────────────────────────────
// Each story gets its own isolated provider so the singleton ToastState doesn't
// bleed between stories. We also dismiss all toasts on unmount.
// ─────────────────────────────────────────────────────────────────────────────

function IsolatedProvider({
    children,
    position = 'bottom-right' as const,
    expand = false,
    gap = 14,
    maxToasts = 5,
}: {
    children: React.ReactNode;
    position?: React.ComponentProps<typeof Toast.Provider>['position'];
    expand?: boolean;
    gap?: number;
    maxToasts?: number;
}) {
    // Dismiss all toasts when the story unmounts (navigating away)
    useEffect(() => () => { ToastState.dismissAll(); }, []);

    return (
        <SandboxEditor>
            <Toast.Provider position={position} expand={expand} gap={gap} maxToasts={maxToasts}>
                {children}
            </Toast.Provider>
        </SandboxEditor>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stacking — the main showcase
// ─────────────────────────────────────────────────────────────────────────────
export const Stacking = {
    render: () => {
        return (
            <IsolatedProvider position="bottom-right" gap={14} maxToasts={3}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                        Click the button multiple times to see toasts stack. Hover the stack to expand.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button onClick={() => toast('Your changes have been saved.')}>
                            Add toast
                        </Button>
                        <Button onClick={() => toast.success('File uploaded successfully.')}>
                            Add success
                        </Button>
                        <Button onClick={() => toast.error('Something went wrong.')}>
                            Add error
                        </Button>
                    </div>
                </div>
            </IsolatedProvider>
        );
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Stacking — pre-loaded so you see the effect immediately on load
// ─────────────────────────────────────────────────────────────────────────────
export const StackingPreloaded = {
    name: 'Stacking (preloaded)',
    render: () => {
        useEffect(() => {
            // Fire 3 toasts immediately so the stack is visible on load
            setTimeout(() => toast('Third notification — oldest'), 0);
            setTimeout(() => toast.info('Second notification'), 80);
            setTimeout(() => toast.success('First notification — newest'), 160);
            return () => { ToastState.dismissAll(); };
        }, []);

        return (
            <IsolatedProvider position="bottom-right" gap={14} maxToasts={3}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                        3 toasts pre-loaded. Hover the stack to expand. Click to add more.
                    </p>
                    <Button onClick={() => toast(`Toast #${Math.floor(Math.random() * 100)}`)}>
                        Add another
                    </Button>
                </div>
            </IsolatedProvider>
        );
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Default
// ─────────────────────────────────────────────────────────────────────────────
export const Default = {
    render: () => (
        <IsolatedProvider>
            <Button onClick={() => toast('Your changes have been saved.')}>
                Show toast
            </Button>
        </IsolatedProvider>
    ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────────────────────────────────────
export const Variants = {
    render: () => (
        <IsolatedProvider maxToasts={5}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button onClick={() => toast('Default notification')}>Default</Button>
                <Button onClick={() => toast.success('File uploaded successfully')}>Success</Button>
                <Button onClick={() => toast.error('Something went wrong')}>Error</Button>
                <Button onClick={() => toast.warning('Disk space is low')}>Warning</Button>
                <Button onClick={() => toast.info('A new version is available')}>Info</Button>
            </div>
        </IsolatedProvider>
    ),
};

// ─────────────────────────────────────────────────────────────────────────────
// With description
// ─────────────────────────────────────────────────────────────────────────────
export const WithDescription = {
    render: () => (
        <IsolatedProvider>
            <Button
                onClick={() =>
                    toast({
                        title: 'Scheduled: Catch up',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
                    })
                }
            >
                Show with description
            </Button>
        </IsolatedProvider>
    ),
};

// ─────────────────────────────────────────────────────────────────────────────
// With action
// ─────────────────────────────────────────────────────────────────────────────
export const WithAction = {
    render: () => (
        <IsolatedProvider>
            <Button
                onClick={() =>
                    toast({
                        title: 'File deleted',
                        description: 'The file has been permanently removed.',
                        action: {
                            label: 'Undo',
                            onClick: () => console.log('Undo clicked'),
                        },
                    })
                }
            >
                Show with action
            </Button>
        </IsolatedProvider>
    ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Promise
// ─────────────────────────────────────────────────────────────────────────────
export const PromiseToast = {
    name: 'Promise',
    render: () => (
        <IsolatedProvider>
            <Button
                onClick={() => {
                    const p = new globalThis.Promise<string>((resolve) =>
                        setTimeout(() => resolve('data'), 2000)
                    );
                    toast.promise(p, {
                        loading: 'Uploading file…',
                        success: 'Upload complete!',
                        error: 'Upload failed',
                    });
                }}
            >
                Trigger promise toast
            </Button>
        </IsolatedProvider>
    ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Expanded (always show all, no stacking)
// ─────────────────────────────────────────────────────────────────────────────
export const Expanded = {
    render: () => (
        <IsolatedProvider expand maxToasts={5}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                    All toasts are always expanded — no stacking.
                </p>
                <Button onClick={() => toast(`Toast #${Math.floor(Math.random() * 100)}`)}>
                    Add toast
                </Button>
            </div>
        </IsolatedProvider>
    ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Varying heights — shows the height-clamping behavior
// ─────────────────────────────────────────────────────────────────────────────
export const VaryingHeights = {
    name: 'Varying heights',
    render: () => {
        useEffect(() => {
            setTimeout(() => toast({ title: 'Short toast' }), 0);
            setTimeout(() => toast({
                title: 'Medium toast',
                description: 'This one has a description line.',
            }), 80);
            setTimeout(() => toast({
                title: 'Tall toast',
                description: 'This toast has a longer description that wraps onto multiple lines to demonstrate how the height clamping works when toasts have different heights.',
                action: { label: 'Undo', onClick: () => {} },
            }), 160);
            return () => { ToastState.dismissAll(); };
        }, []);

        return (
            <IsolatedProvider gap={14} maxToasts={3}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                        Toasts with different heights. Back toasts are clamped to the front toast's height when collapsed.
                        Hover to expand and see the full content.
                    </p>
                    <Button onClick={() => toast({ title: 'Another toast', description: 'With some extra content here.' })}>
                        Add toast
                    </Button>
                </div>
            </IsolatedProvider>
        );
    },
};
