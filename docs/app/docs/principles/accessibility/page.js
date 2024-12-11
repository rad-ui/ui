const PAGE_NAME = 'ACCESSIBILITY'

import Text from "@radui/ui/Text"
import Heading from "@radui/ui/Heading"
import Link from "@radui/ui/Link"
import Code from "@radui/ui/Code"


import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import Documentation from "@/components/layout/Documentation/Documentation"


const Accessibility = () => {
    return <Documentation currentPage={PAGE_NAME} title="Accessibility">
        <Text className="mb-2 text-gray-1000 font-light">
            Rad UI aims to bridge the gap between design and development. The components that are part of Rad UI are designed to be accessible by default. We have taken care of all the accessibility concerns so that you don't have to worry about it. It's tested on wide range of devices and screen readers. We are constantly working on improving the accessibility of Rad UI. If you find any accessibility issues, please create an issue on the repo <Link href="https://github.com/kotAPI/rad-ui/issues" target="_blank">Github repository</Link>.
        </Text>
        <Documentation.Section title="WAI-ARIA">
            <Text className="mt-4 mb-1 font-light">
                WAI-ARIA is a set of attributes that can be added to HTML elements to define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities. Rad UI follow the guidelines provided by WAI-ARIA and we constantly work on improving the accessibility of Rad UI.
            </Text>
        </Documentation.Section>
        <Documentation.Section title="Keyboard Navigation">
            <Text className="mt-4 mb-1 font-light">
                Rad UI components are fully keyboard accessible. You can use the tab key to navigate through the components. You can also use the arrow keys to navigate through the components. Currently in beta only a few are supported, but we'll be adding more as we go.
            </Text>
        </Documentation.Section>
        <Documentation.Section title="Bring your own styles">
            <Text className="mt-4 mb-1 font-light">
                Rad UI is designed to be fully customizable. You can bring your own styles and customize the components as you wish. We also designed Rad UI to be highly configurable. You can configure them and style your components via css, tailwind classes or even inline styles with javascript. You decide how you want to style your components. Although we do provide a  default theme that you can customize it the way you want.
            </Text>
        </Documentation.Section>
    </Documentation>


}

export default Accessibility