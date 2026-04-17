// Import API documentation
import button_api_SourceCode from './component_api/button.tsx';
import { ArrowRight } from 'lucide-react';

const code = {
    javascript: {
        code: `import Button from "@radui/ui/Button"

const ButtonExample = () => (
    <div>
        <Button color="green">Click Me!</Button>
    </div>
)`
    },
    scss: {
        code: `.rad-ui-button{
    height: 32px;
    border-radius: 4px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0px 12px;
}
.button-solid{
    background-color: var(--rad-ui-color-accent-900);
    color: white;
}
.button-solid:hover{
    background-color: var(--rad-ui-color-accent-950);
}

/** Soft */
.button-soft{
    color: var(--rad-ui-color-accent-900);
    background-color:  var(--rad-ui-color-accent-400);
}
.button-soft:hover{
    background-color:  var(--rad-ui-color-accent-500);
}


/**Outline */
.button-outline{
    background-color: transparent;
    color: var(--rad-ui-color-accent-900);
    border: 1px solid var(--rad-ui-color-accent-900);
}
.button-outline:hover{
    border-color:var(--rad-ui-color-accent-950) ;
}

/**Ghost */
.button-ghost{
    background-color: transparent;
    color: var(--rad-ui-color-accent-900);
}
.button-ghost:hover{
    border-color:var(--rad-ui-color-accent-950) ;
    background-color: var(--rad-ui-color-accent-300);
}`
    },
}

export const Arrow = () => {
    return <ArrowRight size={15} strokeWidth={2} />;
};

// API documentation
export const api_documentation = {
    button: button_api_SourceCode
};

// Component features
export const features = [
    "Multiple style variants: solid, soft, outline, ghost",
    "Different size options for various contexts",
    "Customizable with different color themes",
    "Support for icons and text content",
    "Follows accessibility best practices",
    "Can be used as buttons, links, or form submitters"
];

export default code;
