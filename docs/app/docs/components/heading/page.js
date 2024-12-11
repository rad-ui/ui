const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Heading from "@radui/ui/Heading"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Heading' description={`
            Headings are used to display titles and subtitles.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='text-gray-50 p-5 space-y-1'>
                    <Heading>Heading 1</Heading>
                    <Heading as="h2">Heading 2</Heading>
                    <Heading as="h3">Heading 3</Heading>
                    <Heading as="h4">Heading 4</Heading>
                    <Heading as="h5">Heading 5</Heading>
                    <Heading as="h6">Heading 6</Heading>
                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AvatarDocs;