const PAGE_NAME = 'DISCLOSURE_DOCS'

import Documentation from "@/components/layout/Documentation/Documentation"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)
import DisclosureExample from "./docs/example"
import {code, anatomy, keyboardShortcuts} from "./docs/codeUsage"

const DisclosureDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title={`Disclosure`}
            description='Disclosure are used to show and hide the content. They are used to toggle sub-menus and to manage visibility of user comments and reviews.'
        >
            {/* Component Hero */}
            <Documentation.ComponentHero codeUsage={code}>
                   <DisclosureExample />
            </Documentation.ComponentHero>
            {/* Component Anatomy */}
            <Documentation.Anatomy code={anatomy.code}/>

            <Documentation.KeyboardShortcuts keyboardShortcuts={keyboardShortcuts}/>
        </Documentation>
    </div>
}

export default DisclosureDocs;