"use client"
import { useState, useEffect } from 'react'
import Tabs from "@radui/ui/Tabs"

const CodeTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState(data[0]?.value)

    return <Tabs.Root defaultValue={activeTab} className="gap-3">
        <Tabs.List className="flex gap-1 border-b border-[var(--rad-ui-border-soft)] bg-[var(--rad-ui-surface-panel)] px-4 py-2.5">
            {data.map((tab, index) => (
                <Tabs.Trigger
                    className="rounded-xl px-3 py-1.5 text-[0.88rem] font-medium capitalize text-[var(--rad-ui-text-muted)] transition-colors data-[state=active]:bg-[var(--rad-ui-surface-subtle)] data-[state=active]:text-[var(--rad-ui-text-primary)]"
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
                    className="bg-transparent p-0 pb-0 shadow-none border-0"
                    key={index}
                    value={tab.value}
                >
                    {tab.content}
                </Tabs.Content>
            ))}
    </Tabs.Root>

}

export default CodeTabs
