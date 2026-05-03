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

function IsolatedInner() {
    const manager = Toast.useToastManager()

    return (
        <>
            <Toaster />
            <Button
                type="button"
                onClick={() => manager.add({ title: 'Uses an isolated queue', variant: 'info' })}>
                Add (isolated manager)
            </Button>
        </>
    )
}

export default function ToastIsolatedManagerExample() {
    const tm = useMemo(() => createToastManager({ timeout: 4000 }), [])

    useEffect(() => () => {
        tm.close()
    }, [tm])

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
            <p className="text-sm text-gray-800">
                Pass <code className="text-xs">toastManager=&#123;createToastManager()&#125;</code> to keep
                notifications separate from the default singleton.
            </p>
            <Toast.Provider toastManager={tm} position="bottom-right" limit={2}>
                <IsolatedInner />
            </Toast.Provider>
        </div>
    )
}
