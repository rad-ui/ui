import ContextMenu from "@radui/ui/ContextMenu"

export default () => {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content>
                    <ContextMenu.Item>Copy</ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Sub>
                        <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
                    </ContextMenu.Sub>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    )
}
