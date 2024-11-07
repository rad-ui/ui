import { customClassSwitcher } from "~/core/customClassSwitcher";
import TogglePrimitiveContext from "../contexts/TogglePrimitiveContext";

export interface TogglePrimitiveRootProps {
    customRootClass: string;
    children: React.ReactNode;
    className: string;

}
const TogglePrimitiveRoot = ({children,customRootClass='',className='',...props}:TogglePrimitiveRootProps) => {
   const rootClass = customClassSwitcher(customRootClass,'Toggle')
 
}

export default TogglePrimitiveRoot;