import React, {PropsWithChildren, useContext} from 'react';
import DropdownContext from '../context/DropdownContext';
import ButtonPrimitive, {ButtonPrimitiveProps} from '~/core/primitives/Button';

export type DropdownTriggerProps = ButtonPrimitiveProps & (PropsWithChildren | {content: string})

export default function Trigger({children, content, ...buttonProps}:DropdownTriggerProps) {
    const ctx = useContext(DropdownContext);

    if (ctx === null) throw new Error('Component can only be used within a dropdown');

    const {visible, toggleVisibility, triggerRef} = ctx;

    return (
        <ButtonPrimitive role='button' aria-label="dropdown menu toggle" aria-haspopup="true" aria-expanded={visible} buttonRef={triggerRef} onClick={toggleVisibility} {...buttonProps}>{children || content || 'Toggle'}</ButtonPrimitive>
    );
}
