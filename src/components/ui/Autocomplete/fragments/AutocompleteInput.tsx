'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';
import { ComboboxPrimitiveContext } from '~/core/primitives/Combobox/contexts/ComboboxPrimitiveContext';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';

type AutocompleteInputElement = React.ElementRef<typeof Primitive.input>;
export type AutocompleteInputProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.input>, 'value' | 'defaultValue'>;

/** The text input. Typing opens the suggestions; ArrowDown/ArrowUp move through them and Enter picks one. */
const AutocompleteInput = React.forwardRef<AutocompleteInputElement, AutocompleteInputProps>(({ className, onChange, onKeyDown, disabled: disabledProp, ...props }, forwardedRef) => {
    const { rootClass } = useContext(AutocompleteRootContext);
    const {
        refs,
        isOpen,
        setIsOpen,
        handleSelect,
        activeIndex,
        setActiveIndex,
        elementsRef,
        virtualItemRef,
        getReferenceProps,
        setHasSearch,
        setReferenceIsInput,
        search,
        setSearch,
        hiddenIndices,
        disabledIndices,
        disabled: rootDisabled
    } = useContext(ComboboxPrimitiveContext);
    const disabled = Boolean(disabledProp || rootDisabled);

    // Virtual focus: the input keeps focus and points at the active option.
    React.useEffect(() => {
        setHasSearch(true);
        setReferenceIsInput(true);
        return () => {
            setHasSearch(false);
            setReferenceIsInput(false);
        };
    }, [setHasSearch, setReferenceIsInput]);

    // Highlight the first visible suggestion as the text narrows the list.
    React.useEffect(() => {
        if (!isOpen) return;
        const unavailable = new Set([...hiddenIndices, ...disabledIndices]);
        const firstAvailable = elementsRef.current.findIndex((element, index) => element != null && !unavailable.has(index));
        setActiveIndex(firstAvailable === -1 ? null : firstAvailable);
    }, [isOpen, search, hiddenIndices, disabledIndices, elementsRef, setActiveIndex]);

    const referenceProps = getReferenceProps({
        ...props,
        value: search,
        disabled,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(event);
            setSearch(event.target.value);
            if (!isOpen) setIsOpen(true);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) return;
            if (event.key === 'Enter' && isOpen && activeIndex !== null) {
                event.preventDefault();
                handleSelect(activeIndex);
            }
        }
    }) as Record<string, unknown>;

    const activeId = virtualItemRef.current?.id || (isOpen && activeIndex !== null ? elementsRef.current[activeIndex]?.id : undefined);

    return (
        <Primitive.input
            type="text"
            autoComplete="off"
            className={clsx(rootClass ? `${rootClass}-input` : undefined, className) || undefined}
            ref={Floater.useMergeRefs([refs.setReference, forwardedRef])}
            {...referenceProps}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-activedescendant={activeId}
            data-state={isOpen ? 'open' : 'closed'}
            data-disabled={disabled ? '' : undefined}
            data-slot="autocomplete-input"
        />
    );
});

AutocompleteInput.displayName = 'AutocompleteInput';

export default AutocompleteInput;
