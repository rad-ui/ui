'use client'

import { useEffect } from 'react'
import Toast, { ToastState } from '@radui/ui/Toast'
import type { ToastData } from '@radui/ui/Toast'
import Button from '@radui/ui/Button'

function Toaster() {
    const { toasts } = Toast.useToastManager()

    return (
        <Toast.Portal>
            <Toast.Viewport>
                {toasts.map((t: ToastData) => (
                    <Toast.Root key={t.id} toast={t}>
                        <Toast.Content>
                            <Toast.Title>{t.title}</Toast.Title>
                            {t.description ? (
                                <Toast.Description>{t.description}</Toast.Description>
                            ) : null}
                            {t.actionProps != null ? <Toast.Action /> : null}
                            <Toast.Close />
                        </Toast.Content>
                    </Toast.Root>
                ))}
            </Toast.Viewport>
        </Toast.Portal>
    )
}

function ActionInner() {
    const manager = Toast.useToastManager()

    useEffect(() => () => {
        ToastState.dismissAll()
    }, [])

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
            <Toaster />
            <p className="text-sm text-gray-800">
                Set <code className="text-xs">actionProps</code> on <code className="text-xs">add()</code>; they
                merge into <code className="text-xs">Toast.Action</code>.
            </p>
            <Button
                type="button"
                onClick={() => {
                    manager.add({
                        title: 'Unread messages',
                        description: 'You have new mail in your inbox.',
                        actionProps: {
                            children: 'Open',
                            onClick: () => manager.close(),
                        },
                    })
                }}>
                Toast with action
            </Button>
        </div>
    )
}

export default function ToastActionExample() {
    return (
        <Toast.Provider position="bottom-right" timeout={8000}>
            <ActionInner />
        </Toast.Provider>
    )
}
