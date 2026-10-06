'use client'

import { useEffect, useMemo, useState } from 'react'
import Toast, { createToastManager } from '@radui/ui/Toast'
import type { ToastData } from '@radui/ui/Toast'
import Button from '@radui/ui/Button'

const POSITIONS = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
] as const

type Corner = (typeof POSITIONS)[number]

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

function PositionsInner({
    position,
    setPosition,
}: {
    position: Corner
    setPosition: (p: Corner) => void
}) {
    const manager = Toast.useToastManager()

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
            <Toaster />
            <p className="text-sm text-gray-950">
                <code className="text-xs">position</code> on{' '}
                <code className="text-xs">Toast.Provider</code> moves the viewport to each corner or edge.
            </p>
            <div className="flex flex-wrap gap-2">
                {POSITIONS.map((p) => (
                    <Button
                        key={p}
                        type="button"
                        color={p === position ? 'green' : undefined}
                        onClick={() => {
                            setPosition(p)
                            manager.add({ title: `Position: ${p}` })
                        }}>
                        {p.replace('-', ' ')}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default function ToastPositionsExample() {
    // Each example owns its queue; the default singleton would show every toast in every example on the page.
    const toastManager = useMemo(() => createToastManager(), [])
    // Clear this example's toasts when it unmounts. Key the effect on the
    // stable manager instance, not on the useToastManager() return value,
    // which changes every time the toast list does.
    useEffect(() => () => toastManager.dismissAll(), [toastManager])
    const [position, setPosition] = useState<Corner>('bottom-right')

    return (
        <Toast.Provider toastManager={toastManager} key={position} position={position} gap={12} limit={2}>
            <PositionsInner position={position} setPosition={setPosition} />
        </Toast.Provider>
    )
}
