const code = {
    javascript: {
        code: `import Code from "@radui/ui/Code"

const CodeExample = () => (
    <div>
        <Code>console.log('This is some code')</Code>
    </div>
)`
    },
    css: {
        code: `.rui-code-root{
    color: var(--rad-ui-color-accent-950);
    background-color: var(--rad-ui-color-accent-400);
    padding: 1px 10px; // Add space for readability
    display: inline-block;
    border-radius: 4px;
    font-size:12px;
}`
    },
}

export const CodeTable = {
    columns : [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],
    data : [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the code', id: 'color'},
    ]
}

export default code;