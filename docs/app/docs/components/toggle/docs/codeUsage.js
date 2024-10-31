const code = {
    javascript: {
        code: `import Toggle from '@radui/ui/Toggle'"

const ToggleExample = ()=>{
    const [pressed, setPressed] = React.useState(false)

    const handleChange = (newPressed)=>{
        setPressed(newPressed)
    }
    return <Toggle defaultPressed={false} onChange={handleChange} >
            <Icon/>
        </Toggle>
}`
    },
    css: {
        code: `.rad-ui-toggle {
    box-shadow: 0 2px 10px var(--rad-ui-color-gray-700);
    color: var(--rad-ui-color-gray-1000);
    background-color: var(--rad-ui-color-accent-50);
    height: 35px;
    width: 35px;
    border-radius: 4px;
    display: flex;
    font-size: 15px;
    line-height: 1;
    align-items: center;
    justify-content: center;
    border: 0 none;

    outline: none;

    &[data-state=on]{
        background-color: var(--rad-ui-color-accent-500);

    }

    &:focus {
        box-shadow: 0 0 0 2px var(--rad-ui-color-accent-1000);
    }
}   
`
    },
}

export default code;