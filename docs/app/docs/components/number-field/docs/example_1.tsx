"use client"

import NumberField from "@radui/ui/NumberField"

const NumberFieldExample = () => {
    return (
        <div className="flex flex-col gap-4">
            <NumberField.Root defaultValue={5} step={1} min={0} max={100} largeStep={5}>
                <NumberField.Decrement>−</NumberField.Decrement>
                <NumberField.Input />
                <NumberField.Increment>+</NumberField.Increment>
            </NumberField.Root>
        </div>
    )
}

export default NumberFieldExample
