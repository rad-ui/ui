import React from 'react';

export interface AvatarPrimitiveProps {
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const AvatarPrimitive: React.FC<AvatarPrimitiveProps> = ({
    src,
    alt = '',
    fallback,
    className,
    onClick
}) => {
    const [imageError, setImageError] = React.useState(false);

    return (
        <div
            className={className}
            onClick={onClick}
            role={onClick ? 'button' : 'img'}
        >
            {src && !imageError
                ? (
                    <img
                        src={src}
                        alt={alt}
                        onError={() => setImageError(true)}
                    />
                )
                : (
                    fallback || alt?.charAt(0).toUpperCase() || '?'
                )}
        </div>
    );
};

export default AvatarPrimitive;
