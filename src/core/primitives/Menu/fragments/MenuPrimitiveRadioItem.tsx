import React, { forwardRef } from 'react';
import MenuPrimitiveItem, { MenuPrimitiveItemProps } from './MenuPrimitiveItem';
import { MenuItemIndicatorContext, MenuRadioGroupContext } from '../contexts/MenuItemStateContexts';
import { stateData } from '~/core/utils/stateAttributes';

export type MenuPrimitiveRadioItemProps = MenuPrimitiveItemProps & {
    /** The value this item selects in its RadioGroup. */
    value: string;
    /** Close the menu after selecting. Defaults to false. */
    closeOnClick?: boolean;
};

/** One choice in a menu RadioGroup. */
const MenuPrimitiveRadioItem = forwardRef<HTMLButtonElement, MenuPrimitiveRadioItemProps>(
    ({ value, closeOnClick = false, onSelect, disabled, children, ...props }, ref) => {
        const group = React.useContext(MenuRadioGroupContext);
        if (!group) {
            console.warn('Menu RadioItem must be rendered inside a RadioGroup.');
        }
        const checked = group?.value === value;
        const indicatorValue = React.useMemo(() => ({ checked }), [checked]);
        const isDisabled = disabled || group?.disabled;

        return (
            <MenuItemIndicatorContext.Provider value={indicatorValue}>
                <MenuPrimitiveItem
                    ref={ref}
                    role="menuitemradio"
                    aria-checked={checked}
                    {...stateData(checked ? 'checked' : 'unchecked')}
                    data-checked={checked ? '' : undefined}
                    disabled={isDisabled}
                    {...props}
                    onSelect={(event) => {
                        onSelect?.(event);
                        if (event.defaultPrevented) return;
                        group?.setValue(value);
                        if (!closeOnClick) event.preventDefault();
                    }}
                >
                    {children}
                </MenuPrimitiveItem>
            </MenuItemIndicatorContext.Provider>
        );
    }
);

MenuPrimitiveRadioItem.displayName = 'MenuPrimitiveRadioItem';

export default MenuPrimitiveRadioItem;
