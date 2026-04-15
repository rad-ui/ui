"use client"

import { useState } from "react"
import TabNav from "@radui/ui/TabNav"

const TabNavExample = () => {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <TabNav.Root value={activeTab} onValueChange={setActiveTab}>
            <TabNav.Link value="overview" href="#overview">Overview</TabNav.Link>
            <TabNav.Link value="settings" href="#settings">Settings</TabNav.Link>
            <TabNav.Link value="members" href="#members">Members</TabNav.Link>
            <TabNav.Link value="billing" href="#billing" disabled>Billing</TabNav.Link>
        </TabNav.Root>
    )
}

export default TabNavExample
