'use client'

import Progress from "@radui/ui/Progress"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const values = [0, 25, 50, 75, 100].map((value) => ({ key: String(value), label: `${value}%`, value }))

const ProgressPlayground = () => (
    <PlaygroundSection title="Progress" docsLink="/docs/components/progress" description="Determinate progress across its range.">
        <Matrix
            rows={values}
            columns={[{ key: "bar" }]}
            renderCell={(row) => (
                <div className="w-72">
                    <Progress.Root value={row.value} minValue={0} maxValue={100} aria-label={`Progress ${row.label}`}>
                        <Progress.Indicator />
                    </Progress.Root>
                </div>
            )}
        />
    </PlaygroundSection>
)

export default ProgressPlayground
