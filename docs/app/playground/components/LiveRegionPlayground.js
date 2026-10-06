'use client'

import React from "react"
import Button from "@radui/ui/Button"
import LiveRegion from "@radui/ui/LiveRegion"
import PlaygroundSection from "../helpers/PlaygroundSection"

const LiveRegionPlayground = () => {
    const [message, setMessage] = React.useState("Ready")

    return (
        <div>
            <PlaygroundSection
                title="LiveRegion"
                docsLink="/docs/components/live-region"
                description="Announces dynamic status updates to assistive technology."
            >
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" onClick={() => setMessage(`Saved at ${new Date().toLocaleTimeString()}`)}>
                        Update live region
                    </Button>
                    <span className="text-sm text-gray-950">{message}</span>
                    <LiveRegion>{message}</LiveRegion>
                </div>
            </PlaygroundSection>
        </div>
    )
}

export default LiveRegionPlayground
