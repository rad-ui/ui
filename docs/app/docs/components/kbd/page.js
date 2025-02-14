const PAGE_NAME = 'KBD_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Kbd from "@radui/ui/Kbd"
import Card from "@radui/ui/Card"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Kbd' description={`
            Kbd is a component that can be used to display keyboard keys.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <Card className="flex items-center justify-center bg-gray-50 w-[80%]  h-24" >
                   <Kbd>Ctrl + C</Kbd>
                </Card>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AvatarDocs;