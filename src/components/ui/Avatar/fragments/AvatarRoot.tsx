import AvatarPrimitiveRoot, { AvatarPrimitiveRootProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';

const AvatarRoot = ({ children, ...props }: AvatarPrimitiveRootProps) => {
    return <AvatarPrimitiveRoot {...props}>{children}</AvatarPrimitiveRoot>;
};

export default AvatarRoot;
