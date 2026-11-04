'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';
import { ComboboxPrimitiveContext } from '~/core/primitives/Combobox/contexts/ComboboxPrimitiveContext';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';
import { stateData } from '~/core/utils/stateAttributes';

type AutocompleteInputElement = React.ElementRef<typeof Primitive.input>;
export type AutocompleteInputProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.input>, 'value' | 'defaultValue'>;

/** The text input. Typing opens the suggestions; ArrowDown/ArrowUp move through them and Enter picks one. */
const AutocompleteInput = React.forwardRef<AutocompleteInputElement, AutocompleteInputProps>(({ className, onChange, onKeyDown, onBlur, onClick, disabled: disabledProp, ...props }, forwardedRef) => {
    const { rootClass, autoHighlight = false, openOnInputClick = false, mode = 'list' } = useContext(AutocompleteRootContext);
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

    // With autoHighlight, highlight the first visible suggestion as the text narrows the list
    // ('always': also with no text). Otherwise nothing is highlighted until the arrow keys move.
    React.useEffect(() => {
        if (!isOpen) return;
        if (!autoHighlight || (autoHighlight !== 'always' && !search)) {
            setActiveIndex(null);
            return;
        }
        const unavailable = new Set([...hiddenIndices, ...disabledIndices]);
        const firstAvailable = elementsRef.current.findIndex((element, index) => element != null && !unavailable.has(index));
        setActiveIndex(firstAvailable === -1 ? null : firstAvailable);
    }, [isOpen, search, hiddenIndices, disabledIndices, elementsRef, setActiveIndex, autoHighlight]);

    // `both` / `inline`: the highlighted suggestion previews in the input without changing the text.
    const previewsInline = mode === 'both' || mode === 'inline';
    const highlightedLabel = previewsInline && isOpen && activeIndex !== null
        ? elementsRef.current[activeIndex]?.getAttribute('data-label') || elementsRef.current[activeIndex]?.textContent || null
        : null;
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const pick = (index: number) => handleSelect(index);

    const referenceProps = getReferenceProps({
        ...props,
        value: highlightedLabel ?? search,
        disabled,
        onClick: (event: React.MouseEvent<HTMLInputElement>) => {
            onClick?.(event);
            if (openOnInputClick && !isOpen && !disabled) setIsOpen(true);
        },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(event);
            setSearch(event.target.value);
            if (!isOpen) setIsOpen(true);
        },
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
            onBlur?.(event);
            // Tabbing away closes the suggestions; clicking one keeps them until it's picked.
            const next = event.relatedTarget as Node | null;
            const floating = refs.floating.current as HTMLElement | null;
            if (!next || !floating?.contains(next)) setIsOpen(false);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) return;
            if (event.key === 'Enter' && isOpen && activeIndex !== null) {
                event.preventDefault();
                pick(activeIndex);
            }
        }
    }) as Record<string, unknown>;

    const activeId = virtualItemRef.current?.id || (isOpen && activeIndex !== null ? elementsRef.current[activeIndex]?.id : undefined);

    return (
        <Primitive.input
            type="text"
            autoComplete="off"
            className={clsx(rootClass ? `${rootClass}-input` : undefined, className) || undefined}
            ref={Floater.useMergeRefs([refs.setReference, forwardedRef, inputRef])}
            {...referenceProps}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-activedescendant={activeId}
            {...stateData(isOpen ? 'open' : 'closed')}
            data-disabled={disabled ? '' : undefined}
            data-slot="autocomplete-input"
        />
    );
});

AutocompleteInput.displayName = 'AutocompleteInput';

export default AutocompleteInput;
