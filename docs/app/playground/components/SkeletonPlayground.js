'use client'

import Skeleton from "@radui/ui/Skeleton"
import PlaygroundSection from "../helpers/PlaygroundSection"

const SkeletonPlayground = () => (
    <div>
        <PlaygroundSection
            title="Skeleton"
            docsLink="/docs/components/skeleton"
            description="Shimmering placeholders that hold layout while content loads."
        >
            <div className="grid max-w-md gap-2">
                <Skeleton height="1rem" width="66%" />
                <Skeleton height="1rem" width="100%" />
                <Skeleton height="1rem" width="50%" />
            </div>
        </PlaygroundSection>
    </div>
)

export default SkeletonPlayground
