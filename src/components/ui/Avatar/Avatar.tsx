import AvatarRoot, { AvatarRootProps } from './fragments/AvatarRoot';
import AvatarImage, { AvatarImageProps } from './fragments/AvatarImage';
import AvatarFallback from './fragments/AvatarFallback';

const COMPONENT_NAME = 'Avatar';

const Avatar = () => {
    console.warn('Direct usage of Avatar is not supported. Please use Avatar.Root, Avatar.Image, Avatar.Fallback instead.');
    return null;
};

export namespace AvatarProps {
    export type Root = AvatarRootProps;
    export type Image = AvatarImageProps;
}

Avatar.displayName = COMPONENT_NAME;
Avatar.Root = AvatarRoot;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export type { AvatarRootProps } from './fragments/AvatarRoot';
export type { AvatarImageProps } from './fragments/AvatarImage';
export type { AvatarFallbackProps } from './fragments/AvatarFallback';
// Named part exports let React Server Components use `import * as Avatar from '@radui/ui/Avatar'`;
// property access on the default export is undefined across the client boundary.
export {
    AvatarRoot as Root,
    AvatarImage as Image,
    AvatarFallback as Fallback
};

export default Avatar;
