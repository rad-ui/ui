'use client';

import CheckboxCardsRoot from './fragments/CheckboxCardsRoot';
import CheckboxCardsTrigger from './fragments/CheckboxCardsTrigger';
import CheckboxCardsItem from './fragments/CheckboxCardsItem';
import CheckboxCardsLabel from './fragments/CheckboxCardsLabel';
import CheckboxCardsIndicator from './fragments/CheckboxCardsIndicator';

const CheckboxCards = () => {
    console.warn('Direct usage of CheckboxCards is not supported. Please use CheckboxCards.Root, CheckboxCards.Item instead.');
    return null;
};

CheckboxCards.Root = CheckboxCardsRoot;
CheckboxCards.Item = CheckboxCardsItem;
CheckboxCards.Trigger = CheckboxCardsTrigger;
CheckboxCards.Label = CheckboxCardsLabel;
CheckboxCards.Indicator = CheckboxCardsIndicator;

export default CheckboxCards;
