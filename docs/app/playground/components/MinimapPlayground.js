'use client'

import Minimap from "@radui/ui/Minimap"
import Text from "@radui/ui/Text"
import PlaygroundSection from "../helpers/PlaygroundSection"

const MinimapPlayground = () => (
    <div>
        <PlaygroundSection
            title="Minimap"
            docsLink="/docs/components/minimap"
            description="Compact progress outline for long pages and multi-part flows."
        >
            <Minimap.Provider>
                <Minimap.Root>
                    {["Install", "Style", "Ship"].map((step, index) => (
                        <Minimap.Item key={step} value={String(index)}>
                            <Minimap.Track><Minimap.Bubble>{index + 1}</Minimap.Bubble><Minimap.Line /></Minimap.Track>
                            <Minimap.Content><Text as="span">{step}</Text></Minimap.Content>
                        </Minimap.Item>
                    ))}
                </Minimap.Root>
            </Minimap.Provider>
        </PlaygroundSection>
    </div>
)

export default MinimapPlayground
