import React, { useState } from "react";
import { customClassSwitcher } from "~/core";
import { clsx } from "clsx";
import { DisclosureContext } from "../contexts/DisclosureContext";

const COMPONENT_NAME = 'Disclosure';

export type DisclosureRootProps = {
     children: React.ReactNode;
     customRootClass?: string;
     
}

const DisclosureRoot = ({children, customRootClass}:DisclosureRootProps) => {

        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)
        // const [activeItem, setActiveItem] = useState(null)
        
    return(

      //  <DisclosureContext.Provider
      //     value={{
      //       rootClass,
      //       activeItem,
      //       setActiveItem
      //   }}>
         <div className={clsx(`${rootClass}-root`)}>
          {children}
        </div>
      //  </DisclosureContext.Provider>
    )
}

export default DisclosureRoot