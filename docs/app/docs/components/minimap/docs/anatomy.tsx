import Minimap from "@radui/ui/Minimap"

export default () => {
    return (
        <Minimap.Provider>
            <Minimap.Waypoint value="section">
                {/* page section content */}
            </Minimap.Waypoint>
            <Minimap.Root>
                <Minimap.Item value="section">
                    <Minimap.Track>
                        <Minimap.Bubble />
                        <Minimap.Line />
                    </Minimap.Track>
                    <Minimap.Content />
                </Minimap.Item>
            </Minimap.Root>
        </Minimap.Provider>
    )
}
