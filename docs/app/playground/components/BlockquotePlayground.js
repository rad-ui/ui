'use client'

import BlockQuote from "@radui/ui/BlockQuote"
import Matrix, { toAxis } from "../helpers/Matrix"
import { usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const variants = [{ key: "default", label: "default", value: undefined }, ...toAxis(["soft", "outline", "accent"])]

const BlockquotePlayground = () => {
    const { accent } = usePlayground()

    return (
        <PlaygroundSection title="BlockQuote" docsLink="/docs/components/blockquote" description="variant × size.">
            <Matrix
                align="top"
                rows={variants}
                columns={toAxis(["small", "medium", "large"])}
                renderCell={(variant, size) => (
                    <BlockQuote variant={variant.value} size={size.value} color={accent === "gray" ? undefined : accent}>
                        Predictable APIs keep teams on a design system.
                    </BlockQuote>
                )}
            />
        </PlaygroundSection>
    )
}

export default BlockquotePlayground
