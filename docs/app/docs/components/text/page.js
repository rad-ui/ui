const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"

import Text from '@radui/ui/Text'
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const TextDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Text' description={`
            Text is used to display customizable text content.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='text-gray-50 p-5 space-y-1'>
                    <Text>Lorem ipsum</Text>
                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default TextDocs;
