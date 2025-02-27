const code = {
    javascript: {
        code: `import Tooltip from "@radui/ui/Tooltip"

const ToolTipExample = () => (
    <Tooltip content="Tooltip content">
        Hello Tooltip. Hover Me!
    </Tooltip>
)`
    },
    css: {
        code: `todo`
    },
}

export const TooltipTable = {
    columns: [
     {name: 'Prop', id: 'prop'},
     {name: 'Type', id: 'type'},
     {name: 'Default', id: 'default'},
     {name: 'Description', id: 'description'},
    ],
    data: [
     {prop: 'content', type: 'string', default: 'Tooltip content', description: 'content/text on hover', id: 'src'},
    ]
 }
export default code;