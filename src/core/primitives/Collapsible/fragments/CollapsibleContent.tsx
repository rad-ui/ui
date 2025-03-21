import React, { useState, useRef, useEffect } from 'react';
import Primitive from '~/core/primitives/Primitive';

export interface CollapsibleContentProps {
  /**
   * Content to be rendered inside the collapsible content
   */
  children?: React.ReactNode;
  /**
   * CSS class name for custom styling
   */
  className?: string;
  /**
   * Whether the content is open
   */
  open?: boolean;
  /**
   * For Polymorphic component support
   */
  asChild?: boolean;
  /**
   * Duration of the height transition animation in milliseconds
   */
  transitionDuration?: number;
  /**
   * CSS timing function for the transition
   */
  transitionTimingFunction?: string;
  /**
   * Additional props to be spread on the content element
   */
  [key: string]: any;
}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
    ({
        children,
        open,
        className,
        asChild = false,
        transitionDuration = 300,
        transitionTimingFunction = 'ease-out',
        ...props
    }, forwardedRef) => {
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
                }, transitionDuration); // Use the custom transition duration
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

CollapsibleContent.displayName = 'CollapsibleContent';

export default CollapsibleContent;
