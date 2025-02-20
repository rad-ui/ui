const PAGE_NAME = 'AVATAR_GROUP_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)
import {code, anatomy} from "./docs/codeUsage"
import AvatarGroupExample from "./docs/example_1"

const AvatarGroupDocs = () => {
    const columns = [
        {name: 'Prop', key: 'prop'},
        {name: 'Type', key: 'type'},
        {name: 'Default', key: 'default'},
        {name: 'Values', key: 'values'},
        {name: 'Description', key: 'description'},

    ];

    const data = [
        {prop: 'size', type: 'string', default: 'md',values: 'sm | md | lg', description: 'Used to set desired size'},
        
    ];
    return <div>
        <Documentation currentPage={PAGE_NAME} title={`AvatarGroup`}
            description='AvatarGroup are used to toggle the visibility of content. They are used in the sidebar, and in the chat.'
        >
            {/* Component Hero */}
            <Documentation.ComponentHero codeUsage={code}>
                   <AvatarGroupExample/>
            </Documentation.ComponentHero>
            {/* Component Anatomy */}
            <Documentation.Anatomy code={anatomy.code}/>

            <div className="">
                <Documentation.Table columns={columns} data={data} />
            </div>
              
            
        </Documentation>
    </div>
}

export default AvatarGroupDocs;