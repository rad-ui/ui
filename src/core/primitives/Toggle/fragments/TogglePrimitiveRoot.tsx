import React, { useState } from "react";

export interface TogglePrimitiveRootProps {
    defaultPressed? : boolean | false;
    pressed: boolean;
    children?: React.ReactNode;
    className?: string;
    onChange : (isPressed:boolean) => void;

}
const TogglePrimitiveRoot = ({children,className='',defaultPressed,pressed,onChange,...props}:TogglePrimitiveRootProps) => {
      const [isPressed, setIsPressed] = useState(pressed || defaultPressed);

   const handlePressed = () => {
     const updatedPressed = !isPressed;
     setIsPressed(updatedPressed);
     onChange(updatedPressed)
     }

  return <span className={className}{...props}>{children}</span>
  
};

export default TogglePrimitiveRoot;