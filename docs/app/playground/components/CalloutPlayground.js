'use client'

import { Info } from "lucide-react"
import Callout from "@radui/ui/Callout"
import Matrix, { toAxis } from "../helpers/Matrix"
import { ACCENT_COLORS, usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const variants = [{ key: "default", label: "default", value: undefined }, ...toAxis(["soft", "outline"])]

const Sample = ({ variant, color, size }) => (
    <Callout.Root variant={variant} color={color} size={size}>
        <Callout.Icon><Info size={16} /></Callout.Icon>
        <Callout.Text>Keep callout copy short and actionable.</Callout.Text>
    </Callout.Root>
)

const CalloutPlayground = () => {
    const { accent, showAllColors } = usePlayground()

    return (
        <PlaygroundSection title="Callout" docsLink="/docs/components/callout" description="variant × size, plus every accent color.">
            <Matrix
                align="top"
                rows={variants}
                columns={toAxis(["small", "medium", "large"])}
                renderCell={(variant, size) => <Sample variant={variant.value} size={size.value} color={accent === "gray" ? undefined : accent} />}
            />
            {showAllColors ? (
                <div className="mt-6 border-t border-gray-300 pt-5">
                    <Matrix
                        align="top"
                        rows={toAxis(ACCENT_COLORS)}
                        columns={variants}
                        renderCell={(color, variant) => <Sample variant={variant.value} color={color.value} />}
                    />
                </div>
            ) : null}
        </PlaygroundSection>
    )
}

export default CalloutPlayground
