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

function LimitInner() {
    const manager = Toast.useToastManager()

    useEffect(() => () => {
        ToastState.dismissAll()
    }, [])

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
            <Toaster />
            <p className="text-sm text-gray-800">
                <code className="text-xs">limit</code> caps the visible stack. Extra toasts queue until a slot
                opens.
            </p>
            <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={() => manager.add({ title: `Toast ${Date.now()}` })}>
                    Add toast
                </Button>
                <Button type="button" onClick={() => manager.close()}>
                    Close all
                </Button>
            </div>
        </div>
    )
}

export default function ToastLimitExample() {
    return (
        <Toast.Provider position="bottom-right" gap={14} limit={2}>
            <LimitInner />
        </Toast.Provider>
    )
}
