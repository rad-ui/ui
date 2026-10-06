'use client'

import Avatar from "@radui/ui/Avatar"
import Matrix, { toAxis } from "../helpers/Matrix"
import { usePlayground } from "../helpers/PlaygroundContext"
import PlaygroundSection from "../helpers/PlaygroundSection"

const rows = [
    { key: "image", label: "image" },
    { key: "fallback", label: "fallback" },
    { key: "square", label: "square" },
    { key: "color", label: "accent fallback" }
]

const AvatarPlayground = () => {
    const { accent } = usePlayground()

    return (
        <PlaygroundSection title="Avatar" docsLink="/docs/components/avatar" description="content × size, with square and accent variants.">
            <Matrix
                rows={rows}
                columns={toAxis(["small", "medium", "large"])}
                renderCell={(row, size) => (
                    <Avatar.Root
                        size={size.value === "medium" ? undefined : size.value}
                        variant={row.key === "square" ? "square" : undefined}
                        color={row.key === "color" ? accent : undefined}
                    >
                        {row.key === "image" || row.key === "square" ? <Avatar.Image src="https://i.pravatar.cc/96?img=32" alt="Sam" /> : null}
                        <Avatar.Fallback>SM</Avatar.Fallback>
                    </Avatar.Root>
                )}
            />
        </PlaygroundSection>
    )
}

export default AvatarPlayground
