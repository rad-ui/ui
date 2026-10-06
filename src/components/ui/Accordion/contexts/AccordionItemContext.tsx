import { createContext } from 'react';

interface AccordionItemContextType {
    itemValue: string;
    disabled: boolean;
    /** id of the trigger element; content uses it for aria-labelledby. */
    headerId: string;
    /** Lets a trigger with a consumer-supplied `id` keep the content's aria-labelledby in sync. */
    setTriggerIdOverride: (id: string | undefined) => void;
}

export const AccordionItemContext = createContext<AccordionItemContextType>({
    itemValue: '',
    disabled: false,
    headerId: '',
    setTriggerIdOverride: () => {}
});
