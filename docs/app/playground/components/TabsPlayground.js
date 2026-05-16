'use client'

import { useState } from "react"
import Tabs from "@radui/ui/Tabs"
import ColorLooper from "../helpers/ColorLooper"

const items = [
    {
        id: "overview",
        title: "Overview",
        content: [
            "The tabs API separates list, trigger, and content so you can keep structure explicit and styling flexible.",
            "Each part stays composable, which makes it easier to control layout, slot in custom content, and adapt the pattern to different page structures.",
            "This is the right fit when users need to compare related sections without losing their place in the current view."
        ]
    },
    {
        id: "usage",
        title: "Usage",
        content: [
            "Use tabs when content belongs on the same hierarchy level and users need quick switching without navigation.",
            "Good examples include settings groups, product details, analytics summaries, or any place where the active section should change instantly in place.",
            "Keep tab labels short, make the selected state obvious, and avoid hiding unrelated workflows behind the same tab set."
        ]
    },
    {
        id: "notes",
        title: "Notes",
        content: [
            "This playground keeps the structure simple, but the component can comfortably handle denser real-world content.",
            "If your panels include forms, tables, or secondary actions, the interaction model still holds as long as the tab labels remain clear and predictable.",
            "When the content starts to represent a navigation change rather than a local view switch, move to routes instead of tabs."
        ]
    }
]

const TabsPlayground = () => {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div className='mt-4 space-y-2'>
            <ColorLooper
                title="Tabs"
                docsLink="/docs/components/tabs"
                description="Switch between related content panels without leaving the current view."
            >
                <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                    <Tabs.List>
                        {items.map((item) => (
                            <Tabs.Trigger key={item.id} value={item.id}>
                                {item.title}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                    {items.map((item) => (
                        <Tabs.Content key={item.id} value={item.id}>
                            <div className="space-y-3">
                                {item.content.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </ColorLooper>
        </div>
    )
}

export default TabsPlayground
