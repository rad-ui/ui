'use client';
import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Primitive from '../../Primitive';
import Floater from '../../Floater';

const ComboboxPrimitiveSearch = React.forwardRef<
    React.ElementRef<typeof Primitive.input>,
    { className?: string } & React.ComponentPropsWithoutRef<typeof Primitive.input>
>(({ className, ...props }, forwardedRef) => {
    const context = useContext(ComboboxPrimitiveContext);
    const { 
        refs, 
        handleSelect, 
        labelsRef, 
        valuesRef, 
        activeIndex, 
        elementsRef, 
        virtualItemRef, 
        getReferenceProps, 
        setHasSearch,
        search,
        setSearch,
        setActiveIndex
    } = context;
    
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Set hasSearch to true when search component mounts
    React.useEffect(() => {
        setHasSearch(true);
        // Reset navigation state
        setActiveIndex(0);
        
        return () => {
            setHasSearch(false);
            setSearch('');
        };
    }, [setHasSearch, setActiveIndex, setSearch]);

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
