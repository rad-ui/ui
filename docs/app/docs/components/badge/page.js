const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Badge from "@radui/ui/Badge"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Badge' description={`
            Badges are used to display a small amount of information. They are used in the sidebar, and in the chat.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div style={{ display: "flex", gap: 20 }}>
                    <Badge src="https://i.pravatar.cc/1000" fallback="GG" >Badge</Badge>
                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default AvatarDocs;