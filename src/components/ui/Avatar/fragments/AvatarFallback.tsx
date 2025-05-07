import AvatarPrimitiveFallback, { AvatarPrimitiveFallbackProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';

const AvatarFallback = ({ children, ...props }: AvatarPrimitiveFallbackProps) => {
    return <AvatarPrimitiveFallback {...props}>{children}</AvatarPrimitiveFallback>;
};

export default AvatarFallback;
