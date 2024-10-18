import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren, useState} from 'react';
import { customClassSwitcher} from "~/core";
import RadioPrimitive from '~/core/primitives/Radio';
const COMPONENT_NAME = 'RadioGroup';


type Option = {
  id: string;
  value: string;
  label: string
}
export type RadioGroupProps = {
  
    children?: React.ReactNode;
    className: string;
    customRootClass: string;   
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & PropsWithChildren

const RadioGroup =({children,type='radio', options = [
     {id: 'html', value: 'html', label:'HTML'},
     {id: 'css', value: 'css', label:'CSS'},
     {id: 'javascript', value: 'javascript', label:'JavaScript'},],
     className='',customRootClass='', ...props}:RadioGroupProps & {options?: Option[]}) => {
    const rootClass= customClassSwitcher(customRootClass,COMPONENT_NAME)
    const [language, setLanguage] = useState({})

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
          setLanguage(e.target.value)
    }
    return (
      <div className={`${rootClass} ${className}`} role='radiogroup'>
        {options.map((option) => (
      <RadioPrimitive 
         key={option.id}
         type={type} 
         id={option.id}
         name='language'
         value={option.value}
         checked={language === option.value}
         onChange={handleChange}
         {...props}>

         {children}
       <span id={option.id} >{option.label}</span>
      </RadioPrimitive>
      
     ))}
      </div>
    )
}
      
export default RadioGroup;