'use client'

import { ArrowRight } from "lucide-react"
import Button from "@radui/ui/Button"
import Matrix, { toAxis } from "../helpers/Matrix"
import { ACCENT_COLORS, usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const variants = toAxis(["solid", "soft", "outline", "ghost"])
const columns = [...toAxis(["small", "medium", "large", "x-large"]), { key: "icon", label: "with icon" }, { key: "disabled", label: "disabled" }]

const ButtonPlayground = () => {
    const { accent, showAllColors } = usePlayground()

    return (
        <PlaygroundSection title="Button" docsLink="/docs/components/button" description="variant × size, icon composition, and disabled.">
            <Matrix
                rows={variants}
                columns={columns}
                renderCell={(variant, column) => {
                    if (column.key === "icon") {
                        return <Button variant={variant.value} color={accent}>Next <ArrowRight size={16} /></Button>
                    }
                    if (column.key === "disabled") {
                        return <Button variant={variant.value} color={accent} disabled>Button</Button>
                    }
                    return <Button variant={variant.value} size={column.value} color={accent}>Button</Button>
                }}
            />
            {showAllColors ? (
                <div className="mt-6 border-t border-gray-300 pt-5">
                    <Matrix
                        rows={toAxis(ACCENT_COLORS)}
                        columns={variants}
                        renderCell={(color, variant) => <Button variant={variant.value} color={color.value}>{color.value}</Button>}
                    />
                </div>
            ) : null}
        </PlaygroundSection>
    )
}

export default ButtonPlayground
