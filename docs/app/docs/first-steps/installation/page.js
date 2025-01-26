

import Text from "@radui/ui/Text"
import Heading from "@radui/ui/Heading"
import Link from "@radui/ui/Link"
import Code from "@radui/ui/Code"
import Copy from "@/components/Copy"
import CodeWithCopy from "@/components/CodeWithCopy"

const PAGE_NAME = 'INSTALLATION'
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)



import Documentation from "@/components/layout/Documentation/Documentation"


const Introduction = () => {
    return <Documentation currentPage={PAGE_NAME} title="Installation">
        <Documentation.Section title="First steps">
            <Text className="mb-4 text-gray-1000 font-light">
                It's super easy to get started with Rad UI. You can install it using npm or yarn.
            </Text>

            <Text className="my-2 font-medium">Using Yarn</Text>
            <CodeWithCopy code={`yarn add @radui/ui`} />
            
            <Text className="mt-4 mb-1 font-medium">Using npm</Text>
            <CodeWithCopy code={`npm install @radui/ui --save`} />
        </Documentation.Section>
    </Documentation>


}

export default Introduction