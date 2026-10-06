'use client'

import Switch from "@radui/ui/Switch"
import Matrix from "../helpers/Matrix"
import { usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const rows = [{ key: "off", label: "off", checked: false }, { key: "on", label: "on", checked: true }]
const columns = [{ key: "enabled", label: "enabled" }, { key: "disabled", label: "disabled" }]

const SwitchPlayground = () => {
    const { accent } = usePlayground()

    return (
        <PlaygroundSection title="Switch" docsLink="/docs/components/switch" description="state × enabled/disabled.">
            <Matrix
                rows={rows}
                columns={columns}
                renderCell={(row, column) => (
                    <Switch.Root
                        defaultChecked={row.checked}
                        disabled={column.key === "disabled"}
                        color={accent === "gray" ? undefined : accent}
                        aria-label={`${row.label} ${column.label}`}
                    >
                        <Switch.Thumb />
                    </Switch.Root>
                )}
            />
        </PlaygroundSection>
    )
}

export default SwitchPlayground
