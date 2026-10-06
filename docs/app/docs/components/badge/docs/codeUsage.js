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
        {prop: 'color', type: 'string', default: '—', description: 'Accent color scale, e.g. "green". Without it the badge uses the neutral gray scale.', id: 'color'},
        {prop: 'size', type: "'small' | 'medium' | 'large' | 'x-large'", default: "'medium'", description: 'Height, padding and font size.', id: 'size'},
        {prop: 'variant', type: "'soft' | 'solid' | 'surface' | 'outline' | 'ghost'", default: "'soft'", description: 'Visual treatment. Soft is a translucent tint with vivid text.', id: 'variant'},

    ]
}
export default code;
