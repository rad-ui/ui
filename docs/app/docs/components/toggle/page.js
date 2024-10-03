const PAGE_NAME = 'TOGGLE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"



import Card from "@radui/ui/Card"

import ToggleWrapper from "./ToggleWrapper"


import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Toggle' description={`
            Toggles are used to switch between two states. They are commonly used in settings, forms, and more.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                  <ToggleWrapper/>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AvatarDocs;