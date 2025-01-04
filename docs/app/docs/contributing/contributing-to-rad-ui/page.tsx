import Documentation from "@/components/layout/Documentation/Documentation"
import Text from "@radui/ui/Text"
import Link from "@radui/ui/Link"
import Code from "@radui/ui/Code"
import Button from "@radui/ui/Button"




const PAGE_NAME = 'CONTRIBUTING_TO_RAD_UI'


const ContributingToRadUI = () => {
    const SAMPLE_COMMIT_MESSAGE = '<description>'

    return <Documentation currentPage={PAGE_NAME} title="Contributing to Rad UI">
        <Documentation.Section title="Join the Discord">
            <Text className="text-gray-950">
                We have an active and a friendly community on Discord. Join us to get help, discuss ideas, and share your work.
            </Text>
            <Link target="_blank" href="https://discord.com/invite/nMaQfeEPNp">Join the Discord</Link>

        </Documentation.Section>
        <Documentation.Section title="1. Finding an issue to work on">
            <Text className="text-gray-950">
                Contributing to Rad UI is a great way to get involved in the project and help us improve the library.
            </Text>
            <Text className="text-gray-950 mt-4">
                We've triaged issues in our <Link target="_blank" href="https://github.com/rad-ui/rad-ui/issues">GitHub issues</Link> to make it easier to find an issue for contributors to work on.
            </Text>
            <Text className="text-gray-950 mt-4">
                If you're getting started, don't know where to start, <Link target="_blank" href="https://github.com/rad-ui/ui/contribute">Good First Issues</Link> are a great place to start.
            </Text>
            <Text className="text-gray-950 mt-4">
                Note: Before you start working on an issue, please make sure to comment on the issue to let others know that you're working on it. This helps avoid duplicate work and ensures that your changes are not conflicting with other changes. If you have any questions, please ask in the issue or on Discord. We'll be happy to help you get started and support you in any way we can.
            </Text>
        </Documentation.Section>
        <Documentation.Section title="2.  Create a New Branch">
            <Text className="text-gray-950">
                Create a new branch for your changes. You can name your branch with a very brief description of the changes you're making. You can prefix it with your name/GitHub username to make it easier to identify and avoid conflicts. For example: <Code>(yourname)/fix-issue-123</Code>
            </Text>
        </Documentation.Section>
        <Documentation.Section title="3. Make your changes and commit your work">
            <Text className="text-gray-950">
                Follow the issue description and make your changes.
            </Text>
            <Text className="text-gray-950">
                Commit your work with a clear message - you can use the following prefixes:
            </Text>
           <div className='space-y-4 mt-5'>
           <Text>
                For Fixes : <Code>git commit -m "Fix: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
            <Text>
                For Features : <Code>git commit -m "Feature: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
            <Text>
                For Documentation : <Code>git commit -m "Docs: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
            <Text>
                For Refactoring : <Code>git commit -m "Refactor: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
            <Text>
                For Chore : <Code>git commit -m "Chore: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
            <Text>  
                For Style : <Code>git commit -m "Style: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
            <Text>
                For Performance : <Code>git commit -m "Performance: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
            <Text>
                For Test : <Code>git commit -m "Test: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
            <Text>
                For CI : <Code>git commit -m "CI: {SAMPLE_COMMIT_MESSAGE}"</Code>
            </Text>
           </div>
        </Documentation.Section>

        <Documentation.Section title="4. Add tests if applicable">
            <Text className="text-gray-950">
                We have a comprehensive test suite for Rad UI. If you're adding new features or fixing bugs, please add tests for your changes where applicable. Writing good tests is a great way to ensure your changes are working as expected.
            </Text>
            <Text className="text-gray-950 mt-4">
                Verify your changes manually if tests are not applicable.
            </Text>
        </Documentation.Section>

        <Documentation.Section title="5. Raise a Pull Request">    
            <Text className="text-gray-950 mb-2">
                Raise a Pull Request to the main branch.
            </Text>
            <Text className="text-gray-950">
                Make sure to include a description of your changes and any relevant information.
            </Text>
            <Text className="text-gray-950">
                If you're fixing an issue, make sure to reference the issue number in the description. If you're adding a new feature, make sure to include a description of the feature and how it works. If your PR has a lot of visual changes, please include screenshots or a video demonstrating the changes or additions.
            </Text>
        </Documentation.Section>

       
    </Documentation>
}

export default ContributingToRadUI;