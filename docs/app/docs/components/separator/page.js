const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Separator from "@radui/ui/Separator"
import Text from "@radui/ui/Text"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Separator' description={`
              Separator is used to separate content.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='text-gray-50 font-normal p-5 space-y-1'>
                    <div>
                        <Text>Welcome to Rad UI</Text>
                    </div>
                    <Separator />
                    <div className='flex' style={{ height: "20px" }}>
                        <Text>Modern</Text>
                        <Separator orientation="vertical" />
                        <Text>Accessible</Text>
                        <Separator orientation="vertical" />
                        <Text>Performant</Text>
                    </div>
                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AvatarDocs;