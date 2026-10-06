'use client'

import { Bold, Italic, Underline } from "lucide-react"
import ToggleGroup from "@radui/ui/ToggleGroup"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const rows = [
    { key: "multiple", label: "multiple", type: "multiple", defaultValue: ["bold", "italic"] },
    { key: "single", label: "single", type: "single", defaultValue: ["bold"] }
]
const columns = [{ key: "enabled", label: "enabled" }, { key: "disabled", label: "disabled" }]

const ToggleGroupPlayground = () => (
    <PlaygroundSection title="ToggleGroup" docsLink="/docs/components/toggle-group" description="selection type × enabled/disabled.">
        <Matrix
            rows={rows}
            columns={columns}
            renderCell={(row, column) => (
                <ToggleGroup.Root type={row.type} defaultValue={row.defaultValue} disabled={column.key === "disabled"}>
                    <ToggleGroup.Item value="bold" aria-label="Bold" iconOnly><Bold size={16} /></ToggleGroup.Item>
                    <ToggleGroup.Item value="italic" aria-label="Italic" iconOnly><Italic size={16} /></ToggleGroup.Item>
                    <ToggleGroup.Item value="underline" aria-label="Underline" iconOnly><Underline size={16} /></ToggleGroup.Item>
                </ToggleGroup.Root>
            )}
        />
    </PlaygroundSection>
)

export default ToggleGroupPlayground
