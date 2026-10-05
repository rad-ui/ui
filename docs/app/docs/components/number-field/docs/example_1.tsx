"use client"

import NumberField from "@radui/ui/NumberField"

const NumberFieldExample = () => {
    return (
        <div className="flex flex-col gap-4">
            <NumberField.Root defaultValue={5} step={1} min={0} max={100} largeStep={5}>
                <NumberField.Decrement aria-label="Decrease quantity">−</NumberField.Decrement>
                <NumberField.Input aria-label="Quantity" />
                <NumberField.Increment aria-label="Increase quantity">+</NumberField.Increment>
            </NumberField.Root>
        </div>
    )
}

export default NumberFieldExample
