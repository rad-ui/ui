"use client"
import { useState, useEffect } from 'react'
import Tabs from "@radui/ui/Tabs"

const CodeTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState(data[0]?.value)

    return <Tabs.Root defaultValue={activeTab}>
        <Tabs.List>
            {data.map((tab, index) => (
                <Tabs.Trigger key={index} value={tab.value}>{tab.label}</Tabs.Trigger>
            ))}
        </Tabs.List>
        {data.map((tab, index) => (
                <Tabs.Content key={index} value={tab.value}>{tab.content}</Tabs.Content>
            ))}
    </Tabs.Root>

}

export default CodeTabs