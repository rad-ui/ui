'use client'

import Steps from "@radui/ui/Steps"
import Text from "@radui/ui/Text"
import PlaygroundSection from "../helpers/PlaygroundSection"

const StepsPlayground = () => (
    <div>
        <PlaygroundSection
            title="Steps"
            docsLink="/docs/components/steps"
            description="Vertical step sequence with bubbles, connecting lines, and content."
        >
            <Steps.Root>
                {["Install", "Style", "Ship"].map((step, index) => (
                    <Steps.Item key={step} value={String(index)}>
                        <Steps.Track><Steps.Bubble>{index + 1}</Steps.Bubble><Steps.Line /></Steps.Track>
                        <Steps.Content><Text>{step}</Text></Steps.Content>
                    </Steps.Item>
                ))}
            </Steps.Root>
        </PlaygroundSection>
    </div>
)

export default StepsPlayground
