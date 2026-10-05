"use client"
import { useState } from 'react'
import Tabs from "@radui/ui/Tabs"

const CodeTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState(data[0]?.value)

    return <Tabs.Root defaultValue={activeTab} className="gap-2">
        <Tabs.List className="inline-flex gap-0.5 self-start rounded-md border border-gray-400 bg-gray-100 p-0.5">
            {data.map((tab, index) => (
                <Tabs.Trigger
                    className="rounded-[5px] px-2.5 py-1 font-mono text-[0.75rem] font-medium capitalize tracking-wide text-gray-950 transition-colors data-[state=active]:bg-gray-50 data-[state=active]:text-gray-1000"
                    key={index}
                    value={tab.value}
                >
                    {tab.label}
                </Tabs.Trigger>
            ))}
        </Tabs.List>
        {data.map((tab, index) => (
                <Tabs.Content
                    customRootClass="docs-code"
                    className="border-0 bg-transparent p-0 pb-0 shadow-none"
                    key={index}
                    value={tab.value}
                >
                    {tab.content}
                </Tabs.Content>
            ))}
    </Tabs.Root>

}

export default CodeTabs
