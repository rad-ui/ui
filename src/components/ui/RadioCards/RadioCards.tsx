import React, {
    forwardRef,
    ElementRef,
    ComponentPropsWithoutRef,
    ForwardRefExoticComponent,
    RefAttributes
} from 'react';
import RadioCardsRoot from './fragments/RadioCardsRoot';
import RadioCardsItem from './fragments/RadioCardsItem';

export type RadioCardsElement = ElementRef<'div'>;
export type RadioCardsProps = ComponentPropsWithoutRef<'div'>;

interface RadioCardsComponent
    extends ForwardRefExoticComponent<RadioCardsProps & RefAttributes<RadioCardsElement>> {
    Root: typeof RadioCardsRoot;
    Item: typeof RadioCardsItem;
}

const RadioCards = forwardRef<RadioCardsElement, RadioCardsProps>((_props, _ref) => {
    console.warn('Direct usage of RadioCards is not supported. Please use RadioCards.Root and RadioCards.Item instead.');
    return null;
}) as RadioCardsComponent;

RadioCards.displayName = 'RadioCards';

RadioCards.Root = RadioCardsRoot;
RadioCards.Item = RadioCardsItem;

export type { RadioCardsRootProps } from './fragments/RadioCardsRoot';
export type { RadioCardsItemProps } from './fragments/RadioCardsItem';
// Named part exports let React Server Components use `import * as RadioCards from '@radui/ui/RadioCards'`;
// property access on the default export is undefined across the client boundary.
export {
    RadioCardsRoot as Root,
    RadioCardsItem as Item
};

export default RadioCards;
