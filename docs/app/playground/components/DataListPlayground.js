'use client'

import Badge from "@radui/ui/Badge"
import DataList from "@radui/ui/DataList"
import PlaygroundSection from "../helpers/PlaygroundSection"

const DataListPlayground = () => (
    <div>
        <PlaygroundSection
            title="DataList"
            docsLink="/docs/components/data-list"
            description="Label and value pairs for metadata and record details."
        >
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label>Status</DataList.Label>
                    <DataList.Value><Badge color="green">Live</Badge></DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>Version</DataList.Label>
                    <DataList.Value>0.6.0</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </PlaygroundSection>
    </div>
)

export default DataListPlayground
