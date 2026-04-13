import HoverCard from "@radui/ui/HoverCard"

export default () => {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger />
            <HoverCard.Portal>
                <HoverCard.Content>
                    <HoverCard.Arrow />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}
