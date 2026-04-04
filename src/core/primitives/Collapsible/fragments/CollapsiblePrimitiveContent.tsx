import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { useCollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';
import { composeRefs } from '~/core/utils/mergeProps';

type CollapsiblePrimitiveContentElement = React.ElementRef<typeof Primitive.div>;
export type CollapsiblePrimitiveContentProps = React.ComponentPropsWithoutRef<
    typeof Primitive.div
> & {
    forceMount?: boolean;
};

const CollapsiblePrimitiveContent = React.forwardRef<
    CollapsiblePrimitiveContentElement,
    CollapsiblePrimitiveContentProps
>(({ children, className, asChild = false, forceMount = false, style, ...props }, forwardedRef) => {
    const {
        open,
        contentId,
        transitionDuration,
        transitionTimingFunction
    } = useCollapsiblePrimitiveContext();

    const [height, setHeight] = useState<number | undefined>(open ? undefined : 0);
    const heightRef = useRef(height);
    const [shouldRender, setShouldRender] = useState(open || forceMount);
    const animationTimeoutRef = useRef<NodeJS.Timeout>();
    const rafRef = useRef<number>();
    const ref = useRef<HTMLDivElement | null>(null);

    // Track presence for mounting/unmounting
    useEffect(() => {
        if (open || forceMount) {
            setShouldRender(true);
        }
    }, [open, forceMount]);

    useEffect(() => {
        heightRef.current = height;
    }, [height]);

    useLayoutEffect(() => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        if (!ref.current) return;

        if (transitionDuration === 0) {
            setHeight(open ? undefined : 0);

            if (!open && !forceMount) {
                setShouldRender(false);
            }
            return;
        }

        if (open) {
            setHeight(0);

            rafRef.current = requestAnimationFrame(() => {
                const _ = ref.current?.offsetHeight;

                rafRef.current = requestAnimationFrame(() => {
                    if (ref.current) {
                        const contentHeight = ref.current.scrollHeight;
                        setHeight(contentHeight);
                    }
                });
            });

            animationTimeoutRef.current = setTimeout(() => {
                setHeight(undefined);
            }, transitionDuration);
        } else {
            const contentHeight = ref.current.scrollHeight;
            setHeight(contentHeight);

            rafRef.current = requestAnimationFrame(() => {
                const _ = ref.current?.offsetHeight;

                rafRef.current = requestAnimationFrame(() => {
                    setHeight(0);
                });
            });

            animationTimeoutRef.current = setTimeout(() => {
                if (!forceMount) {
                    setShouldRender(false);
                }
            }, transitionDuration);
        }

        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [open, transitionDuration, forceMount]);

    const isClosed = !open && !forceMount;
    const shouldHide = isClosed && !shouldRender;

    if (shouldHide) {
        return null;
    }

    const dynamicStyle: React.CSSProperties = {
        ...style,
        overflow: 'hidden',
        height: height !== undefined ? `${height}px` : undefined,
        ...(transitionDuration > 0
            ? { transition: `height ${transitionDuration}ms ${transitionTimingFunction}` }
            : {})
    };

    const shouldUseAsChild = asChild && React.isValidElement(children);

    return (
        <Primitive.div
            id={contentId}
            ref={composeRefs(forwardedRef, ref)}
            aria-hidden={!open}
            data-state={open ? 'open' : 'closed'}
            className={className}
            style={dynamicStyle}
            asChild={shouldUseAsChild}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

CollapsiblePrimitiveContent.displayName = 'CollapsiblePrimitiveContent';

export default CollapsiblePrimitiveContent;
