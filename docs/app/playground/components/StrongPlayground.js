'use client'

import Strong from "@radui/ui/Strong"
import Text from "@radui/ui/Text"
import PlaygroundSection from "../helpers/PlaygroundSection"

const StrongPlayground = () => (
    <div>
        <PlaygroundSection
            title="Strong"
            docsLink="/docs/components/strong"
            description="Semantic emphasis for meaningfully important words inside regular copy."
        >
            <Text className="text-gray-950">
                The important part is not that the playground exists, but that it remains <Strong>accurate</Strong> as the component APIs evolve.
            </Text>
        </PlaygroundSection>
    </div>
)

export default StrongPlayground
