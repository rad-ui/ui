import React from 'react';

interface SelectRootContextType {
   rootClass: string;
   /** Id of the trigger, so `Select.Label` can point at it. */
   triggerId?: string;
   /** Id of `Select.Label`, when one is rendered. */
   labelId?: string;
   setHasLabel?: (hasLabel: boolean) => void;
   hasLabel?: boolean;
}

export const SelectRootContext = React.createContext<SelectRootContextType>({
    rootClass: ''
});
