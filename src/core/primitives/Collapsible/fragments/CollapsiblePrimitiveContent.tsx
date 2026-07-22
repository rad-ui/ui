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
    const [isPresent, setIsPresent] = useState(open || forceMount);
    const [, setCssVarRevision] = useState(0);
    const animationTimeoutRef = useRef<NodeJS.Timeout>();
    const rafRef = useRef<number>();
    const ref = useRef<HTMLDivElement | null>(null);
    const heightRef = useRef<number | undefined>(0);
    const widthRef = useRef<number | undefined>(0);
    const originalStylesRef = useRef<{
        transitionDuration: string;
        transitionProperty: string;
        transitionTimingFunction: string;
    }>();
    const isMountAnimationPreventedRef = useRef(open || forceMount);

    useEffect(() => {
        const animationFrame = requestAnimationFrame(() => {
            isMountAnimationPreventedRef.current = false;
        });

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    useLayoutEffect(() => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        const node = ref.current;

        if (!node) return;

        originalStylesRef.current = originalStylesRef.current || {
            transitionDuration: node.style.transitionDuration,
            transitionProperty: node.style.transitionProperty,
            transitionTimingFunction: node.style.transitionTimingFunction
        };

        // Measure the content at its natural size before the browser paints.
        node.style.transitionDuration = '0s';
        node.style.transitionProperty = 'none';

        const rect = node.getBoundingClientRect();
        const measuredHeight = rect.height || node.scrollHeight;
        const measuredWidth = rect.width || node.scrollWidth;

        heightRef.current = measuredHeight;
        widthRef.current = measuredWidth;

        if (!isMountAnimationPreventedRef.current) {
            node.style.transitionDuration = originalStylesRef.current.transitionDuration;
            node.style.transitionProperty = originalStylesRef.current.transitionProperty;
            node.style.transitionTimingFunction = originalStylesRef.current.transitionTimingFunction;
        }

        if (transitionDuration === 0) {
            setHeight(open ? undefined : 0);

            if (!open && !forceMount) {
                setIsPresent(false);
            } else {
                setIsPresent(true);
            }

            if (open) {
                setCssVarRevision((revision) => revision + 1);
            }

            return;
        }

        if (isMountAnimationPreventedRef.current && open) {
            setIsPresent(true);
            setHeight(undefined);
            return;
        }

        if (open) {
            setIsPresent(true);
            setHeight(0);

            rafRef.current = requestAnimationFrame(() => {
                const _ = ref.current?.offsetHeight;

                rafRef.current = requestAnimationFrame(() => {
                    if (ref.current) {
                        setHeight(heightRef.current ?? ref.current.scrollHeight);
                    }
                });
            });

            animationTimeoutRef.current = setTimeout(() => {
                setHeight(undefined);
            }, transitionDuration);
        } else {
            setHeight(heightRef.current ?? node.scrollHeight);

            rafRef.current = requestAnimationFrame(() => {
                const _ = ref.current?.offsetHeight;

                rafRef.current = requestAnimationFrame(() => {
                    setHeight(0);
                });
            });

            animationTimeoutRef.current = setTimeout(() => {
                if (!forceMount) {
                    setIsPresent(false);
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
    }, [open, transitionDuration, forceMount, children]);

    const shouldRender = open || isPresent || forceMount;

    if (!shouldRender) {
        return null;
    }

    const omitInlineHeightForCssAnimation = transitionDuration === 0 && open;

    const dynamicStyle: React.CSSProperties = {
        ...style,
        overflow: 'hidden',
        ...(!omitInlineHeightForCssAnimation && height !== undefined
            ? { height: `${height}px` }
            : {}),
        ['--radix-collapsible-content-height' as string]:
            heightRef.current !== undefined ? `${heightRef.current}px` : undefined,
        ['--radix-collapsible-content-width' as string]:
            widthRef.current !== undefined ? `${widthRef.current}px` : undefined,
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
