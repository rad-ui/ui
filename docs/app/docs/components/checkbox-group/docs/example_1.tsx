"use client"

import CheckboxGroup from "@radui/ui/CheckboxGroup"

const CheckboxGroupExample = () => {
    return (
        <CheckboxGroup.Root className="flex flex-col gap-3">
            <CheckboxGroup.Trigger value="react" className="flex items-center gap-2 cursor-pointer">
                <CheckboxGroup.Indicator />
                <CheckboxGroup.Label>React</CheckboxGroup.Label>
            </CheckboxGroup.Trigger>
            <CheckboxGroup.Trigger value="vue" className="flex items-center gap-2 cursor-pointer">
                <CheckboxGroup.Indicator />
                <CheckboxGroup.Label>Vue</CheckboxGroup.Label>
            </CheckboxGroup.Trigger>
            <CheckboxGroup.Trigger value="svelte" className="flex items-center gap-2 cursor-pointer">
                <CheckboxGroup.Indicator />
                <CheckboxGroup.Label>Svelte</CheckboxGroup.Label>
            </CheckboxGroup.Trigger>
        </CheckboxGroup.Root>
    )
}

export default CheckboxGroupExample
