const PAGE_NAME = 'ACCORDION_DOCS'


import Documentation from "@/components/layout/Documentation/Documentation"
import Accordion from "@radui/ui/Accordion"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)


import codeUsage from "./docs/codeUsage"


const AccordionDocs = () => {
    let items = [
        {
            title: "React",
            content: "React is a JavaScript library for building user interfaces."
        },
        {
            title: "Angular",
            content: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript."
        },
        {
            title: "Vue",
            content: "Vue.js is a progressive framework for building user interfaces."
        },


    ]
    return <div>
        <Documentation currentPage={PAGE_NAME} title={`Accordion`}
            description='Accordions are used to toggle the visibility of content. They are used in the sidebar, and in the chat.'
        >
            <Documentation.ComponentHero codeUsage={codeUsage}>
               <div style={{width:"400px"}}>
                    <Accordion items={items}>
                    </Accordion>
               </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AccordionDocs;