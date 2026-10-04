'use client'

import { Search } from "lucide-react"
import TextField from "@radui/ui/TextField"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const rows = [
    { key: "default", label: "default", props: { placeholder: "Ada Lovelace" } },
    { key: "slot", label: "start slot", props: { placeholder: "Search components", startSlot: <Search size={16} /> } },
    { key: "value", label: "with value", props: { defaultValue: "Ada Lovelace" } },
    { key: "disabled", label: "disabled", props: { placeholder: "Unavailable", disabled: true } }
]

const TextFieldPlayground = () => (
    <PlaygroundSection title="TextField" docsLink="/docs/components/text-field" description="Single-line input states and slots.">
        <Matrix
            rows={rows}
            columns={[{ key: "field" }]}
            renderCell={(row) => <div className="w-72"><TextField aria-label={row.label} {...row.props} /></div>}
        />
    </PlaygroundSection>
)

export default TextFieldPlayground
