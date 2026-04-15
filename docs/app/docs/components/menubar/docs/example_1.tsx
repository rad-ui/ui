"use client"

import Menubar from "@radui/ui/Menubar"

const MenubarExample = () => {
    return (
        <Menubar.Root>
            <Menubar.Menu>
                <Menubar.Trigger>File</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content>
                        <Menubar.Item label="New File">New File</Menubar.Item>
                        <Menubar.Item label="Open">Open...</Menubar.Item>
                        <Menubar.Separator />
                        <Menubar.Item label="Save">Save</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>
            <Menubar.Menu>
                <Menubar.Trigger>Edit</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content>
                        <Menubar.Item label="Undo">Undo</Menubar.Item>
                        <Menubar.Item label="Redo">Redo</Menubar.Item>
                        <Menubar.Separator />
                        <Menubar.Item label="Cut">Cut</Menubar.Item>
                        <Menubar.Item label="Copy">Copy</Menubar.Item>
                        <Menubar.Item label="Paste">Paste</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>
            <Menubar.Menu>
                <Menubar.Trigger>View</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content>
                        <Menubar.Item label="Zoom In">Zoom In</Menubar.Item>
                        <Menubar.Item label="Zoom Out">Zoom Out</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>
        </Menubar.Root>
    )
}

export default MenubarExample
