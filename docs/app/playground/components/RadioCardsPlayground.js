'use client'

import RadioCards from "@radui/ui/RadioCards"
import PlaygroundSection from "../helpers/PlaygroundSection"

const RadioCardsPlayground = () => (
    <div>
        <PlaygroundSection
            title="RadioCards"
            docsLink="/docs/components/radio-cards"
            description="Card-sized single-select options for plans and presets."
        >
            <RadioCards.Root defaultValue="pro" aria-label="Plan">
                {[
                    ["starter", "Starter", "Small teams."],
                    ["pro", "Pro", "Growing products."],
                    ["enterprise", "Enterprise", "Large organizations."]
                ].map(([value, title, description]) => (
                    <RadioCards.Item key={value} value={value}>
                        <div className="rad-ui-radio-cards-title">{title}</div>
                        <div className="rad-ui-radio-cards-description">{description}</div>
                    </RadioCards.Item>
                ))}
            </RadioCards.Root>
        </PlaygroundSection>
    </div>
)

export default RadioCardsPlayground
