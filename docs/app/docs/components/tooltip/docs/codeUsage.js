import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tooltip/docs/examples/tooltip_example1.tsx');

const code = {
    javascript: {
        code: example_1_SourceCode
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
     {prop: 'content', type: 'string', default: 'null', description: 'content/text on hover', id: 'src'},
    ]
 }
export default code;
