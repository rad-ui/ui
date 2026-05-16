import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Badge/badge.clarity.scss');

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
        code: scss_SourceCode
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
        {prop: 'size', type: 'string', default: 'null', description: 'Size of the component', id: 'size'},
        {prop: 'variant', type: 'string', default: 'null', description: 'Variant of the component', id: 'variant'},

    ]
}
export default code;
