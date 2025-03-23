import React from 'react';
import RadioCardsRoot from './fragments/RadioCardsRoot';
import RadioCardsItem from './fragments/RadioCardsItem';

// Empty props type - only supporting fragment exports for now
export type RadioCardsProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Empty implementation - we don't support direct usage
const RadioCards = () => {
    console.warn('Direct usage of RadioCards is not supported. Please use RadioCards.Root and RadioCards.Item instead.');
    return null;
};

// Export fragments via direct assignment pattern
RadioCards.Root = RadioCardsRoot;
RadioCards.Item = RadioCardsItem;

export default RadioCards;
