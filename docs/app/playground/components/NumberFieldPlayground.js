'use client'

import React from "react"
import NumberField from "@radui/ui/NumberField"
import PlaygroundSection from "../helpers/PlaygroundSection"

const NumberFieldPlayground = () => {
    const [value, setValue] = React.useState(3)

    return (
        <div>
            <PlaygroundSection
                title="NumberField"
                docsLink="/docs/components/number-field"
                description="Numeric input with increment and decrement controls and clamped bounds."
            >
                <NumberField.Root value={value} onValueChange={setValue} min={0} max={10} step={1}>
                    <NumberField.Decrement>-</NumberField.Decrement>
                    <NumberField.Input aria-label="Quantity" />
                    <NumberField.Increment>+</NumberField.Increment>
                </NumberField.Root>
            </PlaygroundSection>
        </div>
    )
}

export default NumberFieldPlayground
