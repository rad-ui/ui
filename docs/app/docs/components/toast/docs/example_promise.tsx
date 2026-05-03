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
                            <Toast.Close />
                        </Toast.Content>
                    </Toast.Root>
                ))}
            </Toast.Viewport>
        </Toast.Portal>
    )
}

function PromiseInner() {
    const manager = Toast.useToastManager()

    useEffect(() => () => {
        ToastState.dismissAll()
    }, [])

    function runPromise() {
        manager.promise(
            new Promise<string>((resolve, reject) => {
                const ok = Math.random() > 0.35
                setTimeout(() => {
                    if (ok) resolve('Done')
                    else reject(new Error('Failed'))
                }, 1800)
            }),
            {
                loading: 'Working…',
                success: (data: string) => `Success: ${data}`,
                error: (err: unknown) =>
                    `Error: ${err instanceof Error ? err.message : String(err)}`,
            },
        )
    }

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
            <Toaster />
            <p className="text-sm text-gray-800">
                <code className="text-xs">useToastManager().promise()</code> shows a loading toast, then
                resolves to success or error.
            </p>
            <Button type="button" onClick={runPromise}>
                Run async action
            </Button>
        </div>
    )
}

export default function ToastPromiseExample() {
    return (
        <Toast.Provider position="bottom-right" gap={14} limit={3}>
            <PromiseInner />
        </Toast.Provider>
    )
}
