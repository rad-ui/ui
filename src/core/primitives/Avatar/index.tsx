import AvatarPrimitiveRoot from './fragments/AvatarPrimitiveRoot';
import AvatarPrimitiveFallback from './fragments/AvatarPrimitiveFallback';
import AvatarPrimitiveImage from './fragments/AvatarPrimitiveImage';

const AvatarPrimitive = {
    Root: AvatarPrimitiveRoot,
    Fallback: AvatarPrimitiveFallback,
    Image: AvatarPrimitiveImage
} as const;

export default AvatarPrimitive;
