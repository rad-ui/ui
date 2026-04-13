"use client"

import Tree from "@radui/ui/Tree"

const TreeExample = () => {
    return (
        <Tree.Root>
            <Tree.Item label="src">
                <Tree.Item label="components">
                    <Tree.Item label="Button.tsx" />
                    <Tree.Item label="Input.tsx" />
                </Tree.Item>
                <Tree.Item label="utils">
                    <Tree.Item label="helpers.ts" />
                </Tree.Item>
                <Tree.Item label="index.ts" />
            </Tree.Item>
            <Tree.Item label="package.json" />
            <Tree.Item label="tsconfig.json" />
        </Tree.Root>
    )
}

export default TreeExample
