const PAGE_NAME = 'ACCORDION_DOCS'

import Documentation from "@/components/layout/Documentation/Documentation"
import Accordion from "@radui/ui/Accordion"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)
import AccordionExample from "./docs/example_1"
import codeUsage from "./docs/codeUsage"

const AccordionDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title={`Accordion`}
            description='Accordions are used to toggle the visibility of content. They are used in the sidebar, and in the chat.'
        >
            <Documentation.ComponentHero codeUsage={codeUsage}>
                   <AccordionExample />
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AccordionDocs;