import React, { useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { RovingFocusGroupContext } from '~/core/utils/RovingFocusGroup/context/RovingFocusGroupContext';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';
import ButtonPrimitive from '~/core/primitives/Button';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';

export type RadioGroupPrimitiveItemElement = React.ElementRef<typeof ButtonPrimitive>;

export type RadioGroupPrimitiveItemProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
    value: string;
};

const RadioGroupPrimitiveItem = React.forwardRef<RadioGroupPrimitiveItemElement, RadioGroupPrimitiveItemProps>(
    ({ value, children, disabled, required: _required, className = '', asChild = false, onClick, onFocus, onKeyDown, ...props }, ref) => {
        const context = useContext(RadioGroupContext);
        if (!context) {
            throw new Error('RadioGroup.Item must be used within a RadioGroup.Root');
        }
        const { groupDisabled, selectedValue, setSelectedValue, isNavigatingWithKeyboardRef } = context;
        const { setFocusedItemId } = useContext(RovingFocusGroupContext);
        const rovingId = React.useId();

        const itemSelected = value === selectedValue;
        const isDisabled = Boolean(groupDisabled || disabled);

        // The checked radio is the group's tab stop (WAI-ARIA radio group pattern).
        React.useEffect(() => {
            if (itemSelected && !isDisabled) {
                setFocusedItemId(rovingId);
            }
        }, [itemSelected, isDisabled, rovingId, setFocusedItemId]);

        const select = () => {
            if (isDisabled) return;
            setSelectedValue(value);
        };

        return (

            <RadioGroupPrimitiveItemContext.Provider value={{ itemSelected }}>
                <RovingFocusGroup.Item domId={rovingId}>
                    <ButtonPrimitive
                        ref={ref}
                        role="radio"
                        type="button"
                        disabled={isDisabled}
                        onClick={composeEventHandlers(onClick, select)}
                        onFocus={composeEventHandlers(onFocus, () => {
                            // Arrow-key navigation moves focus and selection together; Tab and
                            // pointer focus only move focus.
                            if (isNavigatingWithKeyboardRef?.current) select();
                        })}
                        onKeyDown={composeEventHandlers(onKeyDown, (event: React.KeyboardEvent) => {
                            // Radios are checked with Space, not Enter.
                            if (event.key === KEYBOARD_KEYS.ENTER) event.preventDefault();
                        })}
                        aria-disabled={isDisabled}
                        aria-checked={itemSelected}
                        aria-selected={undefined}
                        data-state={itemSelected ? 'checked' : 'unchecked'}
                        data-disabled={isDisabled ? '' : undefined}
                        asChild={asChild}
                        className={className}
                        {...props}
                    >
                        {children}
                    </ButtonPrimitive>
                </RovingFocusGroup.Item>
            </RadioGroupPrimitiveItemContext.Provider>

        );
    }
);

RadioGroupPrimitiveItem.displayName = 'RadioGroupPrimitiveItem';

export default RadioGroupPrimitiveItem;
