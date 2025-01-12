const PAGE_NAME = 'ASPECT_RATIO_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import AspectRatio from "@radui/ui/AspectRatio"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AspectRatioDocs = () => {
    const columns = [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ];

    const data = [
        {prop: 'ratio', type: 'string', default: '1', description: 'Used to set desired ratio', id: 'ratio'},
        
    ];
    return <div>
        <Documentation currentPage={PAGE_NAME} title='Aspect Ratio' description={`
                    Aspect Ratio is used to set the desired ratio.
                `}>
                    <Documentation.ComponentHero codeUsage={codeUsage}>
                <div>
                     <AspectRatio ratio='16/9'>
                                <img
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    className="Image"
                                    src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-28802-346529.jpg&fm=jpg"
                                    alt="Landscape photograph"
                                />
                    </AspectRatio>
                </div>
            </Documentation.ComponentHero>
            <div className="max-w-screen-md">
                            <Documentation.Table columns={columns} data={data} />
                        </div>
                </Documentation>
      
    </div>
}

export default AspectRatioDocs;