import React from 'react';

interface SelectRootContextType {
   rootClass: string;
   /** Id of the trigger, so `Select.Label` can point at it. */
   triggerId?: string;
   /** Id of `Select.Label`, when one is rendered. */
   labelId?: string;
   setHasLabel?: (hasLabel: boolean) => void;
   hasLabel?: boolean;
   /** Inside Field.Root: report trigger focus and blur to the field. */
   onFieldFocus?: () => void;
   onFieldBlur?: () => void;
   /** Inside Field.Root: the field's data-* state, for the trigger. */
   fieldStateAttributes?: Record<string, string> | null;
}

export const SelectRootContext = React.createContext<SelectRootContextType>({
    rootClass: ''
});
