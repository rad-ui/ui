"use client"

import Select from "@radui/ui/Select"

const SIZES = [
    { value: "s", label: "Small (up to 5 L)" },
    { value: "m", label: "Medium (10 to 20 L)" },
    { value: "l", label: "Large (25 L and up)" }
]

// The items read in full; the trigger shows only the short name once something is picked.
const CustomTriggerExample = () => {
    return (
        <div className="w-[200px]">
            <Select.Root defaultValue="m">
                <Select.Trigger
                    aria-label="Pot size"
                    renderValue={(value) => SIZES.find((size) => size.value === value)?.label.split(" (")[0]}
                >
                    <span>Pot size</span>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        {SIZES.map((size) => (
                            <Select.Item key={size.value} value={size.value}>
                                <Select.Indicator />
                                {size.label}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
}

export default CustomTriggerExample
