'use client'

import { useState } from "react"
import Tabs from "@radui/ui/Tabs"
import ColorLooper from "../helpers/ColorLooper"

const items = [
    {
        id: "overview",
        title: "Overview",
        content: "The tabs API separates list, trigger, and content so you can keep structure explicit and styling flexible."
    },
    {
        id: "usage",
        title: "Usage",
        content: "Use tabs when content belongs on the same hierarchy level and users need quick switching without navigation."
    },
    {
        id: "notes",
        title: "Notes",
        content: "This playground keeps the content short on purpose so the interactive pattern is clear at a glance."
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
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
                                {item.content}
                            </div>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </ColorLooper>
        </div>
    )
}

export default TabsPlayground
