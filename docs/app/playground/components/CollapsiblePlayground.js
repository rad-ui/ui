'use client'

import Collapsible from "@radui/ui/Collapsible"
import PlaygroundSection from "../helpers/PlaygroundSection"

const CollapsiblePlayground = () => (
    <div>
        <PlaygroundSection
            title="Collapsible"
            docsLink="/docs/components/collapsible"
            description="A single trigger that shows and hides one region of content."
        >
            <Collapsible.Root defaultOpen>
                <Collapsible.Trigger>Release checklist</Collapsible.Trigger>
                <Collapsible.Content>
                    <div className="rounded-lg bg-gray-100 p-3 text-sm">Tests, changesets, docs, and package artifact checks.</div>
                </Collapsible.Content>
            </Collapsible.Root>
        </PlaygroundSection>
    </div>
)

export default CollapsiblePlayground
