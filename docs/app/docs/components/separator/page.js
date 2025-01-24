const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Separator from "@radui/ui/Separator"
import Text from "@radui/ui/Text"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const SeparatorDocs = () => {
    const columns = [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ];

    const data = [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the separator', id: 'color'},
        {prop: 'orientation', type: 'horizontal | vertical', default: 'horizontal', description: 'orientation of the separator', id: 'orientation'},
    ];

    return <div>
        <Documentation currentPage={PAGE_NAME} title='Separator' description={`
              Separator is used to separate content.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='text-gray-1000 font-normal p-5 space-y-1'>
                    <div>
                        <Text>Welcome to Rad UI</Text>
                    </div>
                    <Separator />
                    <div className='flex'>
                        <Text>Modern</Text>
                        <Separator orientation="vertical" />
                        <Text>Accessible</Text>
                        <Separator orientation="vertical" />
                        <Text>Performant</Text>
                    </div>
                </div>
            </Documentation.ComponentHero>
            <div className="max-w-screen-md">
                <Documentation.Table columns={columns} data={data} />
            </div>
        </Documentation>
    </div>
}

export default SeparatorDocs;