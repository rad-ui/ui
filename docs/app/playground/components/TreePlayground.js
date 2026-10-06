'use client'

import Tree from "@radui/ui/Tree"
import PlaygroundSection from "../helpers/PlaygroundSection"

const treeItems = [
    {
        label: "Components",
        expanded: true,
        items: [
            { label: "Inputs", expanded: false },
            { label: "Overlays", expanded: false },
            { label: "Navigation", expanded: false }
        ]
    },
    {
        label: "Tokens",
        expanded: false,
        items: [{ label: "Colors", expanded: false }, { label: "Spacing", expanded: false }]
    }
]

const TreePlayground = () => (
    <div>
        <PlaygroundSection
            title="Tree"
            docsLink="/docs/components/tree"
            description="Hierarchical, expandable list with arrow-key navigation."
        >
            <Tree.Root aria-label="Component groups">
                {treeItems.map((item) => (
                    <Tree.Item key={item.label} item={item}>{item.label}</Tree.Item>
                ))}
            </Tree.Root>
        </PlaygroundSection>
    </div>
)

export default TreePlayground
