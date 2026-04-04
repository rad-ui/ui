import { createContext } from 'react';

export type CardContextType = {
    rootClass: string;
};

export const CardContext = createContext<CardContextType>({
    rootClass: 'rad-ui-card'
});

export default CardContext;
