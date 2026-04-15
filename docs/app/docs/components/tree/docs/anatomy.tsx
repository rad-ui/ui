import Tree from "@radui/ui/Tree"

const item = { label: 'Parent', expanded: true, items: [{ label: 'Child', expanded: false }] }

export default () => {
    return (
        <Tree.Root>
            <Tree.Item item={item}>
                {item.label}
            </Tree.Item>
        </Tree.Root>
    )
}
