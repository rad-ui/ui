const PAGE_NAME = 'ACCORDION_DOCS'

import Documentation from "@/components/layout/Documentation/Documentation"
import Accordion from "@radui/ui/Accordion"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)
import AccordionExample from "./docs/example_1"
import AccordionAnatomy from "./docs/accordion_anatomy"
import {code, anatomy, keyboardShortcuts} from "./docs/codeUsage"

const AccordionDocs = () => {
    const columns = [
        {name: 'Prop', key: 'prop'},
        {name: 'Type', key: 'type'},
        {name: 'Default', key: 'default'},
        {name: 'Values', key: 'values'},
        {name: 'Description', key: 'description'},

    ];

    const data = [
        {prop: 'size', type: 'string', default: 'md',values: 'sm | md | lg', description: 'Used to set desired size'},
        
    ];
    return <div>
        <Documentation currentPage={PAGE_NAME} title={`AvatarGroup`}
            description=''
        >
            {/* Component Hero */}
            <Documentation.ComponentHero codeUsage={code}>
                   <AccordionExample />
            </Documentation.ComponentHero>
            {/* Component Anatomy */}
            <Documentation.Anatomy code={anatomy.code}/>

            {/* <div className="max-w-screen-md mt-16">
                <Documentation.Table columns={columns} data={data} />
            </div> */}
              
            
        </Documentation>
    </div>
}

export default AccordionDocs;