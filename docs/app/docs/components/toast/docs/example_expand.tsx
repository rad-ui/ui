'use client'

import { useEffect, useMemo } from 'react'
import Toast, { createToastManager } from '@radui/ui/Toast'
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
                            <Toast.Close />
                        </Toast.Content>
                    </Toast.Root>
                ))}
            </Toast.Viewport>
        </Toast.Portal>
    )
}

function ExpandInner() {
    const manager = Toast.useToastManager()

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
            <Toaster />
            <p className="text-sm text-gray-950">
                <code className="text-xs">expand</code> keeps every toast fully visible — no stacked peek
                layout.
            </p>
            <Button type="button" onClick={() => manager.add({ title: `Toast ${Date.now()}` })}>
                Add toast
            </Button>
        </div>
    )
}

export default function ToastExpandExample() {
    // Each example owns its queue; the default singleton would show every toast in every example on the page.
    const toastManager = useMemo(() => createToastManager(), [])
    // Clear this example's toasts when it unmounts. Key the effect on the
    // stable manager instance, not on the useToastManager() return value,
    // which changes every time the toast list does.
    useEffect(() => () => toastManager.dismissAll(), [toastManager])
    return (
        <Toast.Provider toastManager={toastManager} position="bottom-right" expand maxToasts={5}>
            <ExpandInner />
        </Toast.Provider>
    )
}
