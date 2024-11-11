import React, { useState } from "react";
import { customClassSwitcher } from "~/core/customClassSwitcher";
import {TogglePrimitiveContext} from "../contexts/TogglePrimitiveContext";

export interface TogglePrimitiveRootProps {
    defaultPressed? : boolean | false;
    pressed: boolean;
    customRootClass?: string;
    children?: React.ReactNode;
    className?: string;
    onChange : (isPressed:boolean) => void;

}
const TogglePrimitiveRoot = ({children,customRootClass='',className='',defaultPressed,pressed,onChange,...props}:TogglePrimitiveRootProps) => {
   const rootClass = customClassSwitcher(customRootClass,'Toggle');
   const [isPressed, setIsPressed] = useState(pressed || defaultPressed);

   const handlePressed = () => {
     const updatedPressed = !isPressed;
     setIsPressed(updatedPressed);
     onChange(updatedPressed)
     }
 
   const values = {
    rootClass,
    handlePressed,
    isPressed,
    setIsPressed
};

  return <TogglePrimitiveContext.Provider value={values}>
    <span className={`${rootClass} ${className}`} {...props}>{children}</span>
  </TogglePrimitiveContext.Provider>;
};

export default TogglePrimitiveRoot;