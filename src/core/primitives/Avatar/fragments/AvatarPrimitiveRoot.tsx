import React, { useState, useMemo } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';

export type AvatarPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

const AvatarPrimitiveRoot = React.forwardRef<React.ElementRef<typeof Primitive.span>, AvatarPrimitiveRootProps>(({ children, asChild = false, ...props }, ref) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoadImage = () => {
        setIsImageLoaded(true);
        setHasError(false);
    };

    const handleErrorImage = () => {
        setIsImageLoaded(false);
        setHasError(true);
    };

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

    const values = {
        isImageLoaded,
        hasError,
        setHasError,
        handleLoadImage,
        handleErrorImage
    };

    return <AvatarPrimitiveContext.Provider value={values} >
        <Primitive.span ref={ref} asChild={asChild} data-rad-ui-has-image={hasImage ? '' : undefined} {...props}>{children}</Primitive.span>
    </AvatarPrimitiveContext.Provider>;
});

AvatarPrimitiveRoot.displayName = 'AvatarPrimitiveRoot';

export default AvatarPrimitiveRoot;
