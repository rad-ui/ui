'use client'

import Badge from "@radui/ui/Badge"
import Matrix, { toAxis } from "../helpers/Matrix"
import { ACCENT_COLORS, usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const variants = toAxis(["solid", "soft", "surface", "outline", "ghost"])
const sizes = toAxis(["small", "medium", "large", "x-large"])

const BadgePlayground = () => {
    const { accent, showAllColors } = usePlayground()

    return (
        <PlaygroundSection title="Badge" docsLink="/docs/components/badge" description="variant × size, plus every accent color.">
            <Matrix
                rows={variants}
                columns={sizes}
                renderCell={(variant, size) => <Badge variant={variant.value} size={size.value} color={accent}>Badge</Badge>}
            />
            {showAllColors ? (
                <div className="mt-6 border-t border-gray-300 pt-5">
                    <Matrix
                        rows={toAxis(ACCENT_COLORS)}
                        columns={variants}
                        renderCell={(color, variant) => <Badge variant={variant.value} color={color.value}>{color.value}</Badge>}
                    />
                </div>
            ) : null}
        </PlaygroundSection>
    )
}

export default BadgePlayground
