'use client'

import Separator from "@radui/ui/Separator"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const SeparatorPlayground = () => (
    <PlaygroundSection title="Separator" docsLink="/docs/components/separator" description="Horizontal and vertical dividers.">
        <Matrix
            rows={[{ key: "horizontal", label: "horizontal" }, { key: "vertical", label: "vertical" }]}
            columns={[{ key: "sample" }]}
            renderCell={(row) => row.key === "horizontal" ? (
                <div className="w-72 space-y-2 text-sm">
                    <div>Above</div>
                    <Separator decorative />
                    <div>Below</div>
                </div>
            ) : (
                <div className="flex h-6 items-center gap-3 text-sm">
                    <span>Docs</span>
                    <Separator orientation="vertical" decorative />
                    <span>Playground</span>
                    <Separator orientation="vertical" decorative />
                    <span>Colors</span>
                </div>
            )}
        />
    </PlaygroundSection>
)

export default SeparatorPlayground
