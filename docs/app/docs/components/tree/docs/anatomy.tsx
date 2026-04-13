import Tree from "@radui/ui/Tree"

export default () => {
    return (
        <Tree.Root>
            <Tree.Item label="Parent">
                <Tree.Item label="Child" />
            </Tree.Item>
        </Tree.Root>
    )
}
