'use client'

import Disclosure from "@radui/ui/Disclosure"
import PlaygroundSection from "../helpers/PlaygroundSection"

const DisclosurePlayground = () => (
    <div>
        <PlaygroundSection
            title="Disclosure"
            docsLink="/docs/components/disclosure"
            description="Stacked show/hide items for FAQ-style content."
        >
            <Disclosure.Root>
                <Disclosure.Item value="keyboard">
                    <Disclosure.Trigger>Keyboard support</Disclosure.Trigger>
                    <Disclosure.Content>Focus movement and state are owned by the component.</Disclosure.Content>
                </Disclosure.Item>
                <Disclosure.Item value="styling">
                    <Disclosure.Trigger>Styling</Disclosure.Trigger>
                    <Disclosure.Content>Style each part through stable data attributes.</Disclosure.Content>
                </Disclosure.Item>
            </Disclosure.Root>
        </PlaygroundSection>
    </div>
)

export default DisclosurePlayground
