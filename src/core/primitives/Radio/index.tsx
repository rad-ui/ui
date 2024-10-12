import React from "react";

const RadioPrimitive = ({role='radio', label='', id, value, defaultValue, onValueChanged, checked, children, ...props}:any) => {
       if(label){

        props['aria-label'] = label     
       }

       if(checked){
         props['aria-checked'] = 'true'
       }
       else {
          props['aria-checked'] = 'false'
       }

       return (
       <div>
        
          
          <input type='radio' id={id} {...props} value={value} checked={defaultValue} onValueChanged={onValueChanged} />
             <button type="button" role={role}>
           </button>
           <label htmlFor={id}> {children}</label>
          
       </div>
       )     
}

export default RadioPrimitive