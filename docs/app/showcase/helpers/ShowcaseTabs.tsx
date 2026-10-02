"use client"

import Tabs from "@radui/ui/Tabs"
import { usePathname, useRouter } from "next/navigation"

import showcaseDemos from "../showcaseDemos"

const ShowcaseTabs = () => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <Tabs.Root
            value={pathname}
            activationMode="manual"
            onValueChange={(value) => {
                if (value !== pathname) {
                    router.push(value)
                }
            }}
            className="w-full"
        >
            <Tabs.List className="inline-grid grid-cols-2 gap-1 rounded-xl border border-gray-600 bg-gray-200/70 p-1 backdrop-blur-xl sm:grid-cols-3 lg:grid-cols-6">
                {showcaseDemos.map((tab) => (
                    <Tabs.Trigger
                        key={tab.href}
                        value={tab.href}
                        className="group min-w-[132px] whitespace-nowrap rounded-lg border border-transparent bg-transparent px-4 py-2 text-left text-sm font-semibold tracking-[-0.01em] text-gray-1000/70 hover:bg-gray-1000/[0.04] hover:text-gray-1000 data-[state=active]:border-gray-600 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-1000"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <span>{tab.label}</span>
                            <span className="h-2 w-2 shrink-0 rounded-full bg-gray-500 group-data-[state=active]:bg-green-800" />
                        </div>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
        </Tabs.Root>
    )
}

export default ShowcaseTabs
