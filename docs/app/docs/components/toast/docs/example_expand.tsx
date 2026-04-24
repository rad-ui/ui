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

    useEffect(() => () => {
        ToastState.dismissAll()
    }, [])

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
            <Toaster />
            <p className="text-sm text-gray-800">
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
    return (
        <Toast.Provider position="bottom-right" expand maxToasts={5}>
            <ExpandInner />
        </Toast.Provider>
    )
}
