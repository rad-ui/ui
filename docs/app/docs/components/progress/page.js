const PAGE_NAME = 'KBD_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Progress from "@radui/ui/Progress"
import Card from "@radui/ui/Card"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const ProgressDocs = () => {
    const columns = [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ];

    const data = [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the progress bar', id: 'color'},
    ];

    return <div>
        <Documentation currentPage={PAGE_NAME} title='Progress' description={`
            Progress component is used to show the progress of a task. It can be used to show the progress of a file upload, a download, a form submission, or any other task that requires progress to be shown.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <Card className="flex items-center justify-center bg-gray-50" style={{width:"600px",height:"120px"}}>
                   <div style={{width:"200px"}}>
                        <Progress value={90}  />
                   </div>
                </Card>
            </Documentation.ComponentHero>

            <div className="max-w-screen-md">
                <Documentation.Table columns={columns} data={data} />
            </div>
            
        </Documentation>
    </div>
}

export default ProgressDocs;