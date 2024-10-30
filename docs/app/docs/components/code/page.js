const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Code from "@radui/ui/Code"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const Arrow = () => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
}

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Code' description={`
           Code is used to display inline code.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='bg-gray-100 p-5 flex items-center rounded-md shadow'>
                    <Code className="space-x-2" style={{ margin: 0 }}>console.log('This is some code')</Code>
                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AvatarDocs;