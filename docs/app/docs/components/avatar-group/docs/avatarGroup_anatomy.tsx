import AvatarGroup from "@radui/ui/AvatarGroup";

export default () => {
    return (
        <AvatarGroup.Root>
            <AvatarGroup.AvatarRoot>
                <AvatarGroup.AvatarImage />
                <AvatarGroup.AvatarFallback />
            </AvatarGroup.AvatarRoot>
        </AvatarGroup.Root>
    )
}