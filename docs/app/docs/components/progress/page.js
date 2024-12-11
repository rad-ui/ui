const PAGE_NAME = 'KBD_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import Progress from "@radui/ui/Progress"
import Card from "@radui/ui/Card"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const AvatarDocs = () => {
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

        </Documentation>
    </div>
}

export default AvatarDocs;