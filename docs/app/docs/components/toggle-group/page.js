const PAGE_NAME = 'TOGGLE_GROUP_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import ToggleGroupWrapper from "./ToggleGroupWrapper"

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='ToggleGroup' description={`
           ToggleGroup is a component that allows you to group multiple toggles together. Useful for when you want to allow users to select multiple options. For example, a user can select multiple filters for a search.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='text-gray-900 bg-gray-50 rounded shadow-lg font-normal p-5 space-y-1'>
                        <ToggleGroupWrapper/>
                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AvatarDocs;