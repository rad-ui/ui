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
            {/* The list keeps its natural width; on narrow screens it scrolls sideways instead of clipping. */}
            <div className="-mx-4 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
                <Tabs.List aria-label="Showcase demos" className="w-max!">
                    {showcaseDemos.map((tab) => (
                        <Tabs.Trigger
                            key={tab.href}
                            value={tab.href}
                            className="group gap-2 whitespace-nowrap px-3.5!"
                        >
                            <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-700 group-data-[state=active]:bg-green-800"
                            />
                            {tab.label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
            </div>
        </Tabs.Root>
    )
}

export default ShowcaseTabs
