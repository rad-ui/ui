const PAGE_NAME = 'TOOLTIP_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Tooltip from "@radui/ui/Tooltip";
import Text from "@radui/ui/Text"
import Card from "@radui/ui/Card"
import Callout from "@radui/ui/Callout"
import Strong from "@radui/ui/Strong"

import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Tooltip' description={`
            Tooltips are used to provide additional information about a component when the user hovers over it.
        `}>
           
            <Documentation.ComponentHero codeUsage={codeUsage}>
                
                    <Card className="bg-gray-50" style={{ display: "flex", gap: 20 }}>
                        <Tooltip content="Tooltip content">
                             <Text className="text-gray-950">Hello Tooltip. Hover Me!</Text>
                        </Tooltip>
                    </Card>

            </Documentation.ComponentHero>
            <Callout color="red" className="mb-8">
               <p> <Strong>Note: </Strong> Tooltips are not supposed to be interactable. If you require the content to be 
                interactable by your users, use a Popover instead.
               </p>
            </Callout>
        </Documentation>
    </div>
}

export default AvatarDocs;