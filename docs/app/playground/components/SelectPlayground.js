'use client'

import Select from "@radui/ui/Select"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const frameworks = ["react", "vue", "svelte", "solid"]
const rows = [
    { key: "placeholder", label: "placeholder", props: {} },
    { key: "value", label: "with value", props: { defaultValue: "react" } },
    { key: "disabled", label: "disabled", props: { defaultValue: "react" }, disabled: true }
]

const SelectPlayground = () => (
    <PlaygroundSection title="Select" docsLink="/docs/components/select" description="Single-select dropdown states.">
        <Matrix
            rows={rows}
            columns={[{ key: "select" }]}
            renderCell={(row) => (
                <div className="w-60">
                    <Select.Root {...row.props}>
                        <Select.Trigger disabled={row.disabled} aria-label={`Framework (${row.label})`}>Framework</Select.Trigger>
                        <Select.Content>
                            <Select.Group>
                                {frameworks.map((value) => (
                                    <Select.Item key={value} value={value}><Select.Indicator />{value}</Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </div>
            )}
        />
    </PlaygroundSection>
)

export default SelectPlayground
