import React, { act, useContext, useEffect, useState } from "react";
import { DisclosureContext } from "../contexts/DisclosureContext";
import { DisclosureItemContext } from "../contexts/DisclosureItemContext";
import { clsx } from "clsx";

export type DisclosureItemProps = {
    children: React.ReactNode;
    className?: string;
    value?: number
}
const DisclosureItem = ({children, className='', value }:DisclosureItemProps) => {

    const {activeItem, rootClass} = useContext(DisclosureContext)
    const [itemValue, setItemValue] = useState(value)
    const [isOpen, setIsOpen] = useState(false)

     useEffect(() => {
            if (activeItem === itemValue) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }, [activeItem]);

    return(
        <DisclosureItemContext.Provider 
          value={{
            itemValue, 
            setItemValue
            }}>
         <div
         className={clsx(`${rootClass}-item`, className)}
         data-state={isOpen ? 'open' : 'closed'}
         >
           {children}
         
         </div>
        </DisclosureItemContext.Provider>
    )
}

export default DisclosureItem