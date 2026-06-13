"use client"

import DataList from "@radui/ui/DataList"

const DataListExample = () => {
    return (
        <DataList.Root>
            <DataList.Item>
                <DataList.Label>Name</DataList.Label>
                <DataList.Value>Jane Doe</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Role</DataList.Label>
                <DataList.Value>Senior Engineer</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Location</DataList.Label>
                <DataList.Value>San Francisco, CA</DataList.Value>
            </DataList.Item>
        </DataList.Root>
    )
}

export default DataListExample
