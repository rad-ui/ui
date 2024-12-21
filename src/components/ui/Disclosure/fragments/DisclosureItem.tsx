import React, { act, useContext, useEffect, useState } from "react";
import { DisclosureContext } from "../contexts/DisclosureContext";
import { DisclosureItemContext } from "../contexts/DisclosureItemContext";
import { clsx } from "clsx";

export type DisclosureItemProps = {
    children: React.ReactNode;
    className?: string;
    value: number
}
const DisclosureItem = ({children, className='', value }:DisclosureItemProps) => {

    const { activeItem, rootClass } = useContext(DisclosureContext)
    const [itemValue, setItemValue] = useState<number>(value)
    const [isOpen, setIsOpen] = useState(false)

     useEffect(() => {
            setIsOpen(activeItem === itemValue)

        }, [activeItem, itemValue]);

    return(
        <DisclosureItemContext.Provider 
          value={{
            itemValue, 
            setItemValue
            }}>
         <div
         className={clsx(`${rootClass}-item`, className)}
         data-state={isOpen ? 'open' : 'closed'}
         role="region"
         aria-expanded={isOpen}
         >
           {children}
         
         </div>
        </DisclosureItemContext.Provider>
    )
}

export default DisclosureItem