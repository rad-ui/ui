'use client'

import AvatarGroup from "@radui/ui/AvatarGroup"
import Matrix, { toAxis } from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const people = [
    ["Nina", "NI", 15],
    ["Omar", "OM", 28],
    ["Maya", "MY", 44]
]

const variants = [{ key: "default", label: "overlap", value: undefined }, ...toAxis(["square", "spacing"])]

const AvatarGroupPlayground = () => (
    <PlaygroundSection title="AvatarGroup" docsLink="/docs/components/avatar-group" description="variant × size, images and fallbacks.">
        <Matrix
            rows={variants}
            columns={toAxis(["small", "medium", "large"])}
            renderCell={(variant, size) => (
                <AvatarGroup.Root size={size.value === "medium" ? undefined : size.value} variant={variant.value}>
                    {people.map(([name, initials, image], index) => (
                        <AvatarGroup.Item key={name}>
                            {index < 2 ? <AvatarGroup.Avatar src={`https://i.pravatar.cc/96?img=${image}`} alt={name} /> : null}
                            <AvatarGroup.Fallback>{initials}</AvatarGroup.Fallback>
                        </AvatarGroup.Item>
                    ))}
                </AvatarGroup.Root>
            )}
        />
    </PlaygroundSection>
)

export default AvatarGroupPlayground
