import Minimap from "@radui/ui/Minimap"

export default () => {
    return (
        <Minimap.Provider>
            <Minimap.Waypoint id="section" label="Section" />
            <Minimap.Root>
                <Minimap.Track>
                    <Minimap.Content>
                        <Minimap.Item id="section">
                            <Minimap.Bubble />
                            <Minimap.Line />
                        </Minimap.Item>
                    </Minimap.Content>
                </Minimap.Track>
            </Minimap.Root>
        </Minimap.Provider>
    )
}
