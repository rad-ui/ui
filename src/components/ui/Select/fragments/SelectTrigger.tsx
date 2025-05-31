import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';

import { SelectRootContext } from '../contexts/SelectRootContext';

function SelectTrigger({ customRootClass, children, disabled, placeholder, ...props }: any) {
    const { rootClass } = useContext(SelectRootContext);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    console.log(triggerRef);
    return (
        <SelectPrimitive.Trigger
            className={`${rootClass}-trigger`}
            aria-disabled={disabled ? 'true' : undefined}
            data-placeholder={placeholder ? '' : undefined}
            ref={triggerRef}
            {...props}
        >

            {children}

        </SelectPrimitive.Trigger>
    );
}

export default SelectTrigger;
