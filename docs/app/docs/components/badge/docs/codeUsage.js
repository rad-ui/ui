const code = {
    javascript: {
        code: `import Badge from "@radui/ui/Badge"

const BadgeExample = () => (
    <div>
        <Badge>Badge</Badge>
    </div>
)`
    },
    scss: {
        code: `/** Badge */
.rad-ui-badge {
    background-color: var(--rad-ui-color-accent-300);
    color: var(--rad-ui-color-accent-950);
    padding:4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 4px;
}`
    },
}

export const BadgeTable ={
     columns: [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],

     data : [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent color of the component', id: 'color'},
        {prop: 'size', type: 'string', default: 'null', description: 'Size of the component: small, medium, large, x-large', id: 'size'},
        {prop: 'variant', type: 'string', default: 'null', description: 'Variant of the component: solid, soft, outline, ghost', id: 'variant'},

    ]
}
export default code;