'use client';
import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Primitive from '../../Primitive';
import Floater from '../../Floater';

const ComboboxPrimitiveSearch = React.forwardRef<
    React.ElementRef<typeof Primitive.input>,
    { className?: string } & React.ComponentPropsWithoutRef<typeof Primitive.input>
>(({ className, ...props }, forwardedRef) => {
    const [search, setSearch] = React.useState('');
    const context = useContext(ComboboxPrimitiveContext);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Handle missing context gracefully
    if (!context || !context.refs) {
        return (
            <Primitive.input
                // @ts-ignore
                type="search"
                className={className}
                placeholder="Search..."
                value={search}
                // @ts-ignore
                onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
                ref={forwardedRef}
                {...props}
            />
        );
    }

    const { refs, handleSelect, labelsRef, valuesRef, activeIndex, elementsRef, virtualItemRef, getReferenceProps, isTypingRef, setHasSearch } = context;

    const originalStructureRef = React.useRef<
      { element: HTMLElement; label: string; value: string; parent: HTMLElement | null }[]
    >([]);

    // Set hasSearch to true when search component mounts
    React.useEffect(() => {
        setHasSearch(true);
        // Reset navigation state
        if (context) {
            context.setActiveIndex(0);
        }
    }, [setHasSearch]);

    React.useEffect(() => {
        if (!refs.floating.current) return;

        const floatingElement = refs.floating.current;
        const items = Array.from(floatingElement.querySelectorAll('[role="option"]')) as HTMLElement[];

        // Store original structure if not already stored
        if (originalStructureRef.current.length === 0) {
            originalStructureRef.current = items.map(item => ({
                element: item,
                label: item.getAttribute('data-label') || item.textContent?.trim() || '',
                value: item.getAttribute('data-value') || item.id || '',
                parent: item.parentElement
            }));
        }

        // Remove all items from their current positions
        originalStructureRef.current.forEach(({ element }) => {
            if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        });

        // Filter and re-append matching items
        const visible: { element: HTMLElement; label: string; value: string }[] = [];
        originalStructureRef.current.forEach(({ element, label, value, parent }) => {
            if (label.toLowerCase().includes(search.toLowerCase()) && parent) {
                parent.appendChild(element);
                visible.push({ element, label, value });
            }
        });
        context.setActiveIndex(null);
        elementsRef.current = visible.map(item => item.element);
        labelsRef.current = visible.map(item => item.label);
    }, [search, refs.floating.current]);

    // Get the reference props from Floating UI
    const referenceProps = getReferenceProps();

    return (
        <Primitive.input
            // @ts-ignore
            type="search"
            className={className}
            placeholder="Search..."
            ref={Floater.useMergeRefs([inputRef, forwardedRef])}
            value={search}
            aria-activedescendant={virtualItemRef.current?.id || (activeIndex !== null && valuesRef.current[activeIndex] ? valuesRef.current[activeIndex] : undefined)}
            // @ts-ignore
            onChange={(e) => setSearch(e.target.value)}
            {...referenceProps}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (activeIndex !== null) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        handleSelect(activeIndex);
                    }
                }
            }}
            {...props}
        />
    );
});

ComboboxPrimitiveSearch.displayName = 'ComboboxPrimitiveSearch';

export default ComboboxPrimitiveSearch;
