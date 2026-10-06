'use client'

import RadioGroup from "@radui/ui/RadioGroup"
import PlaygroundSection from "../helpers/PlaygroundSection"

const RadioGroupPlayground = () => (
    <div>
        <PlaygroundSection
            title="RadioGroup"
            docsLink="/docs/components/radio-group"
            description="Roving-focus radio set with arrow-key navigation."
        >
            <RadioGroup.Root defaultValue="comfortable" aria-label="Density">
                {["compact", "comfortable", "spacious"].map((value) => (
                    <RadioGroup.Label key={value}>
                        <RadioGroup.Item value={value}>
                            <RadioGroup.Indicator />
                        </RadioGroup.Item>
                        {value}
                    </RadioGroup.Label>
                ))}
            </RadioGroup.Root>
        </PlaygroundSection>
    </div>
)

export default RadioGroupPlayground
