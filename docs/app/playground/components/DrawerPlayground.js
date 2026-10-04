'use client'

import Drawer from "@radui/ui/Drawer"
import PlaygroundSection from "../helpers/PlaygroundSection"

const DrawerPlayground = () => (
    <div>
        <PlaygroundSection
            title="Drawer"
            docsLink="/docs/components/drawer"
            description="Edge-anchored panel for longer workflows without leaving the page."
        >
            <Drawer.Root>
                <Drawer.Trigger>
                    <span className="inline-flex rounded-md bg-gray-950 px-3 py-2 text-sm font-medium text-white">
                        Open drawer
                    </span>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Title>Command center</Drawer.Title>
                        <Drawer.Description>Drawer content can host longer workflows.</Drawer.Description>
                        <Drawer.Close>Close</Drawer.Close>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </PlaygroundSection>
    </div>
)

export default DrawerPlayground
