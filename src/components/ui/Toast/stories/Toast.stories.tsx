import React, { useEffect, useMemo, useState } from 'react';
import Toast, { createToastManager } from '../Toast';
import type { ToastData } from '../contexts/ToastContext';
import { ToastState } from '../ToastState';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

export default {
    title: 'Components/Toast',
    component: Toast.Provider,
    parameters: { layout: 'fullscreen' }
} as any;

// ─────────────────────────────────────────────────────────────────────────────
// Toaster — must be rendered inside <Toast.Provider>
// ─────────────────────────────────────────────────────────────────────────────

function Toaster() {
    // useToastManager reads from ToastProviderContext — must be inside Provider
    const { toasts } = Toast.useToastManager();

    return (
        <Toast.Portal>
            <Toast.Viewport>
                {toasts.map((t: ToastData) => (
                    <Toast.Root key={t.id} toast={t}>
                        <Toast.Content>
                            <Toast.Title>{t.title}</Toast.Title>
                            {t.description && (
                                <Toast.Description>{t.description}</Toast.Description>
                            )}
                            {t.actionProps != null && <Toast.Action />}
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

function StackingDemo() {
    useCleanup();
    const manager = Toast.useToastManager();

    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                    Click multiple times to stack. Hover the stack to expand.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button onClick={() => manager.add({ title: 'Changes saved.' })}>Default</Button>
                    <Button onClick={() => manager.add({ title: 'File uploaded.', variant: 'success' })}>Success</Button>
                    <Button onClick={() => manager.add({ title: 'Something went wrong.', variant: 'error' })}>Error</Button>
                </div>
            </div>
        </>
    );
}

export const Stacking = {
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right" gap={14} limit={3}>
                <StackingDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// Preloaded — 3 toasts visible on load
// ─────────────────────────────────────────────────────────────────────────────

function PreloadedDemo() {
    useCleanup();
    const manager = Toast.useToastManager();

    useEffect(() => {
        setTimeout(() => manager.add({ title: 'Third — oldest', variant: 'default' }), 0);
        setTimeout(() => manager.add({ title: 'Second notification', variant: 'info' }), 80);
        setTimeout(() => manager.add({ title: 'First — newest', variant: 'success' }), 160);
    }, []);

    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                    3 toasts pre-loaded. Hover to expand.
                </p>
                <Button onClick={() => manager.add({ title: `Toast #${Math.floor(Math.random() * 100)}` })}>
                    Add another
                </Button>
            </div>
        </>
    );
}

export const StackingPreloaded = {
    name: 'Stacking (preloaded)',
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right" gap={14} maxToasts={3}>
                <PreloadedDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// With description
// ─────────────────────────────────────────────────────────────────────────────

function WithDescriptionDemo() {
    useCleanup();
    const manager = Toast.useToastManager();
    return (
        <>
            <Toaster />
            <Button
                onClick={() => manager.add({
                    title: 'Scheduled: Catch up',
                    description: 'Friday, February 10, 2023 at 5:57 PM'
                })}>
                Show with description
            </Button>
        </>
    );
}

export const WithDescription = {
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right">
                <WithDescriptionDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// Promise
// ─────────────────────────────────────────────────────────────────────────────

function PromiseToastDemo() {
    useCleanup();
    const manager = Toast.useToastManager();

    function runPromise() {
        manager.promise(
            new Promise<string>((resolve, reject) => {
                const shouldSucceed = Math.random() > 0.3;
                setTimeout(() => {
                    if (shouldSucceed) {
                        resolve('operation completed');
                    } else {
                        reject(new Error('operation failed'));
                    }
                }, 2000);
            }),
            {
                loading: 'Loading data…',
                success: (data: string) => `Success: ${data}`,
                error: (err: unknown) =>
                    `Error: ${err instanceof Error ? err.message : String(err)}`
            }
        );
    }

    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                    Persistent loading toast, then success or error (~70% / 30%)
                    <code style={{ fontSize: '0.8125rem' }}>useToastManager().promise()</code>.
                </p>
                <Button type="button" onClick={runPromise}>
                    Run promise
                </Button>
            </div>
        </>
    );
}

export const PromiseToast = {
    name: 'Promise',
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right" gap={14} maxToasts={3}>
                <PromiseToastDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// Stable id + pulse on duplicate (Base UI–style)
// ─────────────────────────────────────────────────────────────────────────────

const PULSE_TOAST_STORY_STYLE_ID = 'rad-ui-toast-pulse-story-css';

function usePulseStoryStyles() {
    useEffect(() => {
        if (typeof document === 'undefined') return;
        if (document.getElementById(PULSE_TOAST_STORY_STYLE_ID)) return;
        const el = document.createElement('style');
        el.id = PULSE_TOAST_STORY_STYLE_ID;
        el.textContent = `
@keyframes rad-ui-toast-pulse-scale-even {
  0%, 100% { transform: scale(1); }
  45% { transform: scale(1.04); }
}
@keyframes rad-ui-toast-pulse-scale-odd {
  0%, 100% { transform: scale(1); }
  40% { transform: scale(1.035); }
}
.rad-ui-toast-item[data-pulse="even"] .rad-ui-toast-content {
  transform-origin: center center;
  animation: rad-ui-toast-pulse-scale-even 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.rad-ui-toast-item[data-pulse="odd"] .rad-ui-toast-content {
  transform-origin: center center;
  animation: rad-ui-toast-pulse-scale-odd 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
`;
        document.head.appendChild(el);
        return () => {
            el.remove();
        };
    }, []);
}

function PulseDuplicateDemo() {
    useCleanup();
    usePulseStoryStyles();
    const manager = Toast.useToastManager();

    function saveDraft() {
        manager.add({
            id: 'save-status',
            title: 'Draft saved',
            description: 'Click again while it is visible to replay the pulse.'
        });
    }

    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                    Pass a stable <code style={{ fontSize: '0.8125rem' }}>id</code> on{' '}
                    <code style={{ fontSize: '0.8125rem' }}>add()</code>. Each duplicate bumps{' '}
                    <code style={{ fontSize: '0.8125rem' }}>toast.updateKey</code>; the card does a quick{' '}
                    expand/shrink scale pulse (no color flash).{' '}
                    <code style={{ fontSize: '0.8125rem' }}>data-pulse</code> alternates even/odd so the animation
                    restarts.
                </p>
                <Button type="button" onClick={saveDraft}>
                    Save draft
                </Button>
            </div>
        </>
    );
}

export const PulseDuplicateId = {
    name: 'Duplicate id (pulse)',
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right" gap={14} limit={3}>
                <PulseDuplicateDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// Action (Base UI `actionProps` + Toast.Action)
// ─────────────────────────────────────────────────────────────────────────────

function WithActionDemo() {
    useCleanup();
    const manager = Toast.useToastManager();

    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                    <code style={{ fontSize: '0.8125rem' }}>actionProps</code> is merged into{' '}
                    <code style={{ fontSize: '0.8125rem' }}>Toast.Action</code> (label via{' '}
                    <code style={{ fontSize: '0.8125rem' }}>children</code> or props).
                </p>
                <Button
                    type="button"
                    onClick={() => {
                        manager.add({
                            title: 'Unread messages',
                            description: 'You have new mail in your inbox.',
                            actionProps: {
                                children: 'Open',
                                onClick: () => manager.close()
                            }
                        });
                    }}
                >
                    Toast with action
                </Button>
            </div>
        </>
    );
}

export const WithAction = {
    name: 'With action',
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right" timeout={8000}>
                <WithActionDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// update() + close() (Base UI manager)
// ─────────────────────────────────────────────────────────────────────────────

function UpdateAndCloseDemo() {
    useCleanup();
    const manager = Toast.useToastManager();
    const storyId = 'toast-story-update';

    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                <Button
                    type="button"
                    onClick={() => {
                        manager.add({
                            id: storyId,
                            title: 'Progress: step 1',
                            description: 'Use Update to change copy without a new toast id.'
                        });
                    }}
                >
                    Add (stable id)
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        manager.update(storyId, {
                            title: 'Progress: step 2',
                            description: 'Updated via manager.update().'
                        });
                    }}
                >
                    Update
                </Button>
                <Button type="button" onClick={() => manager.close(storyId)}>
                    close(id)
                </Button>
                <Button type="button" onClick={() => manager.close()}>
                    close() all
                </Button>
            </div>
        </>
    );
}

export const UpdateAndClose = {
    name: 'Update & close',
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right" limit={3}>
                <UpdateAndCloseDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// Isolated toastManager (createToastManager)
// ─────────────────────────────────────────────────────────────────────────────

function IsolatedManagerInner() {
    const manager = Toast.useToastManager();
    return (
        <>
            <Toaster />
            <Button
                type="button"
                onClick={() => manager.add({ title: 'Uses non-singleton manager', variant: 'info' })}
            >
                Add (isolated queue)
            </Button>
        </>
    );
}

function IsolatedManagerDemo() {
    const tm = useMemo(() => createToastManager({ timeout: 4000 }), []);
    useEffect(() => () => {
        tm.close();
    }, [tm]);

    return (
        <Toast.Provider toastManager={tm} position="bottom-right" limit={2}>
            <IsolatedManagerInner />
        </Toast.Provider>
    );
}

export const IsolatedToastManager = {
    name: 'Isolated toastManager',
    render: () => (
        <SandboxEditor>
            <IsolatedManagerDemo />
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// Varying heights
// ─────────────────────────────────────────────────────────────────────────────

function VaryingHeightsDemo() {
    useCleanup();
    const manager = Toast.useToastManager();

    useEffect(() => {
        setTimeout(() => manager.add({ title: 'Short toast' }), 0);
        setTimeout(() => manager.add({ title: 'Medium toast', description: 'One line of description.' }), 80);
        setTimeout(() => manager.add({
            title: 'Tall toast',
            description: 'This toast has a longer description that wraps onto multiple lines to demonstrate how the height clamping works when toasts have different heights in the stack.'
        }), 160);
    }, []);

    return (
        <>
            <Toaster />
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                Back toasts are clamped to the front toast's height when collapsed. Hover to expand.
            </p>
        </>
    );
}

export const VaryingHeights = {
    name: 'Varying heights',
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right" gap={14} maxToasts={3}>
                <VaryingHeightsDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// Expanded
// ─────────────────────────────────────────────────────────────────────────────

function ExpandedDemo() {
    useCleanup();
    const manager = Toast.useToastManager();
    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rad-ui-text-secondary)' }}>
                    All toasts always expanded — no stacking.
                </p>
                <Button onClick={() => manager.add({ title: `Toast #${Math.floor(Math.random() * 100)}` })}>
                    Add toast
                </Button>
            </div>
        </>
    );
}

export const Expanded = {
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right" expand maxToasts={5}>
                <ExpandedDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};

// ─────────────────────────────────────────────────────────────────────────────
// Custom render
// ─────────────────────────────────────────────────────────────────────────────

function CustomRenderDemo() {
    useCleanup();
    const [count, setCount] = useState(0);
    const manager = Toast.useToastManager();

    return (
        <>
            <Toast.Portal>
                <Toast.Viewport>
                    {manager.toasts.map((t: ToastData) => (
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
                <Button
                    onClick={() => {
                        setCount((c) => c + 1);
                        manager.add({
                            title: `Toast ${count + 1} created`,
                            description: 'This is a toast notification.'
                        });
                    }}>
                    Add toast
                </Button>
                <Button onClick={() => manager.close()}>
                    Close all
                </Button>
            </div>
        </>
    );
}

export const CustomRender = {
    name: 'Custom render',
    render: () => (
        <SandboxEditor>
            <Toast.Provider position="bottom-right">
                <CustomRenderDemo />
            </Toast.Provider>
        </SandboxEditor>
    )
};
