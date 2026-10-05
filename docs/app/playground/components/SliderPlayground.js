'use client'

import React from "react"
import Slider from "@radui/ui/Slider"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const SliderPlayground = () => {
    const [range, setRange] = React.useState([24, 72])

    const rows = [
        { key: "single", label: "single", render: () => <Slider aria-label="Single" defaultValue={40} /> },
        { key: "range", label: "range", render: () => <Slider aria-label="Range" value={range} onValueChange={setRange} /> },
        { key: "disabled", label: "disabled", render: () => <Slider aria-label="Disabled" defaultValue={64} disabled /> }
    ]

    return (
        <PlaygroundSection title="Slider" docsLink="/docs/components/slider" description="Single thumb, range, and disabled.">
            <Matrix rows={rows} columns={[{ key: "slider" }]} renderCell={(row) => <div className="w-72">{row.render()}</div>} />
        </PlaygroundSection>
    )
}

export default SliderPlayground
