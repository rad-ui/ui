import Minimap from "@radui/ui/Minimap"

export default () => {
    return (
        <Minimap.Provider>
            <Minimap.Waypoint value="section" />
            <Minimap.Root>
                <Minimap.Track>
                    <Minimap.Content>
                        <Minimap.Item value="section">
                            <Minimap.Bubble />
                            <Minimap.Line />
                        </Minimap.Item>
                    </Minimap.Content>
                </Minimap.Track>
            </Minimap.Root>
        </Minimap.Provider>
    )
}
