'use client'

import { Bold } from "lucide-react"
import Toggle from "@radui/ui/Toggle"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const rows = [{ key: "off", label: "off", pressed: false }, { key: "on", label: "on", pressed: true }]
const columns = [{ key: "label", label: "icon + label" }, { key: "icon", label: "icon only" }, { key: "disabled", label: "disabled" }]

const TogglePlayground = () => (
    <PlaygroundSection title="Toggle" docsLink="/docs/components/toggle" description="pressed state × content and disabled.">
        <Matrix
            rows={rows}
            columns={columns}
            renderCell={(row, column) => (
                <Toggle defaultPressed={row.pressed} disabled={column.key === "disabled"} aria-label={column.key === "icon" ? "Bold" : undefined}>
                    <Bold size={16} />
                    {column.key === "icon" ? null : <span>Bold</span>}
                </Toggle>
            )}
        />
    </PlaygroundSection>
)

export default TogglePlayground
