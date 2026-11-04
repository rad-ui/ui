'use client';
import clsx from 'clsx';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { useControllableState } from '~/core/hooks/useControllableState';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';

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
};

/**
 * A text input with a list of suggestions. Unlike Combobox, the value is
 * whatever the user types; picking a suggestion fills it in.
 */
const AutocompleteRoot = React.forwardRef<AutocompleteRootElement, AutocompleteRootProps>(
    ({ customRootClass, children, className, value, defaultValue = '', onValueChange, sideOffset = 4, ...props }, forwardedRef) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const [text, setText] = useControllableState<string>(value, defaultValue, onValueChange);

        return (
            <AutocompleteRootContext.Provider value={{ rootClass }}>
                <ComboboxPrimitive.Root
                    className={clsx(rootClass ? `${rootClass}-root` : undefined, className) || undefined}
                    data-slot="autocomplete-root"
                    // Suggestions fill the text instead of becoming a selected value.
                    value=""
                    onValueChange={(picked: string) => setText(picked)}
                    inputValue={text}
                    onInputValueChange={setText}
                    sideOffset={sideOffset}
                    matchReferenceWidth
                    ref={forwardedRef}
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
