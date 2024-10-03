const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Em from "@radui/ui/Em"
import Text from "@radui/ui/Text"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Em' description={`
           Em is used to emphasize text.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='text-gray-900 bg-gray-50 rounded shadow-lg font-normal p-5 space-y-1'>
                    <Text>
                        I have a dream of a scene between the green hills.
                        <br />
                        <Em className="text-gray-1000">Clouds</Em> pull away and the sunlight's revealed.
                        <br />
                        People don't talk about keeping it <Em className="text-gray-1000">real</Em>.
                        <br />
                        <Em className="text-gray-1000">It's understood</Em> that they actually will.
                    </Text>
                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AvatarDocs;