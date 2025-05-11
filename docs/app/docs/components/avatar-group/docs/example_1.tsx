"use client";
import AvatarGroup from "@radui/ui/AvatarGroup";

const AvatarGroupExample = () => (
  <AvatarGroup.Root>
    <AvatarGroup.Item color='blue'>
      <AvatarGroup.Avatar src="https://i.pravatar.cc/64" alt="Avatar 1" />
      <AvatarGroup.Fallback>RU</AvatarGroup.Fallback>
    </AvatarGroup.Item>
    <AvatarGroup.Item color='red'>
      <AvatarGroup.Avatar src="https://i.pravatar.cc/65" alt="Avatar 2" />
      <AvatarGroup.Fallback>PK</AvatarGroup.Fallback>
    </AvatarGroup.Item>
    <AvatarGroup.Item color='green'>
      <AvatarGroup.Avatar src="https://i.pravatar.cc/66" alt="Avatar 3" />
      <AvatarGroup.Fallback>RS</AvatarGroup.Fallback>
    </AvatarGroup.Item>
  </AvatarGroup.Root>
)

export default AvatarGroupExample;