"use client"

import Select from "@radui/ui/Select"

const SelectExample = () => {
    return (
        <div className="w-[240px]">
            <Select.Root>
                <Select.Trigger>
                    <span>Select a fruit...</span>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="apple"><Select.Indicator />Apple</Select.Item>
                            <Select.Item value="banana"><Select.Indicator />Banana</Select.Item>
                            <Select.Item value="orange"><Select.Indicator />Orange</Select.Item>
                            <Select.Item value="grape"><Select.Indicator />Grape</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
}

export default SelectExample
