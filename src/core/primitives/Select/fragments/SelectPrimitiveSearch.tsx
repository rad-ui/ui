'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';
import Floater from '../../Floater';

type SelectPrimitiveSearchProps = React.ComponentPropsWithoutRef<typeof Primitive.input>;

const SelectPrimitiveSearch = React.forwardRef<React.ElementRef<typeof Primitive.input>, SelectPrimitiveSearchProps>(
    ({ className, ...props }, ref) => {
        const [search, setSearch] = React.useState('');
        const context = useContext(SelectPrimitiveContext);
        const inputRef = React.useRef<HTMLInputElement>(null);
        const mergedRef = Floater.useMergeRefs([inputRef, ref]);

        const originalStructureRef = React.useRef<
            { element: HTMLElement; label: string; value: string; parent: HTMLElement | null }[]
        >([]);

        React.useEffect(() => {
            if (!context) return;
            const { setHasSearch, setActiveIndex } = context;
            setHasSearch(true);
            setActiveIndex(0);
        }, [context]);

        React.useEffect(() => {
            if (!context || !context.refs.floating.current) return;
            const { refs, labelsRef, elementsRef } = context;
            const floatingElement = refs.floating.current;
            const items = Array.from(floatingElement.querySelectorAll('[role="option"]')) as HTMLElement[];

            if (originalStructureRef.current.length === 0) {
                originalStructureRef.current = items.map(item => ({
                    element: item,
                    label: item.getAttribute('data-label') || item.textContent?.trim() || '',
                    value: item.getAttribute('data-value') || item.id || '',
                    parent: item.parentElement
                }));
            }

            originalStructureRef.current.forEach(({ element }) => {
                if (element.parentElement) {
                    element.parentElement.removeChild(element);
                }
            });

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
        }, [search, context]);

        const referenceProps = context ? context.getReferenceProps() : {};
        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (!context) return;
            const { activeIndex, handleSelect } = context;
            if (activeIndex !== null && event.key === 'Enter') {
                event.preventDefault();
                handleSelect(activeIndex);
            }
        };

        return (
            <Primitive.input
                // @ts-ignore
                type="search"
                className={className}
                placeholder="Search..."
                ref={mergedRef}
                value={search}
                aria-activedescendant={
                    context?.virtualItemRef.current?.id ||
                    (context?.activeIndex !== null && context?.valuesRef.current[context.activeIndex]
                        ? context.valuesRef.current[context.activeIndex]
                        : undefined)
                }
                // @ts-ignore
                onChange={(e) => setSearch(e.target.value)}
                {...referenceProps}
                onKeyDown={handleKeyDown}
                {...props}
            />
        );
    }
);

SelectPrimitiveSearch.displayName = 'SelectPrimitiveSearch';

export default SelectPrimitiveSearch;
