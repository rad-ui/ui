'use client'
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import Primitive from '../../Primitive';

function SelectPrimitiveSearch() {
    const [search, setSearch] = React.useState('');
    const { refs, selectedItemRef } = useContext(SelectPrimitiveContext);
    
    const originalStructureRef = React.useRef<{ element: HTMLElement; parent: HTMLElement | null }[]>([]);

    React.useEffect(() => {
        if (!refs.floating.current) return;

        const floatingElement = refs.floating.current;
        const items = Array.from(floatingElement.querySelectorAll('[role="list-item"]')) as HTMLElement[];
        
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

    return (
        <Primitive.input
            // @ts-ignore 
            type="search" 
            placeholder="Search..." 
            tabIndex={-1}
            value={search} 
            // @ts-ignore
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}

export default SelectPrimitiveSearch;