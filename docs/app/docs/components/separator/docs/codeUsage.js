// Import API documentation
import separator_api_SourceCode from './component_api/separator.tsx';

const code = {
    javascript: {
        code: `import Separator from "@radui/ui/Separator"
import Text from "@radui/ui/Text"

const SeparatorExample = () => (
    <div>
        <div>
            <Text>Welcome to Rad UI</Text>
        </div>
        <Separator />
        <div style={{ display:"flex", alignItems: "center" }}>
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

// API documentation
export const api_documentation = {
    separator: separator_api_SourceCode
};

// Component features
export const features = [
    "Support for both horizontal and vertical orientation",
    "Customizable with different color themes",
    "Helps establish visual hierarchy in layouts",
    "Simple integration with minimal props required",
    "Lightweight implementation with proper spacing"
];

// Kept for backwards compatibility
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