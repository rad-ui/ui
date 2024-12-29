const PAGE_NAME = 'STRONG_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"

import Strong from '@radui/ui/Strong'
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const StrongDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Strong' description={`
            Strong is used to define text with strong importance in bold.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
            <div className='text-gray-1000'>
            This is a very <Strong >Strong</Strong> word
            </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default StrongDocs;
