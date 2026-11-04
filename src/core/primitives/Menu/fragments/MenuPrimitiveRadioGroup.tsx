import React, { forwardRef } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { useControllableState } from '~/core/hooks/useControllableState';
import { MenuRadioGroupContext } from '../contexts/MenuItemStateContexts';

export type MenuPrimitiveRadioGroupProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.div>, 'defaultValue'> & {
    /** Controlled selected value. */
    value?: string;
    /** Initial selected value when uncontrolled. */
    defaultValue?: string;
    /** Called with the newly selected value. */
    onValueChange?: (value: string) => void;
    /** Disable every radio item in the group. */
    disabled?: boolean;
};

/** Groups radio items so exactly one is checked, like a "Sort by" choice. */
const MenuPrimitiveRadioGroup = forwardRef<HTMLDivElement, MenuPrimitiveRadioGroupProps>(
    ({ value: valueProp, defaultValue = '', onValueChange, disabled = false, children, ...props }, ref) => {
        const [value, setValue] = useControllableState<string>(valueProp, defaultValue, onValueChange);
        const contextValue = React.useMemo(() => ({ value: value ?? '', setValue, disabled }), [value, setValue, disabled]);

        return (
            <MenuRadioGroupContext.Provider value={contextValue}>
                <Primitive.div ref={ref} role="group" data-disabled={disabled ? '' : undefined} {...props}>
                    {children}
                </Primitive.div>
            </MenuRadioGroupContext.Provider>
        );
    }
);

MenuPrimitiveRadioGroup.displayName = 'MenuPrimitiveRadioGroup';

export default MenuPrimitiveRadioGroup;
