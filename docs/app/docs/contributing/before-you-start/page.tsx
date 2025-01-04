import Text from "@radui/ui/Text"
import Link from "@radui/ui/Link"


const PAGE_NAME = 'BEFORE_YOU_START'

import Documentation from "@/components/layout/Documentation/Documentation"

const Introduction = () => {
    return <Documentation currentPage={PAGE_NAME} title="Before You Start">
         <Documentation.Section title="Prerequisites">
            <Text className="mb-4 text-gray-1000 font-light">
               Rad UI is built with React and TypeScript. Before contributing, you should be familiar with:
            </Text>
            <ul className="list-disc pl-6 mb-4 text-gray-1000 font-light">
                <li className="mb-2">Basic HTML and CSS</li>
                <li className="mb-2">JavaScript fundamentals</li>
                <li className="mb-2">TypeScript basics</li>
                <li className="mb-2">React fundamentals</li>
            </ul>
            <Text className="mb-4 text-gray-1000 font-light">
                While it's possible to learn these technologies as you contribute, having a basic understanding beforehand will make your contribution journey much smoother.
            </Text>
         </Documentation.Section>

        <Documentation.Section title="Getting Started">
            <Text className="mb-4 text-gray-1000 font-light">
               Before submitting your first contribution, we recommend:
            </Text>
            <ul className="list-disc pl-6 mb-4 text-gray-1000 font-light">
                <li className="mb-2">Exploring our components in the <Link href="/playground">Playground</Link></li>
                <li className="mb-2">Reading through our component documentation</li>
                <li className="mb-2">Setting up a local development environment</li>
            </ul>
        </Documentation.Section>
    </Documentation>


}

export default Introduction