"use client"

import * as React from "react"
import Tree from "@radui/ui/Tree"

type FileNode = {
    label: string
    expanded?: boolean
    items?: FileNode[]
}

const createFiles = (folder: string, count: number): FileNode[] => (
    Array.from({ length: count }, (_, index) => ({
        label: `${folder}-file-${String(index + 1).padStart(3, "0")}.tsx`
    }))
)

const folders: FileNode[] = [
    {
        label: "packages",
        expanded: true,
        items: [
            { label: "core", items: createFiles("core", 80) },
            { label: "react", items: createFiles("react", 120) },
            { label: "theme", items: createFiles("theme", 64) }
        ]
    },
    {
        label: "docs",
        items: [
            { label: "components", items: createFiles("component-doc", 96) },
            { label: "guides", items: createFiles("guide", 48) }
        ]
    },
    {
        label: "examples",
        items: createFiles("example", 72)
    }
]

const LazyBranchTreeExample = () => {
    const [selectedPath, setSelectedPath] = React.useState("packages")

    const getIsSelected = React.useCallback((item: FileNode) => (
        item.label === selectedPath
    ), [selectedPath])

    return (
        <Tree.Root aria-label="Project files" loop={false}>
            {folders.map((item) => (
                <Tree.Item
                    key={item.label}
                    item={item}
                    getIsSelected={getIsSelected}
                    onToggleSelect={(_, selectedItem) => {
                        setSelectedPath(selectedItem.label)
                    }}
                >
                    {item.label}
                </Tree.Item>
            ))}
        </Tree.Root>
    )
}

export default LazyBranchTreeExample
