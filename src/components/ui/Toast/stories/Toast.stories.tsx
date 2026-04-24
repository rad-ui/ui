import React, { useEffect, useState } from 'react';
import Toast from '../Toast';
import { ToastState } from '../ToastState';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

export default {
    title: 'Components/Toast',
    component: Toast.Provider,
    parameters: { layout: 'fullscreen' },
} as any;

// ─────────────────────────────────────────────────────────────────────────────
// Shared toaster — the composable viewport users build themselves
// ─────────────────────────────────────────────────────────────────────────────

function Toaster() {
    const { toasts } = Toast.useToastManager();

    return (
        <Toast.Portal>
            <Toast.Viewport>
                {toasts.map((t) => (
                    <Toast.Root key={t.id} toast={t}>
                        <Toast.Content>
                            <Toast.Title>{t.title}</Toast.Title>
                            {t.description && (
                                <Toast.Description>{t.description}</Toast.Description>
                            )}
                            <Toast.Close />
                        </Toast.Content>
                    </Toast.Root>
                ))}
            </Toast.Viewport>
        </Toast.Portal>
    );
}

// Dismiss all on story unmount so the singleton doesn't bleed between stories
function useCleanup() {
    useEffect(() => () => { ToastState.dismissAll(); }, []);
}

// ─────────────────────────────────────────────────────────────────────────────
// Stacking — the main showcase
// ─────────────────────────────────────────────────────────────────────────────
export const Stacking = {
    render: () => {
        useCleanup();
        const manager = Toast.useToastManager();

        return (
            <SandboxEditor>
                <Toast.Provider position="bottom-right" gap={14} maxToasts={3}>
                    <Toaster />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                            Click multiple times to stack. Hover the stack to expand.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button onClick={() => manager.add({ title: 'Changes saved.' })}>
                                Default
                            </Button>
                            <Button onClick={() => manager.add({ title: 'File uploaded.', variant: 'success' })}>
                                Success
                            </Button>
                            <Button onClick={() => manager.add({ title: 'Something went wrong.', variant: 'error' })}>
                                Error
                            </Button>
                        </div>
                    </div>
                </Toast.Provider>
            </SandboxEditor>
        );
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Preloaded — 3 toasts visible on load
// ─────────────────────────────────────────────────────────────────────────────
export const StackingPreloaded = {
    name: 'Stacking (preloaded)',
    render: () => {
        useCleanup();
        const manager = Toast.useToastManager();

        useEffect(() => {
            setTimeout(() => manager.add({ title: 'Third — oldest', variant: 'default' }), 0);
            setTimeout(() => manager.add({ title: 'Second notification', variant: 'info' }), 80);
            setTimeout(() => manager.add({ title: 'First — newest', variant: 'success' }), 160);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <SandboxEditor>
                <Toast.Provider position="bottom-right" gap={14} maxToasts={3}>
                    <Toaster />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                            3 toasts pre-loaded. Hover to expand.
                        </p>
                        <Button onClick={() => manager.add({ title: `Toast #${Math.floor(Math.random() * 100)}` })}>
                            Add another
                        </Button>
                    </div>
                </Toast.Provider>
            </SandboxEditor>
        );
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// With description
// ─────────────────────────────────────────────────────────────────────────────
export const WithDescription = {
    render: () => {
        useCleanup();
        const manager = Toast.useToastManager();

        return (
            <SandboxEditor>
                <Toast.Provider position="bottom-right">
                    <Toaster />
                    <Button onClick={() => manager.add({
                        title: 'Scheduled: Catch up',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
                    })}>
                        Show with description
                    </Button>
                </Toast.Provider>
            </SandboxEditor>
        );
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Varying heights — shows height-clamping in collapsed stack
// ─────────────────────────────────────────────────────────────────────────────
export const VaryingHeights = {
    name: 'Varying heights',
    render: () => {
        useCleanup();
        const manager = Toast.useToastManager();

        useEffect(() => {
            setTimeout(() => manager.add({ title: 'Short toast' }), 0);
            setTimeout(() => manager.add({ title: 'Medium toast', description: 'One line of description.' }), 80);
            setTimeout(() => manager.add({
                title: 'Tall toast',
                description: 'This toast has a longer description that wraps onto multiple lines to demonstrate how the height clamping works when toasts have different heights in the stack.',
            }), 160);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <SandboxEditor>
                <Toast.Provider position="bottom-right" gap={14} maxToasts={3}>
                    <Toaster />
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                        Back toasts are clamped to the front toast's height when collapsed. Hover to expand.
                    </p>
                </Toast.Provider>
            </SandboxEditor>
        );
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Expanded — always show all toasts
// ─────────────────────────────────────────────────────────────────────────────
export const Expanded = {
    render: () => {
        useCleanup();
        const manager = Toast.useToastManager();

        return (
            <SandboxEditor>
                <Toast.Provider position="bottom-right" expand maxToasts={5}>
                    <Toaster />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                            All toasts always expanded — no stacking.
                        </p>
                        <Button onClick={() => manager.add({ title: `Toast #${Math.floor(Math.random() * 100)}` })}>
                            Add toast
                        </Button>
                    </div>
                </Toast.Provider>
            </SandboxEditor>
        );
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Custom render — user controls the markup completely
// ─────────────────────────────────────────────────────────────────────────────
export const CustomRender = {
    name: 'Custom render',
    render: () => {
        useCleanup();
        const [count, setCount] = useState(0);
        const manager = Toast.useToastManager();

        return (
            <SandboxEditor>
                <Toast.Provider position="bottom-right">
                    {/* Custom viewport — user owns the markup */}
                    <Toast.Portal>
                        <Toast.Viewport>
                            {manager.toasts.map((t) => (
                                <Toast.Root key={t.id} toast={t}>
                                    <Toast.Content style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.25rem' }}>
                                            {t.variant === 'success' ? '✓' : t.variant === 'error' ? '✕' : '●'}
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            <Toast.Title>{t.title}</Toast.Title>
                                            {t.description && <Toast.Description>{t.description}</Toast.Description>}
                                        </div>
                                        <Toast.Close />
                                    </Toast.Content>
                                </Toast.Root>
                            ))}
                        </Toast.Viewport>
                    </Toast.Portal>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button onClick={() => {
                            setCount((c) => c + 1);
                            manager.add({
                                title: `Toast ${count + 1} created`,
                                description: 'This is a toast notification.',
                            });
                        }}>
                            Add toast
                        </Button>
                        <Button onClick={() => manager.dismissAll()}>
                            Dismiss all
                        </Button>
                    </div>
                </Toast.Provider>
            </SandboxEditor>
        );
    },
};
