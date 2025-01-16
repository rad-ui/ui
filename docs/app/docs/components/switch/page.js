const PAGE_NAME = 'SWITCH_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"

import SwitchWrapper from "./SwitchWrapper";
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const SwitchDocs = () => {
    
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Switch' description={`
            Switch is used to toggle between two states on and off. You can commonly used in settings panel, forms and any other 
            place where a user needs to enable or disable feature.
            `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <SwitchWrapper />
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default SwitchDocs;