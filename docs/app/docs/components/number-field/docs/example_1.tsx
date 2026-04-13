"use client"

import NumberField from "@radui/ui/NumberField"

const NumberFieldExample = () => {
    return (
        <div className="flex flex-col gap-4">
            <NumberField.Root defaultValue={0} min={0} max={100}>
                <NumberField.Decrement className="px-3 py-2 border rounded-l-lg cursor-pointer bg-gray-100 hover:bg-gray-200">−</NumberField.Decrement>
                <NumberField.Input className="w-16 text-center border-y py-2 outline-none" />
                <NumberField.Increment className="px-3 py-2 border rounded-r-lg cursor-pointer bg-gray-100 hover:bg-gray-200">+</NumberField.Increment>
            </NumberField.Root>
        </div>
    )
}

export default NumberFieldExample
