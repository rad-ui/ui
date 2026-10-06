'use client'

import React from "react"
import CheckboxCards from "@radui/ui/CheckboxCards"
import PlaygroundSection from "../helpers/PlaygroundSection"

const CheckboxCardsPlayground = () => {
    const [value, setValue] = React.useState(["security"])

    return (
        <div>
            <PlaygroundSection
                title="CheckboxCards"
                docsLink="/docs/components/checkbox-cards"
                description="Card-sized multi-select options with a title and supporting description."
            >
                <CheckboxCards.Root value={value} onValueChange={setValue} name="playground-preferences">
                    {[
                        ["security", "Security alerts", "Critical account activity."],
                        ["product", "Product updates", "Feature launches and release notes."]
                    ].map(([itemValue, title, description]) => (
                        <CheckboxCards.Item key={itemValue} value={itemValue}>
                            <CheckboxCards.Content><CheckboxCards.Indicator /></CheckboxCards.Content>
                            <div>
                                <div className="text-sm font-semibold">{title}</div>
                                <div className="text-sm text-gray-950">{description}</div>
                            </div>
                        </CheckboxCards.Item>
                    ))}
                </CheckboxCards.Root>
            </PlaygroundSection>
        </div>
    )
}

export default CheckboxCardsPlayground
