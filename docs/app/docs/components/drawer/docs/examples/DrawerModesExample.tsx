'use client'

import Drawer from '@radui/ui/Drawer'

const modes = [
    { label: 'Modal', value: true },
    { label: 'Non-modal', value: false },
    { label: 'Trap focus', value: 'trap-focus' },
] as const

export default function DrawerModesExample() {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {modes.map((mode) => (
                <Drawer.Root key={mode.label} modal={mode.value} swipeDirection="right">
                    <Drawer.Trigger>{mode.label}</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Title>{mode.label} drawer</Drawer.Title>
                            <Drawer.Description>
                                Use this mode to tune focus, scroll, and outside interaction behavior.
                            </Drawer.Description>
                            <div style={{ padding: '0 1.25rem 1.25rem' }}>
                                <Drawer.Close>Close</Drawer.Close>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            ))}
        </div>
    )
}
