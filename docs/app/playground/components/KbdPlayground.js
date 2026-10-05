'use client'

import Kbd from "@radui/ui/Kbd"
import Matrix, { toAxis } from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const KbdPlayground = () => (
    <PlaygroundSection title="Kbd" docsLink="/docs/components/kbd" description="Keyboard hints by size.">
        <Matrix
            rows={[{ key: "keys", label: "keys" }]}
            columns={toAxis(["small", "medium", "large", "x-large"])}
            renderCell={(_, size) => (
                <span className="inline-flex items-center gap-1">
                    <Kbd size={size.value}>⌘</Kbd><Kbd size={size.value}>K</Kbd>
                </span>
            )}
        />
    </PlaygroundSection>
)

export default KbdPlayground
