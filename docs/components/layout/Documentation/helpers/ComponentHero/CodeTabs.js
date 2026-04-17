"use client"
import { useState, useEffect } from 'react'
import Tabs from "@radui/ui/Tabs"

const CodeTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState(data[0]?.value)

    return <Tabs.Root defaultValue={activeTab} className="gap-2">
        <Tabs.List className="inline-flex gap-1 self-start rounded-[16px] border border-[var(--rad-ui-border-soft)] bg-[var(--rad-ui-surface-panel)] p-1">
            {data.map((tab, index) => (
                <Tabs.Trigger
                    className="rounded-[12px] px-3 py-1.5 text-[0.88rem] font-medium capitalize text-[var(--rad-ui-text-muted)] data-[state=active]:bg-[var(--rad-ui-surface-canvas)] data-[state=active]:text-[var(--rad-ui-text-primary)]"
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
