"use client"

import Menubar from "@radui/ui/Menubar"

const MenubarExample = () => {
    return (
        <Menubar.Root>
            <Menubar.Menu>
                <Menubar.Trigger>File</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content>
                        <Menubar.Item>New File</Menubar.Item>
                        <Menubar.Item>Open...</Menubar.Item>
                        <Menubar.Separator />
                        <Menubar.Item>Save</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>
            <Menubar.Menu>
                <Menubar.Trigger>Edit</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content>
                        <Menubar.Item>Undo</Menubar.Item>
                        <Menubar.Item>Redo</Menubar.Item>
                        <Menubar.Separator />
                        <Menubar.Item>Cut</Menubar.Item>
                        <Menubar.Item>Copy</Menubar.Item>
                        <Menubar.Item>Paste</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>
            <Menubar.Menu>
                <Menubar.Trigger>View</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content>
                        <Menubar.Item>Zoom In</Menubar.Item>
                        <Menubar.Item>Zoom Out</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>
        </Menubar.Root>
    )
}

export default MenubarExample
