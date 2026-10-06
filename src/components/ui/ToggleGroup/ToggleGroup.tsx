import React from 'react';
import ToggleGroupRoot from './fragments/ToggleGroupRoot';
import ToggleItem from './fragments/ToggleItem';

type ToggleGroupElement = React.ElementRef<'div'>;
type ToggleGroupProps = React.ComponentPropsWithoutRef<'div'>;

type ToggleGroupComponent = React.ForwardRefExoticComponent<
    ToggleGroupProps & React.RefAttributes<ToggleGroupElement>
> & {
    Root: typeof ToggleGroupRoot;
    Item: typeof ToggleItem;
};

const ToggleGroup = React.forwardRef<ToggleGroupElement, ToggleGroupProps>((_props, _ref) => {
    console.warn(
        'Direct usage of ToggleGroup is not supported. Please use ToggleGroup.Root, ToggleGroup.Item, etc. instead.'
    );
    return null;
}) as ToggleGroupComponent;

ToggleGroup.displayName = 'ToggleGroup';

ToggleGroup.Root = ToggleGroupRoot;
ToggleGroup.Item = ToggleItem;

export type { ToggleGroupRootProps } from './fragments/ToggleGroupRoot';
export type { ToggleItemProps } from './fragments/ToggleItem';
// Named part exports let React Server Components use `import * as ToggleGroup from '@radui/ui/ToggleGroup'`;
// property access on the default export is undefined across the client boundary.
export {
    ToggleGroupRoot as Root,
    ToggleItem as Item
};

export default ToggleGroup;
