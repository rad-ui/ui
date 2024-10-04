import React, {PropsWithChildren, useContext} from 'react';
import DropdownContext from '../context/DropdownContext';
import ButtonPrimitive, {ButtonPrimitiveProps} from '~/core/primitives/Button';

type DropdownTriggerProps = ButtonPrimitiveProps & PropsWithChildren

export const Trigger = ({children, ...buttomProps}:DropdownTriggerProps) => {
    const ctx = useContext(DropdownContext);

    if (ctx === null) throw new Error('Component can only be used within a dropdown');

    const {visible, toggleVisibility, triggerRef} = ctx;

    return (
        <ButtonPrimitive role='button' aria-expanded={visible} buttonRef={triggerRef} onClick={toggleVisibility} {...buttomProps}>{children || 'Toggle'}</ButtonPrimitive>
    );
};
