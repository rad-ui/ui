'use client'

import Radio from "@radui/ui/Radio"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const rows = [{ key: "unchecked", label: "unchecked", checked: false }, { key: "checked", label: "checked", checked: true }]
const columns = [{ key: "enabled", label: "enabled" }, { key: "disabled", label: "disabled" }]

const RadioPlayground = () => (
    <PlaygroundSection title="Radio" docsLink="/docs/components/radio" description="state × enabled/disabled.">
        <Matrix
            rows={rows}
            columns={columns}
            renderCell={(row, column) => (
                <Radio
                    name={`playground-radio-${row.key}-${column.key}`}
                    value={row.key}
                    defaultChecked={row.checked}
                    disabled={column.key === "disabled"}
                    aria-label={`${row.label} ${column.label}`}
                />
            )}
        />
    </PlaygroundSection>
)

export default RadioPlayground
