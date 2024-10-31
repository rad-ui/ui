import AvatarPrimitiveRoot from './fragments/AvatarPrimitiveRoot';
import AvatarPrimitiveFallback from './fragments/AvatarPrimitiveFallback';
import AvatarRootImage from './fragments/AvatarRootImage';

const AvatarPrimitive = {
    Root: AvatarPrimitiveRoot,
    Fallback: AvatarPrimitiveFallback,
    Image: AvatarRootImage
} as const;

export default AvatarPrimitive;
