const code = {
    javascript: {
        code: `import VisuallyHidden from "@radui/ui/VisuallyHidden""

const VisuallyHiddenExample = () => (
    <VisuallyHidden asChild style={{display: "none"}}>
            <span>This is a visually hidden text</span>
    </VisuallyHidden>
)`
    }
}

export const VisuallyHiddenTable = {
    columns: [
       {name: 'Prop', id: 'prop'},
       {name: 'Type', id: 'type'},
       {name: 'Default', id: 'default'},
       {name: 'Description', id: 'description'},
   ],
   data : [
       {prop: 'asChild', type: 'boolean', default: 'false', description: 'renders the children in desired element', id: 'asChild'},

   ]
}

export default code;

