const code = {
    javascript: {
        code: `
import Progress from "@radui/ui/Progress";

const ProgressExample = () => (
  <div style={{ width: "90%" }}>
    <Progress value={90}  />
  </div>
)
`
    },
    css: {
        code: `.rad-ui-progress {
    background:  var(--rad-ui-color-sand-600);
    overflow: hidden;
    height:32px;
    border-radius: 8px;
}

.rad-ui-progress-indicator {
    background: var(--rad-ui-color-accent-900);
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
}`
    }
};


export const ProgressTable = {
    columns: [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],

    data: [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the progress bar', id: 'color'},
        { prop: 'value', type: 'number', default: '0', description: 'Current value of the progress bar.', id: 'value' },
        { prop: 'maxValue', type: 'number', default: '100', description: 'Maximum value of the progress bar.', id: 'maxValue' },
        { prop: 'minValue', type: 'number', default: '0', description: 'Minimum value of the progress bar.', id: 'minValue' },
    ]
};
export default code;
