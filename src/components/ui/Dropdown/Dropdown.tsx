import React, {PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import {UseFloatingReturn, useFloating} from '@floating-ui/react';

/* https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 * CHECKLIST
 *
 * Add aria-control
 * */

export type DropdownProps ={
    trigger?: (ref: UseFloatingReturn['refs']['setReference'])=>ReactElement
    open?: boolean
    defaultOpen?: boolean
} & PropsWithChildren

const Dropdown = ({children, open, trigger, defaultOpen = false}: DropdownProps) => {
    const [visible, setVisible] = useState(defaultOpen);

    useEffect(() => {
        open !== undefined && setVisible(open);
    }, [open]);

    const {refs, floatingStyles}= useFloating({placement: 'bottom-start'});

    return <div>

        {trigger ?
            trigger(refs.setReference) :
            <ButtonPrimitive role='button' aria-expanded={open} buttonRef={refs.setReference} onClick={() => setVisible((p) => !p)}>show/hide</ButtonPrimitive>
        }

        <div style={{overflow: 'hidden', ...floatingStyles}} ref={refs.setFloating}>
            {visible && children}
        </div>

    </div>;
};

export default Dropdown;
