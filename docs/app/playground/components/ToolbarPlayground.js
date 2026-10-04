'use client'

import Toolbar from "@radui/ui/Toolbar"
import PlaygroundSection from "../helpers/PlaygroundSection"

const ToolbarPlayground = () => (
    <div>
        <PlaygroundSection
            title="Toolbar"
            docsLink="/docs/components/toolbar"
            description="Grouped buttons, toggles, and links sharing one roving focus stop."
        >
            <Toolbar.Root aria-label="Editor toolbar">
                <Toolbar.Button aria-label="Bold">B</Toolbar.Button>
                <Toolbar.Button aria-label="Italic">I</Toolbar.Button>
                <Toolbar.Separator />
                <Toolbar.ToggleGroup type="single">
                    <Toolbar.ToggleItem value="left">L</Toolbar.ToggleItem>
                    <Toolbar.ToggleItem value="center">C</Toolbar.ToggleItem>
                </Toolbar.ToggleGroup>
                <Toolbar.Link href="/docs/components/toolbar">Docs</Toolbar.Link>
            </Toolbar.Root>
        </PlaygroundSection>
    </div>
)

export default ToolbarPlayground
