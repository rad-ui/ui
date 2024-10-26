import React from "react";

const RadioPrimitive = ({role='radio', label='', id, value, defaultValue, onValueChanged, checked, children, ...props}:any) => {
      const ariaProps = {
         'aria-label': label || undefined,
         'aria-checked': checked ? 'true' : 'false',
      }

       return (
       <div>
        
          
          <input type='radio' id={id} {...ariaProps} {...props} value={value} checked={defaultValue} onValueChanged={onValueChanged} />
             <button type="button" role={role}>
           </button>
           <label htmlFor={id}> {children}</label>
          
       </div>
       )     
}

export default RadioPrimitive