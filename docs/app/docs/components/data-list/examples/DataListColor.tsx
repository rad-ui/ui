"use client"

import DataList from "@radui/ui/DataList"

const DataListColor = () => {
    const colors = ['blue', 'green', 'red', 'purple'] as const;
    return (
        <div className="flex flex-col gap-8">
            {colors.map((color) => (
                <div key={color}>
                    <p className="text-gray-500 text-xs mb-2">label color: {color}</p>
                    <DataList.Root>
                        <DataList.Item>
                            <DataList.Label color={color}>Name</DataList.Label>
                            <DataList.Value>Jane Doe</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label color={color}>Role</DataList.Label>
                            <DataList.Value>Senior Engineer</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label color={color}>Location</DataList.Label>
                            <DataList.Value>San Francisco, CA</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </div>
            ))}
        </div>
    )
}

export default DataListColor
