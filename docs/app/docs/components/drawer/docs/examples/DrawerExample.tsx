'use client'

import Drawer from '@radui/ui/Drawer'

export default function DrawerExample() {
    return (
        <Drawer.Root swipeDirection="right">
            <Drawer.Trigger>Open drawer</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Handle />
                    <Drawer.Title>Project settings</Drawer.Title>
                    <Drawer.Description>
                        Update workspace details without leaving the current page.
                    </Drawer.Description>
                    <div style={{ padding: '0 1.25rem 1.25rem' }}>
                        <Drawer.Close>Close</Drawer.Close>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
