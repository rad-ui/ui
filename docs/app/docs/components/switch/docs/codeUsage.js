const code = {
    javascript: {
        code: `
import Switch from "@radui/ui/Switch";
         
const SwitchExample = () => (
    <div>
      <Switch />   
    </div>
)`
    },
    scss: {
        code: `/** Switch */
.rad-ui-Switch {
    opacity: 0;  
    position: absolute;   
    + button{
        position: relative;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        color: var(--rad-ui-color-accent-500);
        &::before{
            content: ""; 
            width: 2rem;
            height: 1.05rem;
            background-color: var(--rad-ui-color-accent-500);
            border-radius: 1rem;
            margin-right: .25rem;
            transition: 200ms ease-in-out;
          }
        &::after{
            position: absolute;
            left: .1rem;
            content: ""; 
            width: .9rem;
            height: .9rem;
            background-color: var(--rad-ui-color-accent-50);
            border-radius: 1rem;
            transition: 200ms ease-in-out;
          }
          
    } 
    &:checked{
        + button::before{
            background-color: var(--rad-ui-color-accent-900);
        }   
        + button::after{
            transform: translateX(100%);
            background-color: var(--rad-ui-color-accent-50);
            
        }
        + button {
            color: var(--rad-ui-color-accent-900);
        }
        
    }
}`
    }
};

export default code;
