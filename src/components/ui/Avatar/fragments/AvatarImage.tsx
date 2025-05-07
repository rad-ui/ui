import AvatarPrimitiveImage, { AvatarRootImageProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';

const AvatarImage = ({ children, ...props }: AvatarRootImageProps) => {
    return <AvatarPrimitiveImage {...props}>{children}</AvatarPrimitiveImage>;
};

export default AvatarImage;
