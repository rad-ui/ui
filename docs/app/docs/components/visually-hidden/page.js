const PAGE_NAME = 'VISUALLY_HIDDEN_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import VisuallyHidden from "@radui/ui/VisuallyHidden"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const VisuallyHiddenDocs = () => {

    const columns = [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ];

    const data = [
        {prop: 'asChild', type: 'boolean', default: 'false', description: 'renders the children in desired element', id: 'asChild'},
       
    ];


    return <div>
        <Documentation currentPage={PAGE_NAME} title='Visually Hidden' description={`Use these helpers to visually hide elements but keep them accessible to assistive technologies.`}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div>
                <VisuallyHidden asChild style={{display: "none"}}>
                    <span>This is a visually hidden text</span>
                </VisuallyHidden>
                </div>
            </Documentation.ComponentHero>
            
            
            <div >
                <Documentation.Table columns={columns} data={data} />
            </div>
        </Documentation>
    </div>
}

export default VisuallyHiddenDocs;