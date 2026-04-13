"use client"

import Combobox from "@radui/ui/Combobox"

const fruits = ["Apple", "Banana", "Cherry", "Grape", "Mango", "Orange", "Peach", "Strawberry"]

const ComboboxExample = () => {
    return (
        <Combobox.Root>
            <Combobox.Trigger className="flex items-center justify-between w-[220px] px-3 py-2 border rounded-lg cursor-pointer">
                <span>Select a fruit...</span>
                <Combobox.Indicator />
            </Combobox.Trigger>
            <Combobox.Portal>
                <Combobox.Content>
                    <Combobox.Search placeholder="Search fruits..." />
                    <Combobox.Group>
                        {fruits.map(fruit => (
                            <Combobox.Item key={fruit} value={fruit.toLowerCase()}>{fruit}</Combobox.Item>
                        ))}
                    </Combobox.Group>
                </Combobox.Content>
            </Combobox.Portal>
        </Combobox.Root>
    )
}

export default ComboboxExample
