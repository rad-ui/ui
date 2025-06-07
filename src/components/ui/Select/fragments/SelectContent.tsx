'use client';
import React, { useEffect, useRef, useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

function SelectContent({ customRootClass, children, position = 'popper', ...props }: any) {
    const { rootClass} = useContext(SelectRootContext);
    const contentRef = React.useRef<HTMLDivElement>(null);

    // useEffect(() => {

    //     if (!contentRef.current) return;
    //     const height = contentRef.current?.clientHeight/contentRef.current?.children.length;
    //     for (let i = 0; i < contentRef.current?.children.length; i++) {
    //         if (contentRef.current?.children[i].getAttribute('aria-selected') === 'true') {
    //             console.log(i);
    //             setSelectedId((i+1)*height);
    //         }
    //     }
    // },[selectedId])
    
    return (
        <SelectPrimitive.Content
            className={`${rootClass}-content`}
            position={position}
            data-position={position}

            {...props}
        >
            {/* <div ref={contentRef}> */}
            {children}
            {/* </div> */}
        </SelectPrimitive.Content>
    );
}

export default SelectContent;
