'use client'

import ContextMenu from "@radui/ui/ContextMenu"
import PlaygroundSection from "../helpers/PlaygroundSection"

const ContextMenuPlayground = () => (
    <div>
        <PlaygroundSection
            title="ContextMenu"
            docsLink="/docs/components/context-menu"
            description="Right-click menu anchored to the pointer position."
        >
            <ContextMenu.Root>
                <ContextMenu.Trigger>Right click target</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                    <ContextMenu.Item label="Paste">Paste</ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>
        </PlaygroundSection>
    </div>
)

export default ContextMenuPlayground
