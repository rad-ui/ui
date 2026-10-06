import React, { useState, useMemo, useCallback } from 'react';
import { AvatarPrimitiveContext, AvatarImageLoadingStatus } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';

export type AvatarPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

const AvatarPrimitiveRoot = React.forwardRef<React.ElementRef<typeof Primitive.span>, AvatarPrimitiveRootProps>(({ children, asChild = false, ...props }, ref) => {
    const [imageLoadingStatus, setImageLoadingStatus] = useState<AvatarImageLoadingStatus>('idle');
    const isImageLoaded = imageLoadingStatus === 'loaded';
    const hasError = imageLoadingStatus === 'error';

    // Stable callbacks: the image part lists them as effect dependencies.
    const handleLoadImage = useCallback(() => setImageLoadingStatus('loaded'), []);
    const handleErrorImage = useCallback(() => setImageLoadingStatus('error'), []);
    const handleLoadingImage = useCallback(() => setImageLoadingStatus('loading'), []);

    // Check if an image with src is present in children
    const hasImage = useMemo(() => {
        if (!children) return false;
        const checkForImage = (node: React.ReactNode): boolean => {
            if (React.isValidElement(node)) {
                // Check if it's an img element with src
                if (node.type === 'img' && node.props?.src) {
                    return true;
                }
                // Check if it's an AvatarImage component with src
                if (node.props?.src) {
                    return true;
                }
                // Recursively check children
                if (node.props?.children) {
                    return React.Children.toArray(node.props.children).some(checkForImage);
                }
            }
            return false;
        };
        return React.Children.toArray(children).some(checkForImage);
    }, [children]);

    const values = useMemo(() => ({
        imageLoadingStatus,
        isImageLoaded,
        hasError,
        handleLoadImage,
        handleErrorImage,
        handleLoadingImage
    }), [imageLoadingStatus, isImageLoaded, hasError, handleLoadImage, handleErrorImage, handleLoadingImage]);

    // `data-rad-ui-has-image` styles the fallback as an image placeholder. Once the
    // image has failed, the fallback is the final content and gets its normal styling
    // (e.g. the accent color), so the attribute is dropped.
    const showsImage = hasImage && !hasError;

    return <AvatarPrimitiveContext.Provider value={values} >
        <Primitive.span ref={ref} asChild={asChild} data-rad-ui-has-image={showsImage ? '' : undefined} {...props}>{children}</Primitive.span>
    </AvatarPrimitiveContext.Provider>;
});

AvatarPrimitiveRoot.displayName = 'AvatarPrimitiveRoot';

export default AvatarPrimitiveRoot;
