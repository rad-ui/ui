"use client"

import DropdownMenu from "@radui/ui/DropdownMenu"
import Button from "@radui/ui/Button"

const DropdownMenuExample = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button>Open Menu ▾</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[160px]">
                    <DropdownMenu.Item>Profile</DropdownMenu.Item>
                    <DropdownMenu.Item>Settings</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>Sign out</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default DropdownMenuExample
