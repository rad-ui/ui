import Menubar from "@radui/ui/Menubar"

export default () => {
    return (
        <Menubar.Root>
            <Menubar.Menu>
                <Menubar.Trigger />
                <Menubar.Portal>
                    <Menubar.Content>
                        <Menubar.Item />
                        <Menubar.Separator />
                        <Menubar.Sub>
                            <Menubar.SubTrigger />
                        </Menubar.Sub>
                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>
        </Menubar.Root>
    )
}
