const PAGE_NAME = 'ACCORDION_DOCS'

import Documentation from "@/components/layout/Documentation/Documentation"
import Accordion from "@radui/ui/Accordion"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)
import AccordionExample from "./docs/example_1"
import AccordionAnatomy from "./docs/accordion_anatomy"
import {code, anatomy, keyboardShortcuts} from "./docs/codeUsage"

const AccordionDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title={`Accordion`}
            description='Accordions are used to toggle the visibility of content. They are used in the sidebar, and in the chat.'
        >
            {/* Component Hero */}
            <Documentation.ComponentHero codeUsage={code}>
                   <AccordionExample />
            </Documentation.ComponentHero>
            {/* Component Anatomy */}
            <Documentation.Anatomy code={anatomy.code}/>

            <Documentation.KeyboardShortcuts keyboardShortcuts={keyboardShortcuts}/>
        </Documentation>
    </div>
}

export default AccordionDocs;