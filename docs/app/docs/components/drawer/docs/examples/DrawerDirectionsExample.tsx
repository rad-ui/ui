'use client'

import Drawer from '@radui/ui/Drawer'

const directions = ['right', 'left', 'top', 'bottom'] as const

export default function DrawerDirectionsExample() {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {directions.map((direction) => (
                <Drawer.Root key={direction} swipeDirection={direction}>
                    <Drawer.Trigger>From {direction}</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content>
                            <Drawer.Handle />
                            <Drawer.Title>Drawer from {direction}</Drawer.Title>
                            <Drawer.Description>
                                The same composition supports each placement direction.
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
