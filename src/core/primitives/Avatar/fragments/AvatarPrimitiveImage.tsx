import React, { useCallback, useContext, useRef } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { composeRefs } from '~/core/utils/mergeProps';

export type AvatarRootImageProps = React.ComponentPropsWithoutRef<typeof Primitive.img> & {
    src?: string;
    alt?: string;
};

const AvatarPrimitiveImage = React.forwardRef<React.ElementRef<typeof Primitive.img>, AvatarRootImageProps>(({ src = '', alt = '', onLoad, onError, ...props }, ref) => {
    const { handleErrorImage, handleLoadImage, handleLoadingImage, hasError, isImageLoaded } = useContext(AvatarPrimitiveContext);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const composedRef = React.useMemo(() => composeRefs<HTMLImageElement>(ref as React.Ref<HTMLImageElement>, imageRef), [ref]);

    // Every hook runs before any early return (rules of hooks).
    // On every src change, discard the previous result: a src that failed must not
    // keep a later, valid src hidden forever, and a previously loaded src must not
    // mark the new one as loaded before it actually is.
    useLayoutEffect(() => {
        if (!src) {
            handleErrorImage();
            return;
        }

        handleLoadingImage();

        // The browser may have finished (or failed) loading before React attached
        // onLoad/onError — e.g. a cached image, or an SSR-rendered <img> that loaded
        // before hydration. Those events will never fire again, so settle the state now.
        const image = imageRef.current;
        if (image && image.complete) {
            if (image.naturalWidth > 0) {
                handleLoadImage();
            } else if (typeof image.decode === 'function') {
                // naturalWidth is 0 both for broken images and for SVGs without
                // intrinsic size; decode() tells them apart.
                image.decode().then(handleLoadImage, () => {
                    if (imageRef.current === image && image.getAttribute('src') === src) {
                        handleErrorImage();
                    }
                });
            } else {
                handleErrorImage();
            }
        }
    }, [src, handleErrorImage, handleLoadImage, handleLoadingImage]);

    const handleLoad = useCallback((event: React.SyntheticEvent<any>) => {
        onLoad?.(event);
        handleLoadImage();
    }, [onLoad, handleLoadImage]);

    const handleError = useCallback((event: React.SyntheticEvent<any>) => {
        onError?.(event);
        handleErrorImage();
    }, [onError, handleErrorImage]);

    if (hasError) {
        return null;
    }

    return (
        <Primitive.img
            ref={composedRef}
            src={src}
            alt={alt}
            // `loading` until the browser has decoded the image; styles can keep the
            // fallback visible instead of showing a half-loaded or broken <img>.
            data-state={isImageLoaded ? 'loaded' : 'loading'}
            {...props}
            // @ts-ignore - Primitive.img is typed with generic HTML attributes
            onLoad={handleLoad}
            onError={handleError}
        />
    );
});

AvatarPrimitiveImage.displayName = 'AvatarPrimitiveImage';

export default AvatarPrimitiveImage;
