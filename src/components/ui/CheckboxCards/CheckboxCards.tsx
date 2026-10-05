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

export type { CheckboxCardsRootProps } from './fragments/CheckboxCardsRoot';
export type { CheckboxCardsContentProps } from './fragments/CheckboxCardsContent';
export type { CheckboxCardsItemProps } from './fragments/CheckboxCardsItem';
export type { CheckboxCardsIndicatorProps } from './fragments/CheckboxCardsIndicator';
// Named part exports let React Server Components use `import * as CheckboxCards from '@radui/ui/CheckboxCards'`;
// property access on the default export is undefined across the client boundary.
export {
    CheckboxCardsRoot as Root,
    CheckboxCardsContent as Content,
    CheckboxCardsItem as Item,
    CheckboxCardsIndicator as Indicator
};

export default CheckboxCards;
