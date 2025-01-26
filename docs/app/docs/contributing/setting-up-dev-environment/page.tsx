import Text from "@radui/ui/Text"
import Link from "@radui/ui/Link"
import Code from "@radui/ui/Code"
import Em from "@radui/ui/Em"
import Strong from "@radui/ui/Strong"
import CodeWithCopy from "@/components/CodeWithCopy"

const PAGE_NAME = 'BEFORE_YOU_START'

import Documentation from "@/components/layout/Documentation/Documentation"


const SettingUpDevEnvironment = () => {
    return <Documentation currentPage={PAGE_NAME} title="Setting Up Dev Environment">
        <Documentation.Section title="Cloning the repository">
            <Text className="mb-4 text-gray-900 font-light">
                Follow these steps to set up your development environment:
            </Text>
            <ul className="list-disc pl-6 mb-4 text-gray-950 font-light">
                <li>
                    <Strong className="text-gray-1000">Fork the repository:</Strong> Create a fork of the <Link target="_blank" href="https://github.com/rad-ui/rad-ui">Rad UI repository</Link> to your GitHub account.
                </li>
                <li>
                    <Strong className="text-gray-1000">Clone the repository:</Strong> Clone your forked repository to your local machine.
                </li>
                <li>
                    <Strong className="text-gray-1000">Install dependencies:</Strong> Run <CodeWithCopy code={"npm install"} /> in the root directory. We use npm to maintain consistency in our dependencies.
                </li>
            </ul>
        </Documentation.Section>
        <Documentation.Section title="Understanding the code structure">
            <Text className="mb-4 text-gray-900 font-light">
                The project is organized into these main directories:
            </Text>
            <ul className="list-disc pl-6 mb-4 text-gray-950 font-light">
                <li>
                    <Strong className="text-gray-1000">docs:</Strong> Contains the documentation website built with Next.js and Tailwind CSS. You're currently reading content from this directory. Use global search to quickly locate specific documentation.
                </li>
                <li>
                    <Strong className="text-gray-1000">src:</Strong> Contains the core component library source code.
                </li>
                <li>
                    <Strong className="text-gray-1000">scripts:</Strong> Contains utility scripts for building and managing library assets.
                </li>
                <li>
                    <Strong className="text-gray-1000">styles:</Strong> Contains the production-ready component styles.
                </li>
            </ul>
            <Text className="mb-4 text-gray-1000 font-light">
                Take some time to explore the codebase and understand its structure. The organization is straightforward, making it easy to start contributing once you're familiar with it.
            </Text>
        </Documentation.Section>

        <Documentation.Section title="Running Storybook">
            <Text className="mb-4 text-gray-1000 font-light">
                We use Storybook for component development and testing. You can explore our existing components and work-in-progress features in the WIP section. Storybook is essential for developing and testing new components.
            </Text>
            <Text className="mb-4 text-gray-1000 font-light">
                To start Storybook, run <CodeWithCopy code={"npm run sb"} /> in the root directory.
            </Text>
        </Documentation.Section>

        <Documentation.Section title="Running the Documentation Website Dev Server">
            <Text className="mb-4 text-gray-1000 font-light">
                To work on the documentation website, you'll need to run the development server. This is necessary for updating existing documentation, adding new pages, or modifying components.
            </Text>
            <Text className="mb-4 text-gray-1000 font-light">
                First, navigate to the docs directory: <CodeWithCopy code={"cd docs"} /> 
            </Text>
            <Text className="mb-4 text-gray-1000 font-light">
                Then start the Next.js development server: <CodeWithCopy code={"npm run dev"} />
            </Text>
        </Documentation.Section>
    </Documentation>
}

export default SettingUpDevEnvironment