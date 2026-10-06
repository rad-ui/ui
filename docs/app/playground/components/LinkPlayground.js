'use client'

import Link from "@radui/ui/Link"
import Matrix, { toAxis } from "../helpers/Matrix"
import { usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const LinkPlayground = () => {
    const { accent } = usePlayground()

    return (
        <PlaygroundSection title="Link" docsLink="/docs/components/link" description="Inline and standalone links by size.">
            <Matrix
                rows={[{ key: "standalone", label: "standalone" }, { key: "inline", label: "inline" }]}
                columns={toAxis(["small", "medium", "large", "x-large"])}
                renderCell={(row, size) => row.key === "inline" ? (
                    <span className="text-sm text-gray-950">Read the <Link href="/docs" size={size.value} color={accent}>docs</Link>.</span>
                ) : (
                    <Link href="/docs" size={size.value} color={accent}>Documentation</Link>
                )}
            />
        </PlaygroundSection>
    )
}

export default LinkPlayground
