import AvatarGroupRoot, { AvatarGroupRootProps } from './fragments/AvatarGroupRoot';
import AvatarGroupItem, { AvatarGroupItemProps } from './fragments/AvatarGroupItem';
import AvatarGroupAvatar, { AvatarGroupAvatarProps } from './fragments/AvatarGroupAvatar';
import AvatarGroupFallback, { AvatarGroupFallbackProps } from './fragments/AvatarGroupFallback';

const AvatarGroup = () => {
    console.warn('Direct usage of AvatarGroup is not supported. Please use AvatarGroup.Root, AvatarGroup.Item, AvatarGroup.Avatar, AvatarGroup.Fallback instead.');
    return null;
};

export namespace AvatarGroupProps {
    export type Root = AvatarGroupRootProps;
    export type Item = AvatarGroupItemProps;
    export type Avatar = AvatarGroupAvatarProps;
    export type Fallback = AvatarGroupFallbackProps;
}

AvatarGroup.Root = AvatarGroupRoot;
AvatarGroup.Item = AvatarGroupItem;
AvatarGroup.Avatar = AvatarGroupAvatar;
AvatarGroup.Fallback = AvatarGroupFallback;

export default AvatarGroup;
