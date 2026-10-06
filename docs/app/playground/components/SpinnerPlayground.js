'use client'

import Spinner from "@radui/ui/Spinner"
import Matrix, { toAxis } from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const SpinnerPlayground = () => (
    <PlaygroundSection title="Spinner" docsLink="/docs/components/spinner" description="Indeterminate loading indicator by size.">
        <Matrix
            rows={[{ key: "spinner", label: "spinner" }]}
            columns={toAxis(["small", "medium", "large"])}
            renderCell={(_, size) => <Spinner size={size.value} />}
        />
    </PlaygroundSection>
)

export default SpinnerPlayground
