import React, { useContext } from "react"
import clsx from "clsx";
import { DisclosureContext } from "../contexts/DisclosureContext";
import { DisclosureItemContext } from "../contexts/DisclosureItemContext";

export type DisclosureTriggerProps = {
    children: React.ReactNode;
    className?: string;
    index?: number;
    
}

const DisclosureTrigger = ({children, className, index}:DisclosureTriggerProps) => {
       
         const {activeItem, setActiveItem, rootClass} = useContext(DisclosureContext)
         const {itemValue} = useContext(DisclosureItemContext)

         const handleDisclosure = () => {
              if(activeItem === itemValue){
                 setActiveItem(null)
              }
              else if(activeItem !== itemValue){
                setActiveItem(itemValue)
              }
                }
                
   return(
     <div>
       <button
        type='button'
        className={clsx(`${rootClass}-trigger`, className)}
        onClick={handleDisclosure}
        aria-expanded={activeItem === itemValue}
        aria-controls={`content-${index}`}
        >
         {children} 
       </button>
           
              </div>
   )
}

export default DisclosureTrigger