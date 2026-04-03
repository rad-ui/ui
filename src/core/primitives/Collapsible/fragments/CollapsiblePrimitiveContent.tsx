import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { useCollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';

type CollapsiblePrimitiveContentElement = React.ElementRef<typeof Primitive.div>;
export type CollapsiblePrimitiveContentProps = React.ComponentPropsWithoutRef<
    typeof Primitive.div
> & {
    forceMount?: boolean;
};

const CollapsiblePrimitiveContent = React.forwardRef<
    CollapsiblePrimitiveContentElement,
    CollapsiblePrimitiveContentProps
>(({ children, className, asChild = false, forceMount = false, ...props }, forwardedRef) => {
    const {
        open,
        contentId,
        transitionDuration,
        transitionTimingFunction
    } = useCollapsiblePrimitiveContext();

    const ref = useRef<CollapsiblePrimitiveContentElement | null>(null);
    const setRefs = (node: CollapsiblePrimitiveContentElement) => {
        ref.current = node;
        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<CollapsiblePrimitiveContentElement | null>).current = node;
        }
    };
    const [height, setHeight] = useState<number | undefined>(open ? undefined : 0);
    const heightRef = useRef(height);
    const [shouldRender, setShouldRender] = useState(open || forceMount);
    const animationTimeoutRef = useRef<NodeJS.Timeout>();
    const rafRef = useRef<number>();

    // When opening, we need to immediately render
    useEffect(() => {
        if (open || forceMount) {
            setShouldRender(true);
        }
    }, [open, forceMount]);

    useEffect(() => {
        if (!open || !ref.current || transitionDuration === 0) return;

        const resizeObserver = new ResizeObserver(() => {
            if (ref.current && heightRef.current !== undefined) {
                const newHeight = ref.current.scrollHeight;
                if (newHeight !== heightRef.current) {
                    setHeight(newHeight);
                }
            }
        });

        // Observe the first child if possible for more accurate content measurement,
        // or the ref itself if it's not currently animating height: 0
        resizeObserver.observe(ref.current);

        return () => resizeObserver.disconnect();
    }, [open, transitionDuration]);

    useEffect(() => {
        heightRef.current = height;
    }, [height]);

    useLayoutEffect(() => {
        // Clear any existing timeout and animation frames to avoid conflicts
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

            // After animation completes, set height to undefined for responsive flexibility
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
    }, [open, transitionDuration, forceMount, shouldRender]);

    // Don't render anything if closed and animation is complete
    if (!shouldRender && !open && !forceMount) {
        return null;
    }

    const shouldUseAsChild = asChild && React.isValidElement(children);

    return (
        <Primitive.div
            id={contentId}
            ref={setRefs}
            aria-hidden={!open}
            data-state={open ? 'open' : 'closed'}
            className={className}
            style={{
                height: height !== undefined ? `${height}px` : undefined,
                overflow: 'hidden',
                ...(transitionDuration > 0
                    ? { transition: `height ${transitionDuration}ms ${transitionTimingFunction}` }
                    : {})
            }}
            asChild={shouldUseAsChild}
            {...props}
        >
            {children}
        </Primitive.div>
    );
}
);

CollapsiblePrimitiveContent.displayName = 'CollapsiblePrimitiveContent';

export default CollapsiblePrimitiveContent;
