'use client';
import React, { useEffect, useRef, useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

function SelectContent({ customRootClass, children, position = 'popper', ...props }: any) {
    const { rootClass } = useContext(SelectRootContext);

    return (
        <SelectPrimitive.Content
            className={`${rootClass}-content`}
            position={position}
            data-position={position}

            {...props}
        >
            {children}
        </SelectPrimitive.Content>
    );
}

export default SelectContent;
