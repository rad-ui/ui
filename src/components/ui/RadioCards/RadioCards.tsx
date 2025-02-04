import React from 'react';
import RadioCardsRoot from './fragments/RadioCardsRoot';
import RadioCardsItem from './fragments/RadioCardsItem';

const RadioCards = {
    Root: RadioCardsRoot,
    Item: RadioCardsItem
} as const;

export default RadioCards;
