'use client'
import React, { useContext } from 'react';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';


function SelectPrimitiveSearch() {
    const [search, setSearch] = React.useState('');
    const { refs, selectedItemRef } = useContext(SelectPrimitiveContext);

    React.useEffect(() => {
        if (!refs.floating.current) return;

        const floatingElement = refs.floating.current;
        const items = floatingElement.querySelectorAll('[role="button"]');
        
        items.forEach((item: HTMLElement) => {
            const text = item.textContent?.toLowerCase() || '';
            const shouldShow = text.includes(search.toLowerCase());
            item.style.display = shouldShow ? '' : 'none';
        });
    }, [search, refs.floating.current]);
    
    return (
        <input 
            type="search" 
            placeholder="Search..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}

export default SelectPrimitiveSearch;