import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export type AvatarPrimitiveFallbackProps = React.ComponentPropsWithoutRef<typeof Primitive.span> & {
    /**
     * Wait this many ms before showing the fallback, so it doesn't flash while
     * a fast image loads. Also accepted as `delayMs` (Radix).
     */
    delay?: number;
    /** @deprecated Use `delay`. */
    delayMs?: number;
};

const AvatarPrimitiveFallback = React.forwardRef<React.ElementRef<typeof Primitive.span>, AvatarPrimitiveFallbackProps>(({ children, asChild = false, className = '', delay, delayMs, ...props }, ref) => {
    const { isImageLoaded } = useContext(AvatarPrimitiveContext);
    const wait = delay ?? delayMs ?? 0;
    const [canRender, setCanRender] = React.useState(wait <= 0);

    React.useEffect(() => {
        if (wait <= 0) {
            setCanRender(true);
            return;
        }
        const timer = setTimeout(() => setCanRender(true), wait);
        return () => clearTimeout(timer);
    }, [wait]);

    if (isImageLoaded || !canRender) return null;
    return <Primitive.span ref={ref} asChild={asChild} className={className} {...props}>{children}</Primitive.span>;
});

AvatarPrimitiveFallback.displayName = 'AvatarPrimitiveFallback';

export default AvatarPrimitiveFallback;
