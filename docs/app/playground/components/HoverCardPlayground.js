'use client'

import HoverCard from "@radui/ui/HoverCard"
import Link from "@radui/ui/Link"
import Text from "@radui/ui/Text"
import PlaygroundSection from "../helpers/PlaygroundSection"

const HoverCardPlayground = () => (
    <div>
        <PlaygroundSection
            title="HoverCard"
            docsLink="/docs/components/hover-card"
            description="Preview card shown when hovering or focusing a link."
        >
            <HoverCard.Root openDelay={100}>
                <HoverCard.Trigger><Link href="#">@radui</Link></HoverCard.Trigger>
                <HoverCard.Content>
                    <div className="w-64">
                        <Text className="font-semibold">Rad UI</Text>
                        <Text>Headless React components with accessible behavior.</Text>
                    </div>
                </HoverCard.Content>
            </HoverCard.Root>
        </PlaygroundSection>
    </div>
)

export default HoverCardPlayground
