'use client';
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';

function SelectPrimitiveSearch({ className }: {className: string}) {
    const [search, setSearch] = React.useState('');
    const { refs, handleSelect, activeItemValue, setActiveItemValue, setSelectedValue } = useContext(SelectPrimitiveContext);

    const originalStructureRef = React.useRef<{ element: HTMLElement; parent: HTMLElement | null }[]>([]);

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
    }, [search, refs.floating.current]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (activeItemValue) {
                handleSelect(activeItemValue);
            }
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            setSelectedValue('');
            if (!refs.floating.current) return;

            const floatingElement = refs.floating.current;
            const items = Array.from(floatingElement.querySelectorAll('[role="option"]')) as HTMLElement[];
            e.preventDefault();
            console.log('arrow input taken');

            if (items.length === 0) return;

            let currentIndex = -1;
            if (activeItemValue) {
                currentIndex = items.findIndex(item =>
                    item.getAttribute('data-value') === activeItemValue
                );
            }

            let newIndex: number;
            if (e.key === 'ArrowDown') {
                newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            } else {
                newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            }

            const newActiveItem = items[newIndex];
            const newActiveValue = newActiveItem.getAttribute('data-value') || '';
            setActiveItemValue(newActiveValue);
        }
    };

    console.log('activeItemValue', activeItemValue);
    return (
        <Primitive.input
            // @ts-ignore
            type="search"
            className={className}
            placeholder="Search..."
            tabIndex={-1}
            value={search}
            aria-activedescendant={activeItemValue}
            // @ts-ignore
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
}

export default SelectPrimitiveSearch;
