import Popover from "@radui/ui/Popover";

export default () => {
    return (
        <Popover.Root>
            <Popover.Trigger>Open popover</Popover.Trigger>
            <Popover.Portal>
                <Popover.Content>
                    <Popover.Close>Close</Popover.Close>
                    <Popover.Arrow />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}