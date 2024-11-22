import { createContext } from "react";

interface TogglePrimitiveContextType {
    isPressed: boolean | undefined;
    handlePressed: () => void;

}
export const TogglePrimitiveContext = createContext<TogglePrimitiveContextType>({} as TogglePrimitiveContextType)