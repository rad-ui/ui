'use client'

import Checkbox from "@radui/ui/Checkbox"
import Matrix from "../helpers/Matrix"
import { usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const states = [
    { key: "unchecked", label: "unchecked", props: {} },
    { key: "checked", label: "checked", props: { defaultChecked: true } },
    { key: "indeterminate", label: "indeterminate", props: { defaultChecked: "indeterminate" } }
]
const columns = [{ key: "enabled", label: "enabled" }, { key: "disabled", label: "disabled" }]

const CheckboxPlayground = () => {
    const { accent } = usePlayground()

    return (
        <PlaygroundSection title="Checkbox" docsLink="/docs/components/checkbox" description="state × enabled/disabled.">
            <Matrix
                rows={states}
                columns={columns}
                renderCell={(state, column) => (
                    <Checkbox.Root {...state.props} disabled={column.key === "disabled"} color={accent === "gray" ? undefined : accent} aria-label={`${state.label} ${column.label}`}>
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                )}
            />
        </PlaygroundSection>
    )
}

export default CheckboxPlayground
