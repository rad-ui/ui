'use client'

import Menubar from "@radui/ui/Menubar"
import PlaygroundSection from "../helpers/PlaygroundSection"

const MenubarPlayground = () => (
    <div>
        <PlaygroundSection
            title="Menubar"
            docsLink="/docs/components/menubar"
            description="Persistent horizontal menu bar for application-level commands."
        >
            <Menubar.Root>
                <Menubar.Menu>
                    <Menubar.Trigger>File</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item label="New">New</Menubar.Item>
                        <Menubar.Item label="Open">Open</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
                <Menubar.Menu>
                    <Menubar.Trigger>Edit</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item label="Undo">Undo</Menubar.Item>
                        <Menubar.Item label="Redo">Redo</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        </PlaygroundSection>
    </div>
)

export default MenubarPlayground
