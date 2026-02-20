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

export default ToggleGroup;
