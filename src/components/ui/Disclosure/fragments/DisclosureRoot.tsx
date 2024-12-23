import React, { useState, useRef } from "react";
import { customClassSwitcher } from "~/core";
import { clsx } from "clsx";
import { DisclosureContext } from "../contexts/DisclosureContext";
import { getAllBatchElements, getNextBatchItem, getPrevBatchItem } from "~/core/batches";

const COMPONENT_NAME = 'Disclosure';

export type DisclosureRootProps = {
     children: React.ReactNode;
     customRootClass?: string;
     defaultOpen?: number | null;
     'aria-label'?: string;
     
}

const DisclosureRoot = ({ children, customRootClass, 'aria-label': ariaLabel }:DisclosureRootProps) => {

        const disclosureRef = useRef(null)
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

        const [activeItem, setActiveItem] = useState<number | null>(null);
        const [focusItem, setFocusItem] = useState(null);

        const focusNextItem = () => {
            const batches = getAllBatchElements(disclosureRef?.current)
            const nextItem = getNextBatchItem(batches)
            setFocusItem(nextItem)

            if (nextItem){
               const button = nextItem.querySelector('button')
               button?.focus()
            }             
        }
       
        const focusPrevItem = () => {
            const batches = getAllBatchElements(disclosureRef?.current)
            const prevItem = getPrevBatchItem(batches)
            setFocusItem(prevItem)
          
            if (prevItem){
               const button = prevItem.querySelector('button')
               button?.focus()
          }             
      }

    return(

         <DisclosureContext.Provider 
         value={{
          rootClass,
          activeItem,
          setActiveItem,
          disclosureRef,
          focusNextItem,
          focusPrevItem,
          focusItem,
          setFocusItem

          }}>

           <div 
             className={clsx(`${rootClass}-root`)}
             ref={disclosureRef}
             role="region"
             aria-label={ariaLabel}
            >

             {children}
           </div>
        </DisclosureContext.Provider>
    )
}

export default DisclosureRoot