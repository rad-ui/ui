// Import API documentation
import button_api_SourceCode from './api/button.tsx';

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
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
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