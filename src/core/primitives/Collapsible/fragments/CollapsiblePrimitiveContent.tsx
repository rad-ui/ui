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
        const animationTimeoutRef = useRef<NodeJS.Timeout>();

        useEffect(() => {
            // Clear any existing timeout to avoid conflicts
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }

            if (!ref.current) return;

            if (open) {
                // Opening - Set to specific height first
                const contentHeight = ref.current.scrollHeight;
                setHeight(contentHeight);

                // After animation completes, set height to undefined for responsive flexibility
                animationTimeoutRef.current = setTimeout(() => {
                    setHeight(undefined);
                }, transitionDuration); // Use the transition duration from context
            } else {
                // Closing - First set to current height
                setHeight(ref.current.scrollHeight);

                // Use RAF to ensure browser processes the height setting
                requestAnimationFrame(() => {
                    // Force a reflow
                    const _ = ref.current?.offsetHeight;

                    // Then animate to 0 in the next frame
                    requestAnimationFrame(() => {
                        setHeight(0);
                    });
                });
            }

            return () => {
                if (animationTimeoutRef.current) {
                    clearTimeout(animationTimeoutRef.current);
                }
            };
        }, [open, transitionDuration]);

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
                    transition: `height ${transitionDuration}ms ${transitionTimingFunction}`
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
