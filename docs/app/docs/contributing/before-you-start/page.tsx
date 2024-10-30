

import Text from "@radui/ui/Text"
import Code from "@radui/ui/Code"
import Link from "@radui/ui/Link"


const PAGE_NAME = 'INSTALLATION'





import Documentation from "@/components/layout/Documentation/Documentation"


const Introduction = () => {
    return <Documentation currentPage={PAGE_NAME} title="Before you start">
         <Documentation.Section title="Prerequisites">
            <Text className="mb-2 text-gray-1000 font-light">
               Rad UI is built with React and TypeScript. If you are not familiar with TypeScript, we recommend you to first learn the basics of TypeScript and JavaScript. A primer on HTML and CSS is also recommended. It might be challenging to learn all of these at once, so we recommend you to first learn the basics of HTML, CSS, and JavaScript, and then learn TypeScript. If you up for a challenge and would like to pick these skills up along the way, that is also possible, but it might take quite a while.
            </Text>
            <Text className="mb-2 text-gray-1000 font-light">
                Once you are familiar with the basics of TypeScript, JavaScript, HTML, and CSS, you can start learning React. We recommend you to start with the official React tutorial. It is a great way to get familiar with React and its concepts. Once you are familiar with React, you can start using/contributing Rad UI.
            </Text>
         </Documentation.Section>

        <Documentation.Section title="Explore the Playground">
            <Text className="mb-2 text-gray-1000 font-light">
               Once your prerequisites are covered and you played around with the components in the <Link href="/playground">Playground</Link> and feel right at home, you can start contributing to Rad UI.
            </Text>

          
        </Documentation.Section>
    </Documentation>


}

export default Introduction