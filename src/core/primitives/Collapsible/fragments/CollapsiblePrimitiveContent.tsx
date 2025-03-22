import React, { useState, useRef, useEffect } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { useCollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';

export type CollapsiblePrimitiveContentProps = {
  /**
   * Content to be rendered inside the collapsible content
   */
  children?: React.ReactNode;
  /**
   * CSS class name for custom styling
   */
  className?: string;
  /**
   * For Polymorphic component support
   */
  asChild?: boolean;
  /**
   * Additional props to be spread on the content element
   */
  [key: string]: any;
};

const CollapsiblePrimitiveContent = React.forwardRef<HTMLDivElement, CollapsiblePrimitiveContentProps>(
    ({
        children,
        className,
        asChild = false,
        ...props
    }, forwardedRef) => {
        const {
            open,
            contentId,
            transitionDuration,
            transitionTimingFunction
        } = useCollapsiblePrimitiveContext();

        const ref = useRef<HTMLDivElement>(null);
        const combinedRef = (forwardedRef || ref) as React.RefObject<HTMLDivElement>;
        const [height, setHeight] = useState<number | undefined>(open ? undefined : 0);
        const [shouldRender, setShouldRender] = useState(open);
        const animationTimeoutRef = useRef<NodeJS.Timeout>();
        const rafRef = useRef<number>();

        // When opening, we need to immediately render
        useEffect(() => {
            if (open) {
                setShouldRender(true);
            }
        }, [open]);

        useEffect(() => {
            // Clear any existing timeout and animation frames to avoid conflicts
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            if (!ref.current) return;

            // Handle the case when transitionDuration is 0 - no animation
            if (transitionDuration === 0) {
                setHeight(open ? undefined : 0);

                // For instant changes, also update visibility immediately
                if (!open) {
                    setTimeout(() => setShouldRender(false), 0);
                }
                return;
            }

            if (open) {
                // Opening animation
                // First set height to 0 to ensure proper animation start state
                setHeight(0);

                // Use RAF to ensure the DOM has updated with the new height
                rafRef.current = requestAnimationFrame(() => {
                    // Force a reflow
                    const _ = ref.current?.offsetHeight;

                    // Now measure and start animation in the next frame
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
                // Closing animation
                // First set to current height to ensure smooth start
                const contentHeight = ref.current.scrollHeight;
                setHeight(contentHeight);

                // Use RAF to ensure browser processes the height setting
                rafRef.current = requestAnimationFrame(() => {
                    // Force a reflow
                    const _ = ref.current?.offsetHeight;

                    // Then animate to 0 in the next frame
                    rafRef.current = requestAnimationFrame(() => {
                        setHeight(0);
                    });
                });

                // After animation completes, we can hide the element completely
                animationTimeoutRef.current = setTimeout(() => {
                    setShouldRender(false);
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
        }, [open, transitionDuration]);

        // Don't render anything if closed and animation is complete
        if (!shouldRender && !open) {
            return null;
        }

        return (
            <Primitive.div
                id={contentId}
                ref={combinedRef}
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
                {...props}
            >
                {children}
            </Primitive.div>
        );
    }
);

CollapsiblePrimitiveContent.displayName = 'CollapsiblePrimitiveContent';

export default CollapsiblePrimitiveContent;
