"use client"

import ContextMenu from "@radui/ui/ContextMenu"

const ContextMenuExample = () => {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <div className="flex items-center justify-center w-[280px] h-[100px] border-2 border-dashed rounded-lg text-gray-500 cursor-context-menu select-none">
                    Right-click here
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content>
                    <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                    <ContextMenu.Item label="Paste">Paste</ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item label="Delete">Delete</ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    )
}

export default ContextMenuExample
