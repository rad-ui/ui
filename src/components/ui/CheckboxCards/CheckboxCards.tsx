'use client';

import CheckboxCardsRoot from './fragments/CheckboxCardsRoot';
import CheckboxCardsItem from './fragments/CheckboxCardsItem';
import CheckboxCardsContent from './fragments/CheckboxCardsContent';
import CheckboxCardsIndicator from './fragments/CheckboxCardsIndicator';

const CheckboxCards = () => {
    console.warn('Direct usage of CheckboxCards is not supported. Please use CheckboxCards.Root, CheckboxCards.Item instead.');
    return null;
};

CheckboxCards.Root = CheckboxCardsRoot;
CheckboxCards.Content = CheckboxCardsContent;
CheckboxCards.Item = CheckboxCardsItem;
CheckboxCards.Indicator = CheckboxCardsIndicator;

export default CheckboxCards;
