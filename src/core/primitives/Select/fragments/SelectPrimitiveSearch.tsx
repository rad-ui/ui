'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';

function SelectPrimitiveSearch({ className }: {className?: string}) {
    const [search, setSearch] = React.useState('');
    const context = useContext(SelectPrimitiveContext);
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
            />
        );
    }
    
    const { refs, handleSelect, labelsRef, valuesRef, activeIndex, elementsRef, updateRefs, virtualItemRef, getReferenceProps, isTypingRef, setHasSearch } = context;
    

    const originalStructureRef = React.useRef<{ element: HTMLElement; parent: HTMLElement | null }[]>([]);

    // Set hasSearch to true when search component mounts
    React.useEffect(() => {
        setHasSearch(true);
        return () => setHasSearch(false);
    }, [setHasSearch]);

    // Initialize refs when component mounts
    React.useEffect(() => {
        if (refs.floating.current) {
            updateRefs();
        }
    }, [refs.floating.current, updateRefs]);

    // Debug virtual focus
    React.useEffect(() => {
        console.log('Virtual focus debug:', {
            activeIndex,
            virtualItemRef: virtualItemRef.current?.id,
            ariaActivedescendant: virtualItemRef.current?.id || (activeIndex !== null ? `select-item-${activeIndex}` : undefined)
        });
    }, [activeIndex, virtualItemRef.current]);

    // Ensure input maintains focus during virtual navigation
    React.useEffect(() => {
        if (activeIndex !== null && inputRef.current && document.activeElement !== inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeIndex]);

    React.useEffect(() => {
        if (!refs.floating.current) return;

        const floatingElement = refs.floating.current;
        const items = Array.from(floatingElement.querySelectorAll('[role="option"]')) as HTMLElement[];
        // Store original structure if not already stored
        if (originalStructureRef.current.length === 0) {
            originalStructureRef.current = items.map(item => ({
                element: item,
                parent: item.parentElement
            }));
        }

        // First, remove all items from their current positions
        originalStructureRef.current.forEach(({ element }) => {
            if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        });

        // Then, re-append only matching items to their original parents
        originalStructureRef.current.forEach(({ element, parent }) => {
            const text = element.textContent?.toLowerCase() || '';
            const shouldShow = text.includes(search.toLowerCase());

            if (shouldShow && parent) {
                parent.appendChild(element);
            }
        });

        // Update the refs with the current visible elements
        updateRefs();
    }, [search, refs.floating.current, updateRefs]);

    // Handle when search is cleared to restore original refs
    React.useEffect(() => {
        if (search === '' && refs.floating.current) {
            updateRefs();
        }
    }, [search, refs.floating.current, updateRefs]);



    // Get the reference props from Floating UI
    const referenceProps = getReferenceProps();
    
    return (
        <Primitive.input
            // @ts-ignore
            type="search"
            className={className}
            placeholder="Search..."
            ref={inputRef}
            value={search}
            aria-activedescendant={virtualItemRef.current?.id || (activeIndex !== null && valuesRef.current[activeIndex] ? valuesRef.current[activeIndex] : undefined)}
            // @ts-ignore
            onChange={(e) => setSearch(e.target.value)}
            {...referenceProps}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                // Call the original onKeyDown if it exists
                if (referenceProps.onKeyDown) {
                    referenceProps.onKeyDown(event);
                }
                
                // Then handle our custom selection logic
                if (activeIndex !== null) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        console.log('Enter key pressed, selecting item at index:', activeIndex);
                        handleSelect(activeIndex);
                    }
                    
                    if (event.key === ' ' && !isTypingRef.current) {
                        event.preventDefault();
                        console.log('Space key pressed, selecting item at index:', activeIndex);
                        handleSelect(activeIndex);
                    }
                }
            }}
        />
    );
}

export default SelectPrimitiveSearch;
