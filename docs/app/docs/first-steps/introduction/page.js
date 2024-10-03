const PAGE_NAME = 'INTRODUCTION'

import Documentation from "@/components/layout/Documentation/Documentation"


import Text from "@radui/ui/Text"
import Heading from "@radui/ui/Heading"
import Link from "@radui/ui/Link"

import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)



const Introduction = () => {
    return <Documentation currentPage={PAGE_NAME} title="Introduction">
        <Documentation.Section title="What is Rad UI?">
            <Text className="mb-2 text-gray-1000 font-light">
                Welcome to Rad UI, a UI library built around design systems used in web, it is designed to speed up your development process by providing you with a set of components that you can use to build your web app - <strong className='font-bold italic text-gray-1000'>fast</strong>. In less than an hour, you can start to get a feel for the components and how they work.
            </Text>
        </Documentation.Section>


        <Documentation.Section title="Motivation">
            <Text className="mb-2 text-gray-1000 font-light">
                It started off as a hobby project and has slowly grown into a really high quality set of components that I use in my own projects {/** Post some links of sample projects created with Rad-UI */}. I hope you enjoy using it as much as I enjoyed building it.
            </Text>
            <Text className="mb-2 text-gray-1000 font-light">
                Rad-UI is inspired heavily from <Link href="https://www.radix-ui.com/" target="_blank">Radix UI</Link> , <Link href="https://floating-ui.com/" target="_blank">Floating UI</Link> , <Link href="https://ui.shadcn.com/" target="_blank">shadcn/ui</Link>,  Tailwind and some ideas from many other UI libraries. So you will notice some similarities in the components and might feel at home if you have used any of these libraries before.
            </Text>
            <Text className="mb-2 text-gray-1000 font-light">
                It is built using React  - for React based web applications. The components are well thought out and designed to be used in a variety of use cases. They are flexible to use and can be customized to suit your needs. They are unstyled by default - meaning they don't come with any styles, you can style them however you want - bring your scss, css, tailwind, styled-components, styled-jsx, emotion, whatever you want to the table and style them however you want.
            </Text>

            <Text className="mb-2 text-gray-1000 font-light">
                It is thought out to be design system first, you can base your components on your design system and use Rad-UI to build your web app.
            </Text>
        </Documentation.Section>
    </Documentation>


}

export default Introduction