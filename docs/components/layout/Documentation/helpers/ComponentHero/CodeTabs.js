"use client"
import { useState, useEffect } from 'react'
import Tabs from "@radui/ui/Tabs"

const CodeTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState(data[0]?.value)

    return <Tabs.Root defaultValue={activeTab} className="m-2">
        <Tabs.List className="flex gap-2 border-b border-gray-300 bg-gray-100 px-4 py-3">
            {data.map((tab, index) => (
                <Tabs.Trigger className="rounded-full px-3 py-1 text-[0.86rem]" key={index} value={tab.value}>{tab.label}</Tabs.Trigger>
            ))}
        </Tabs.List>
        {data.map((tab, index) => (
                <Tabs.Content className="!pb-0" key={index} value={tab.value}>{tab.content}</Tabs.Content>
            ))}
    </Tabs.Root>

}

export default CodeTabs
