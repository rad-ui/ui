const code = {
    javascript: {
        code: `import Separator from "@radui/ui/Separator"

const SeparatorExample = () => (
    <div>
        <div>
            <Text>Welcome to Rad UI</Text>
        </div>
        <Separator />
        <div style={{ height: "20px", display:"flex" }}>
            <Text>Modern</Text>
            <Separator orientation="vertical" />
            <Text>Accessible</Text>
            <Separator orientation="vertical" />
            <Text>Performant</Text>
        </div>
    </div>
)`
    },
    scss: {
        code: `/** Separator */
.rad-ui-separator {
    background-color: var(--rad-ui-color-gray-600);
    align-self: stretch;
}

.rad-ui-separator-vertical{
    margin: 0px 8px;
    width: 1px;
}

.rad-ui-separator-horizontal{
    margin: 8px 0px;
    height: 1px;
}`
    },
}


export const SeparatorTable = {
    columns: [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],

    data: [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the separator', id: 'color'},
        {prop: 'orientation', type: 'horizontal | vertical', default: 'horizontal', description: 'orientation of the separator', id: 'orientation'},
    ]
};

export default code;