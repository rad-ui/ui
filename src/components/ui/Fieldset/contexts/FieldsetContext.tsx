'use client';

import React from 'react';

export type FieldsetContextValue = {
    rootClass: string;
    invalid: boolean;
    /** Registers an element id that describes the fieldset; returns an unregister fn. */
    registerDescription?: (id: string) => () => void;
};

const FieldsetContext = React.createContext<FieldsetContextValue>({ rootClass: '', invalid: false });

export const useFieldsetDescription = (id: string) => {
    const { registerDescription } = React.useContext(FieldsetContext);
    React.useEffect(() => {
        if (!registerDescription || !id) return undefined;
        return registerDescription(id);
    }, [registerDescription, id]);
};

export default FieldsetContext;
