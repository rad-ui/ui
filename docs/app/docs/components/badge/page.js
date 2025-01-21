const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Badge from "@radui/ui/Badge"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const BadgeDocs = () => {
    const columns = [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ];

    const data = [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent color of the component', id: 'color'},
    ];
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Badge' description={`
            Badges are used to display a small amount of information. They are used in the sidebar, and in the chat.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div style={{ display: "flex", gap: 20 }}>
                    <Badge>Badge</Badge>
                </div>
            </Documentation.ComponentHero>

            
            <div className="max-w-screen-md">
                 <Documentation.Table columns={columns} data={data} />
            </div>
         
        </Documentation>
    </div>
}

export default BadgeDocs;