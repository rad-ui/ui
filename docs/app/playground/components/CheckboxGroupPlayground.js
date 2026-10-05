'use client'

import React from "react"
import CheckboxGroup from "@radui/ui/CheckboxGroup"
import PlaygroundSection from "../helpers/PlaygroundSection"

const CheckboxGroupPlayground = () => {
    const [value, setValue] = React.useState(["email"])

    return (
        <div>
            <PlaygroundSection
                title="CheckboxGroup"
                docsLink="/docs/components/checkbox-group"
                description="Related checkboxes that share one controlled value array."
            >
                <CheckboxGroup.Root value={value} onValueChange={setValue} aria-label="Channels">
                    {["email", "sms", "push"].map((channel) => (
                        <CheckboxGroup.Label key={channel}>
                            <CheckboxGroup.Trigger value={channel}>
                                <CheckboxGroup.Indicator />
                            </CheckboxGroup.Trigger>
                            {channel}
                        </CheckboxGroup.Label>
                    ))}
                </CheckboxGroup.Root>
            </PlaygroundSection>
        </div>
    )
}

export default CheckboxGroupPlayground
