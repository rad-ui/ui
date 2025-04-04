import AvatarGroup from "@radui/ui/AvatarGroup";

const avatars = [
  { src: 'https://i.pravatar.cc/64', fallback: 'RU', alt: 'Avatar 1' },
  { src: 'https://i.pravatar.cc/65', fallback: 'PK', alt: 'Avatar 2' },
  { src: 'https://i.pravatar.cc/66', fallback: 'RS', alt: 'Avatar 3' },
]

const AvatarGroupExample = () => (
  <div>
    <AvatarGroup avatars={avatars} />
  </div>
)

export default AvatarGroupExample;