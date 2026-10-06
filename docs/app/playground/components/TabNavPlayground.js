'use client'

import TabNav from "@radui/ui/TabNav"
import PlaygroundSection from "../helpers/PlaygroundSection"

const TabNavPlayground = () => (
    <div>
        <PlaygroundSection
            title="TabNav"
            docsLink="/docs/components/tab-nav"
            description="Tab-styled navigation links for switching between routes."
        >
            <TabNav.Root defaultValue="overview">
                <TabNav.Link value="overview" href="#overview">Overview</TabNav.Link>
                <TabNav.Link value="usage" href="#usage">Usage</TabNav.Link>
                <TabNav.Link value="api" href="#api">API</TabNav.Link>
            </TabNav.Root>
        </PlaygroundSection>
    </div>
)

export default TabNavPlayground
