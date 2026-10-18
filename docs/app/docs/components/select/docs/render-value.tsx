"use client"

import Select from "@radui/ui/Select"

export default function CustomSelectValue() {
    return (
        <Select.Root defaultValue="auto">
            <Select.Trigger aria-label="Move" renderValue={(value: string) => value === "auto" ? "whip-l" : value}>
                Choose a move
            </Select.Trigger>
            <Select.Portal>
                <Select.Content>
                    <Select.Item value="auto">Auto (whip-l)</Select.Item>
                    <Select.Item value="manual">Manual</Select.Item>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
