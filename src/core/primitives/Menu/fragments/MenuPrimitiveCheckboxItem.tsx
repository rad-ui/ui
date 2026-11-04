import React, { forwardRef } from 'react';
import MenuPrimitiveItem, { MenuPrimitiveItemProps } from './MenuPrimitiveItem';
import { MenuItemIndicatorContext } from '../contexts/MenuItemStateContexts';
import { useControllableState } from '~/core/hooks/useControllableState';
import { stateData } from '~/core/utils/stateAttributes';

export type MenuPrimitiveCheckboxItemProps = MenuPrimitiveItemProps & {
    /** Controlled checked state. */
    checked?: boolean;
    /** Initial checked state when uncontrolled. */
    defaultChecked?: boolean;
    /** Called with the new checked state when the item is toggled. */
    onCheckedChange?: (checked: boolean) => void;
    /** Close the menu after toggling. Defaults to false so several options can be toggled. */
    closeOnClick?: boolean;
};

/** A menu item that toggles on and off, like "Show grid". */
const MenuPrimitiveCheckboxItem = forwardRef<HTMLButtonElement, MenuPrimitiveCheckboxItemProps>(
    ({ checked: checkedProp, defaultChecked = false, onCheckedChange, closeOnClick = false, onSelect, children, ...props }, ref) => {
        const [checked, setChecked] = useControllableState<boolean>(checkedProp, defaultChecked, onCheckedChange);
        const indicatorValue = React.useMemo(() => ({ checked: Boolean(checked) }), [checked]);

        return (
            <MenuItemIndicatorContext.Provider value={indicatorValue}>
                <MenuPrimitiveItem
                    ref={ref}
                    role="menuitemcheckbox"
                    aria-checked={Boolean(checked)}
                    {...stateData(checked ? 'checked' : 'unchecked')}
                    data-checked={checked ? '' : undefined}
                    {...props}
                    onSelect={(event) => {
                        onSelect?.(event);
                        if (event.defaultPrevented) return;
                        setChecked(!checked);
                        if (!closeOnClick) event.preventDefault();
                    }}
                >
                    {children}
                </MenuPrimitiveItem>
            </MenuItemIndicatorContext.Provider>
        );
    }
);

MenuPrimitiveCheckboxItem.displayName = 'MenuPrimitiveCheckboxItem';

export default MenuPrimitiveCheckboxItem;
