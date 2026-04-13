"use client"

import TabNav from "@radui/ui/TabNav"

const TabNavExample = () => {
    return (
        <TabNav.Root>
            <TabNav.Link href="#" active>Overview</TabNav.Link>
            <TabNav.Link href="#">Settings</TabNav.Link>
            <TabNav.Link href="#">Members</TabNav.Link>
            <TabNav.Link href="#">Billing</TabNav.Link>
        </TabNav.Root>
    )
}

export default TabNavExample
