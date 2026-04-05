const code = {
    javascript: {
        code: `import Button from "@radui/ui/Button"
import VisuallyHidden from "@radui/ui/VisuallyHidden"

const VisuallyHiddenExample = () => (
    <Button>
        <VisuallyHidden>Search documentation</VisuallyHidden>
        <span aria-hidden="true">⌕</span>
    </Button>
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
