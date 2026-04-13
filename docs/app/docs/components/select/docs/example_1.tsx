"use client"

import Select from "@radui/ui/Select"

const SelectExample = () => {
    return (
        <Select.Root>
            <Select.Trigger className="flex items-center justify-between w-[200px] px-3 py-2 border rounded-lg cursor-pointer">
                <span>Pick a color...</span>
                <Select.Indicator />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content>
                    <Select.Group>
                        <Select.Item value="red">Red</Select.Item>
                        <Select.Item value="green">Green</Select.Item>
                        <Select.Item value="blue">Blue</Select.Item>
                        <Select.Item value="purple">Purple</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

export default SelectExample
