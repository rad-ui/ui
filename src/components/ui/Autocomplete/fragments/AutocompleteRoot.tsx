'use client';
import clsx from 'clsx';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { useControllableState } from '~/core/hooks/useControllableState';
import { AutocompleteMode, AutocompleteRootContext } from '../contexts/AutocompleteRootContext';

const COMPONENT_NAME = 'Autocomplete';

type AutocompleteRootElement = React.ElementRef<typeof ComboboxPrimitive.Root>;
export type AutocompleteRootProps = Omit<
    React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root>,
    'value' | 'defaultValue' | 'onValueChange' | 'multiple' | 'inputValue' | 'defaultInputValue' | 'onInputValueChange'
> & {
    /** Controlled input text. */
    value?: string;
    /** Initial input text when uncontrolled. */
    defaultValue?: string;
    /** Called with the input text as the user types or picks a suggestion. */
    onValueChange?: (value: string) => void;
    customRootClass?: string;
    /**
     * Highlight the first suggestion as you type, so Enter picks it. `'always'` also highlights
     * it when the list opens with no text. Defaults to false: Enter keeps what you typed.
     */
    autoHighlight?: boolean | 'always';
    /** Open the suggestions when the input is clicked. Defaults to false. */
    openOnInputClick?: boolean;
    /** Submit the input's form when a suggestion is picked. Defaults to false. */
    submitOnItemClick?: boolean;
    /**
     * - `list` (default): suggestions are filtered by the text.
     * - `both`: filtered, and the highlighted suggestion previews in the input.
     * - `inline`: not filtered; the highlighted suggestion previews in the input.
     * - `none`: not filtered and no preview, for lists you filter yourself.
     */
    mode?: AutocompleteMode;
};

/**
 * A text input with a list of suggestions. Unlike Combobox, the value is
 * whatever the user types; picking a suggestion fills it in.
 */
const AutocompleteRoot = React.forwardRef<AutocompleteRootElement, AutocompleteRootProps>(
    ({ customRootClass, children, className, value, defaultValue = '', onValueChange, sideOffset = 4, autoHighlight = false, openOnInputClick = false, submitOnItemClick = false, mode = 'list', filter, ...props }, forwardedRef) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const [text, setText] = useControllableState<string>(value, defaultValue, onValueChange);
        const rootRef = React.useRef<HTMLDivElement | null>(null);
        const mergedRef = React.useCallback((node: HTMLDivElement | null) => {
            rootRef.current = node;
            if (typeof forwardedRef === 'function') forwardedRef(node);
            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }, [forwardedRef]);

        return (
            <AutocompleteRootContext.Provider value={{ rootClass, autoHighlight, openOnInputClick, submitOnItemClick, mode }}>
                <ComboboxPrimitive.Root
                    className={clsx(rootClass ? `${rootClass}-root` : undefined, className) || undefined}
                    data-slot="autocomplete-root"
                    // Suggestions fill the text instead of becoming a selected value.
                    value=""
                    onValueChange={(picked: string) => {
                        setText(picked);
                        if (submitOnItemClick) {
                            // After the picked text renders, so the form submits it.
                            setTimeout(() => rootRef.current?.querySelector('input')?.form?.requestSubmit(), 0);
                        }
                    }}
                    inputValue={text}
                    onInputValueChange={setText}
                    sideOffset={sideOffset}
                    matchReferenceWidth
                    filter={mode === 'inline' || mode === 'none' ? null : filter}
                    ref={mergedRef}
                    {...props}
                >
                    {children}
                </ComboboxPrimitive.Root>
            </AutocompleteRootContext.Provider>
        );
    }
);

AutocompleteRoot.displayName = 'AutocompleteRoot';

export default AutocompleteRoot;
