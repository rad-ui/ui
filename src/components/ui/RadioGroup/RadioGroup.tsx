import React, { useState } from 'react';
import { customClassSwitcher} from "~/core";
const COMPONENT_NAME = 'RadioGroup';

export type RadioGroupProps = {
    children?: React.ReactNode;
    className?: string;
    customRootClass?: string;   
}

const RadioGroup =({children,className='',customRootClass=''}:RadioGroupProps) => {
    const rootClass= customClassSwitcher(customRootClass,COMPONENT_NAME)
    
    const [language, setLanguage] = useState('html');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
             setLanguage(event.target.value);
    }
    return (
     <div className={`${rootClass} ${className}`} onChange={handleChange}>
         <div className='radioItem'>   
           <input type='radio' id='html' name='language' value='html' checked ={language === 'html'}/>
           <label htmlFor='html'>HTML</label>
         </div> 
         <div className='radioItem' >   
           <input type='radio' id='css' name='language' value='css' checked ={language === 'css'} />
           <label htmlFor='css'>CSS</label>
         </div> 
         <div className='radioItem' >   
           <input type='radio' id='javascript' name='language' value='javascript' checked={language === 'javascript'} />
           <label htmlFor='javascript' >JavaScript</label>
         </div> 
      </div>
    )
}
      
export default RadioGroup;