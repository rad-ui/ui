"use client"

import Tree from "@radui/ui/Tree"

const items = [
    {
        label: 'src',
        expanded: true,
        items: [
            {
                label: 'components',
                expanded: false,
                items: [
                    { label: 'Button.tsx', expanded: false },
                    { label: 'Input.tsx', expanded: false }
                ]
            },
            {
                label: 'utils',
                expanded: false,
                items: [
                    { label: 'helpers.ts', expanded: false }
                ]
            },
            { label: 'index.ts', expanded: false }
        ]
    },
    { label: 'package.json', expanded: false },
    { label: 'tsconfig.json', expanded: false }
]

const TreeExample = () => {
    return (
        <Tree.Root>
            {items.map((item) => (
                <Tree.Item key={item.label} item={item}>
                    {item.label}
                </Tree.Item>
            ))}
        </Tree.Root>
    )
}

export default TreeExample
