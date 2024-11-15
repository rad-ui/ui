const PAGE_NAME = 'AVATAR_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Avatar from "@radui/ui/Avatar"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {

    const columns = [
        {name: 'Prop', key: 'prop'},
        {name: 'Type', key: 'type'},
        {name: 'Default', key: 'default'},
        {name: 'Description', key: 'description'},
    ];

    const data = [
        {prop: 'src', type: 'string', default: 'null', description: 'URL of the image to be displayed as the avatar.'},
        {prop: 'fallback', type: 'string', default: 'null', description: 'Text initials or placeholder displayed when the image fails to load or if no src is provided.'},
    ];


    return <div>
        <Documentation currentPage={PAGE_NAME} title='Avatar' description={`Avatars are used to represent a user or a brand. They are used in the header, sidebar, and in the chat.`}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div style={{display:"flex",gap:20}}>
                    <Avatar src="https://i.pravatar.cc/1000" fallback="GG" />
                    <Avatar fallback="RU" />
                    <Avatar fallback="AA" />
                </div>
            </Documentation.ComponentHero>
            <Documentation.ComponentFeatures features={[
                "Adds a fallback if the image is not available",
                // "Accepts a custom fallback",
                "SSR compatible",
            ]} >
            </Documentation.ComponentFeatures>
            <div className="max-w-screen-md">
                <Documentation.Table columns={columns} data={data} />
            </div>
        </Documentation>
    </div>
}

export default AvatarDocs;