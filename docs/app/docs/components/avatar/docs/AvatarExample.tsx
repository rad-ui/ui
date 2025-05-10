"use client"
import Avatar from "@radui/ui/Avatar"

const AvatarExample = () => {
    return <Avatar.Root>
        <Avatar.Image src="https://i.pravatar.cc/1000" />
        <Avatar.Fallback>KL</Avatar.Fallback>
    </Avatar.Root>
}

export default AvatarExample;