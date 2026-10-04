'use client';
import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Primitive from '../../Primitive';
import Floater from '../../Floater';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { markAsComboboxSearchPart } from '../contexts/ComboboxSearchPart';

const ComboboxPrimitiveSearch = React.forwardRef<
    React.ElementRef<typeof Primitive.input>,
    { className?: string } & React.ComponentPropsWithoutRef<typeof Primitive.input>
>(({ className, ...props }, forwardedRef) => {
    const context = useContext(ComboboxPrimitiveContext);
    const {
        refs,
        handleSelect,
        activeIndex,
        elementsRef,
        virtualItemRef,
        getReferenceProps,
        setHasSearch,
        search,
        setSearch,
        setActiveIndex,
        hiddenIndices,
        disabledIndices
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

    // Keep the highlight on the first visible, enabled option as the query narrows the list,
    // so Enter always acts on something the user can see.
    const isFirstRender = React.useRef(true);
    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const unavailable = new Set([...hiddenIndices, ...disabledIndices]);
        const firstAvailable = elementsRef.current.findIndex((element, index) => element != null && !unavailable.has(index));
        setActiveIndex(firstAvailable === -1 ? null : firstAvailable);
    }, [search, hiddenIndices, disabledIndices, elementsRef, setActiveIndex]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (activeIndex !== null && event.key === KEYBOARD_KEYS.ENTER) {
            event.preventDefault();
            handleSelect(activeIndex);
        }
        props.onKeyDown?.(event);
    };

    const { onKeyDown: referenceKeyDown, onKeyUp: referenceKeyUp, ...referenceProps } = getReferenceProps({
        ...props,
        value: search,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        onKeyDown: handleKeyDown
    }) as Record<string, any>;

    // The trigger's click interaction treats Space/Enter as "toggle the popup". Inside a text
    // field those keys are text entry and option selection, so they bypass it.
    const isTextEntryKey = (key: string) => key === KEYBOARD_KEYS.SPACE || key === KEYBOARD_KEYS.ENTER;

    return (
        <Primitive.input
            // @ts-ignore
            type="search"
            className={className}
            placeholder="Search..."
            ref={Floater.useMergeRefs([inputRef, forwardedRef])}
            aria-activedescendant={virtualItemRef.current?.id || (activeIndex !== null ? elementsRef.current[activeIndex]?.id : undefined)}
            {...referenceProps}
            aria-autocomplete="list"
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (isTextEntryKey(event.key)) {
                    handleKeyDown(event);
                    return;
                }
                referenceKeyDown?.(event);
            }}
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (isTextEntryKey(event.key)) {
                    props.onKeyUp?.(event);
                    return;
                }
                referenceKeyUp?.(event);
            }}
        />
    );
});

ComboboxPrimitiveSearch.displayName = 'ComboboxPrimitiveSearch';
markAsComboboxSearchPart(ComboboxPrimitiveSearch);

export default ComboboxPrimitiveSearch;
