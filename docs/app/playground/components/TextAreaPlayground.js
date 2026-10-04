'use client'

import TextArea from "@radui/ui/TextArea"
import Matrix, { toAxis } from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const variants = [{ key: "default", label: "default", value: undefined }, ...toAxis(["soft", "outline", "ghost"]), { key: "disabled", label: "disabled", value: undefined }]

const TextAreaPlayground = () => (
    <PlaygroundSection title="TextArea" docsLink="/docs/components/text-area" description="variant × size, and disabled.">
        <Matrix
            align="top"
            rows={variants}
            columns={toAxis(["small", "medium", "large"])}
            renderCell={(variant, size) => (
                <TextArea
                    variant={variant.value}
                    size={size.value}
                    disabled={variant.key === "disabled"}
                    rows={2}
                    placeholder="Write a short profile..."
                    aria-label={`${variant.label} ${size.label}`}
                />
            )}
        />
    </PlaygroundSection>
)

export default TextAreaPlayground
