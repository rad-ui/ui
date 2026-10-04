'use client'

import Heading from "@radui/ui/Heading"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const levels = ["h1", "h2", "h3", "h4", "h5", "h6"].map((level) => ({ key: level, label: level, value: level }))

const HeadingPlayground = () => (
    <PlaygroundSection title="Heading" docsLink="/docs/components/heading" description="Type scale for every heading level.">
        <Matrix
            rows={levels}
            columns={[{ key: "sample" }]}
            renderCell={(level) => <Heading as={level.value}>The quick brown fox</Heading>}
        />
    </PlaygroundSection>
)

export default HeadingPlayground
