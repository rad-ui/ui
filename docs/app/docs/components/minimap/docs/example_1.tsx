"use client"

import Minimap from "@radui/ui/Minimap"

const MinimapExample = () => {
    return (
        <div className="flex gap-8">
            <div className="flex-1 space-y-8">
                <Minimap.Waypoint id="section-intro" label="Introduction" />
                <section id="section-intro">
                    <h3 className="font-semibold mb-2">Introduction</h3>
                    <p className="text-sm text-gray-600">This is the introduction section of the page.</p>
                </section>
                <Minimap.Waypoint id="section-details" label="Details" />
                <section id="section-details">
                    <h3 className="font-semibold mb-2">Details</h3>
                    <p className="text-sm text-gray-600">This is the details section of the page.</p>
                </section>
            </div>
            <Minimap.Root>
                <Minimap.Track>
                    <Minimap.Content>
                        <Minimap.Item id="section-intro">
                            <Minimap.Bubble />
                            <Minimap.Line />
                        </Minimap.Item>
                        <Minimap.Item id="section-details">
                            <Minimap.Bubble />
                        </Minimap.Item>
                    </Minimap.Content>
                </Minimap.Track>
            </Minimap.Root>
        </div>
    )
}

export default MinimapExample
