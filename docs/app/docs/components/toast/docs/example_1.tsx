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

function StackingInner() {
    const manager = Toast.useToastManager()

    useEffect(() => () => {
        ToastState.dismissAll()
    }, [])

    return (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
            <Toaster />
            <p className="text-sm text-gray-800">
                Click repeatedly to stack. Hover the stack to expand every toast.
            </p>
            <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={() => manager.add({ title: 'Changes saved.' })}>
                    Default
                </Button>
                <Button
                    type="button"
                    onClick={() => manager.add({ title: 'File uploaded.', variant: 'success' })}>
                    Success
                </Button>
                <Button
                    type="button"
                    onClick={() => manager.add({ title: 'Something went wrong.', variant: 'error' })}>
                    Error
                </Button>
            </div>
        </div>
    )
}

export default function ToastStackingExample() {
    return (
        <Toast.Provider position="bottom-right" gap={14} limit={3}>
            <StackingInner />
        </Toast.Provider>
    )
}
