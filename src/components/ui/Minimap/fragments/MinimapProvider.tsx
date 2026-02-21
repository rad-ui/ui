'use client';
import React from 'react';
import MinimapProviderContext from '../context/MinimapProviderContext';

type MinimapProviderProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    scrollable?: boolean;
};

const MinimapProvider = ({ children, className = '', scrollable, ...props }: MinimapProviderProps) => {
    const [visibleItems, setVisibleItems] = React.useState<string[]>([]);
    const itemRefs = React.useRef<Map<string, HTMLElement>>(new Map());
    const containerRef = React.useRef<HTMLDivElement>(null);

    const registerRef = React.useCallback((value: string, element: HTMLElement | null) => {
        if (element) {
            itemRefs.current.set(value, element);
        } else {
            itemRefs.current.delete(value);
        }
    }, []);

    const handleInView = React.useCallback((value: string | null) => {
        setVisibleItems((prev) => {
            if (value === null || prev.includes(value)) {
                return prev;
            }
            // Add the item and sort to maintain order
            const newItems = [...prev, value];
            return newItems.sort((a, b) => {
                // Sort by the order they appear in the DOM
                const elementA = itemRefs.current.get(a);
                const elementB = itemRefs.current.get(b);
                if (!elementA || !elementB) return 0;

                // Compare positions to maintain document order
                const position = elementA.compareDocumentPosition(elementB);
                return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
            });
        });
    }, []);

    const handleOutView = React.useCallback((value: string | null) => {
        setVisibleItems((prev) => {
            if (value === null || !prev.includes(value)) {
                return prev;
            }
            return prev.filter((item) => item !== value);
        });
    }, []);

    const scrollToItem = React.useCallback((value: string) => {
        const element = itemRefs.current.get(value);
        if (!element) return;

        // Use the provider's container only if scrollable is true and containerRef exists
        let container: HTMLElement | null = null;

        if (scrollable && containerRef.current) {
            container = containerRef.current;
        } else {
            // Find the nearest scrollable container automatically
            const findScrollContainer = (node: HTMLElement | null): HTMLElement | null => {
                if (!node || node === document.body) return null;

                const style = window.getComputedStyle(node);
                const isScrollable = style.overflow === 'auto' ||
                                   style.overflow === 'scroll' ||
                                   style.overflowY === 'auto' ||
                                   style.overflowY === 'scroll';

                if (isScrollable && node.scrollHeight > node.clientHeight) {
                    return node;
                }

                return findScrollContainer(node.parentElement);
            };

            container = findScrollContainer(element.parentElement);
        }

        if (container) {
            // Get the element's absolute position within the scrollable content
            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Calculate the element's offset from the top of the scrollable content
            const elementOffsetTop = elementRect.top - containerRect.top + container.scrollTop;

            // Align the top of the element with the top of the container
            const targetScrollTop = elementOffsetTop;

            // Ensure we don't scroll beyond bounds
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            const finalScrollTop = Math.max(0, Math.min(targetScrollTop, maxScrollTop));

            // Only scroll if there's a meaningful difference
            if (Math.abs(finalScrollTop - container.scrollTop) > 1) {
                container.scrollTo({
                    top: finalScrollTop,
                    behavior: 'smooth'
                });
            }
        }
        // If no container found, do nothing (don't scroll the window)
    }, []);

    const contextValue = React.useMemo(() => ({
        visibleItems,
        handleInView,
        handleOutView,
        scrollToItem,
        registerRef
    }), [visibleItems, handleInView, handleOutView, scrollToItem, registerRef]);

    return (
        <MinimapProviderContext.Provider value={contextValue}>
            <div
                ref={containerRef}
                className={`${className}`}
                {...props}
            >
                {children}
            </div>
        </MinimapProviderContext.Provider>
    );
};

export default MinimapProvider;
