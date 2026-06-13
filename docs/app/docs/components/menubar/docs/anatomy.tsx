import Menubar from "@radui/ui/Menubar"

export default () => {
    return (
        <Menubar.Root>
            <Menubar.Menu>
                <Menubar.Trigger>File</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content>
                        <Menubar.Item>New</Menubar.Item>
                        <Menubar.Separator />
                        <Menubar.Sub>
                            <Menubar.SubTrigger>Share</Menubar.SubTrigger>
                        </Menubar.Sub>
                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>
        </Menubar.Root>
    )
}
