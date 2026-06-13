"use client"

import DataList from "@radui/ui/DataList"

const DataListSizes = () => {
    const sizes = ['small', 'medium', 'large'] as const;
    return (
        <div className="flex flex-col gap-8">
            {sizes.map((size) => (
                <div key={size}>
                    <p className="text-gray-500 text-xs mb-2">size: {size}</p>
                    <DataList.Root size={size}>
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
                </div>
            ))}
        </div>
    )
}

export default DataListSizes
