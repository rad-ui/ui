import AvatarGroup from "@radui/ui/AvatarGroup";

export default () => {
    return (
        <AvatarGroup.Root>
            <AvatarGroup.Item>
                <AvatarGroup.Avatar />
                <AvatarGroup.Fallback />
            </AvatarGroup.Item>
        </AvatarGroup.Root>
    )
}