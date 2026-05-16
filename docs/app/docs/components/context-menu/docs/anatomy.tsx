import ContextMenu from "@radui/ui/ContextMenu"

export default () => {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger />
            <ContextMenu.Portal>
                <ContextMenu.Content>
                    <ContextMenu.Item />
                    <ContextMenu.Separator />
                    <ContextMenu.Sub>
                        <ContextMenu.SubTrigger />
                    </ContextMenu.Sub>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    )
}
