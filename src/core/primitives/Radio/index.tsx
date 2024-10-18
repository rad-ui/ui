import React from "react";

const RadioPrimitive = ({role='radio', label='', id, checked, children, ...props}:any) => {
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
           <input type="radio" role={role} id={id} {...props} checked={!checked}/>
           <label htmlFor={id}> {children}</label>
          
       </div>
       )     
}

export default RadioPrimitive