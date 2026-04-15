"use client"

import Collapsible from "@radui/ui/Collapsible"

const CollapsibleExample = () => {
    return (
        <div className="flex flex-col gap-4 w-[320px]">
            <Collapsible.Root>
                <Collapsible.Trigger className="w-full flex justify-between items-center px-4 py-2 rounded-lg border font-medium cursor-pointer">
                    What is Rad UI?
                    <span>▾</span>
                </Collapsible.Trigger>
                <Collapsible.Content className="px-4 py-2 text-gray-700">
                    Rad UI is a headless component library for React. Build your own design system on top of accessible, unstyled primitives.
                </Collapsible.Content>
            </Collapsible.Root>
            <Collapsible.Root>
                <Collapsible.Trigger className="w-full flex justify-between items-center px-4 py-2 rounded-lg border font-medium cursor-pointer">
                    Is it accessible?
                    <span>▾</span>
                </Collapsible.Trigger>
                <Collapsible.Content className="px-4 py-2 text-gray-700">
                    Yes. All components follow WAI-ARIA patterns and support full keyboard navigation.
                </Collapsible.Content>
            </Collapsible.Root>
        </div>
    )
}

export default CollapsibleExample
