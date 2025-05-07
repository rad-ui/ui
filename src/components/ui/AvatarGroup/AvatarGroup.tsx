import AvatarGroupRoot from './fragments/AvatarGroupRoot';
import AvatarGroupItem from './fragments/AvatarGroupItem';
import AvatarGroupAvatar from './fragments/AvatarGroupAvatar';
import AvatarGroupFallback from './fragments/AvatarGroupFallback';

const AvatarGroup = () => {
    console.warn('Direct usage of AvatarGroup is not supported. Please use AvatarGroup.Root, AvatarGroup.Item, AvatarGroup.Avatar, AvatarGroup.Fallback instead.');
    return null;
};

AvatarGroup.Root = AvatarGroupRoot;
AvatarGroup.Item = AvatarGroupItem;
AvatarGroup.Avatar = AvatarGroupAvatar;
AvatarGroup.Fallback = AvatarGroupFallback;

export default AvatarGroup;
