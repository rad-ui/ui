import DropdownMenu from "@radui/ui/DropdownMenu"

export default () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger />
            <DropdownMenu.Portal>
                <DropdownMenu.Content>
                    <DropdownMenu.Item />
                    <DropdownMenu.Separator />
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger />
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
