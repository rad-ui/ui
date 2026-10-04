'use client'

import Code from "@radui/ui/Code"
import Matrix, { toAxis } from "../helpers/Matrix"
import { usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const variants = [{ key: "default", label: "default", value: undefined }, ...toAxis(["outline"])]

const CodePlayground = () => {
    const { accent } = usePlayground()

    return (
        <PlaygroundSection title="Code" docsLink="/docs/components/code" description="variant × size.">
            <Matrix
                rows={variants}
                columns={toAxis(["small", "medium", "large", "x-large"])}
                renderCell={(variant, size) => (
                    <Code variant={variant.value} size={size.value} color={accent === "gray" ? undefined : accent}>npm run build</Code>
                )}
            />
        </PlaygroundSection>
    )
}

export default CodePlayground
