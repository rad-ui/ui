"use client";

import Popover from "@radui/ui/Popover";
import Button from "@radui/ui/Button";

const PopoverExample = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>Open popover</Button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content sideOffset={12}>
                    <Popover.Arrow />
                    <Popover.Close asChild>
                        <Button>Close</Button>
                    </Popover.Close>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default PopoverExample