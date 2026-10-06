'use client'

import Combobox from "@radui/ui/Combobox"
import PlaygroundSection from "../helpers/PlaygroundSection"

const ComboboxPlayground = () => (
    <div>
        <PlaygroundSection
            title="Combobox"
            docsLink="/docs/components/combobox"
            description="Searchable single-select picker with a filterable option list."
        >
            <div className="max-w-xs">
                <Combobox.Root>
                    <Combobox.Trigger aria-label="Component">Choose component</Combobox.Trigger>
                    <Combobox.Content>
                        <Combobox.Search placeholder="Search components..." />
                        {["Button", "Dialog", "ScrollArea", "Toolbar"].map((value) => (
                            <Combobox.Item key={value} value={value}>{value}</Combobox.Item>
                        ))}
                    </Combobox.Content>
                </Combobox.Root>
            </div>
        </PlaygroundSection>
    </div>
)

export default ComboboxPlayground
