import React, { useContext } from "react"
import clsx from "clsx";
import { DisclosureContext } from "../contexts/DisclosureContext";
import { DisclosureItemContext } from "../contexts/DisclosureItemContext";

export type DisclosureTriggerProps = {
    children: React.ReactNode;
    className?: string;
    index: number; 
}

const DisclosureTrigger = ({ children, className, index }:DisclosureTriggerProps) => {
       
         const {activeItem, setActiveItem, rootClass} = useContext(DisclosureContext)
         const {itemValue} = useContext(DisclosureItemContext)

         const handleDisclosure = () => {
              
                setActiveItem(activeItem === itemValue ? null : itemValue)
                }
                
   return(
     
       <button
        type='button'
        className={clsx(`${rootClass}-trigger`, className)}
        onClick={handleDisclosure}
        aria-expanded={activeItem === itemValue}
        aria-controls={`content-${index}`}
        aria-haspopup='true'
        >

         {children} 
       </button>
           
   )
}

export default DisclosureTrigger