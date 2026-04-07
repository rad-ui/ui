"use client"

import Tabs from "@radui/ui/Tabs"
import { usePathname, useRouter } from "next/navigation"

const demoTabs = [
    {
        href: "/showcase/music-app",
        label: "Music App",
    },
    {
        href: "/showcase/preferences",
        label: "Preferences",
    },
    {
        href: "/showcase/product-page",
        label: "Product Page",
    },
    {
        href: "/showcase/messaging",
        label: "Messaging",
    },
    {
        href: "/showcase/inbox",
        label: "Inbox",
    },
    {
        href: "/showcase/dashboard",
        label: "Dashboard",
    },
]

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
            <Tabs.List className="inline-grid grid-cols-2 gap-1 rounded-[20px] border border-slate-500 bg-slate-200/70 p-1 backdrop-blur-xl sm:grid-cols-3 lg:grid-cols-6">
                {demoTabs.map((tab) => (
                    <Tabs.Trigger
                        key={tab.href}
                        value={tab.href}
                        className="group min-w-[132px] whitespace-nowrap rounded-[16px] border border-transparent bg-transparent px-4 py-2 text-left text-sm font-semibold tracking-[-0.01em] text-slate-1000/70 hover:bg-slate-1000/[0.04] hover:text-slate-1000 data-[state=active]:border-slate-400 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-1000"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <span>{tab.label}</span>
                            <span className="h-2 w-2 shrink-0 rounded-full bg-slate-500 group-data-[state=active]:bg-orange-800" />
                        </div>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
        </Tabs.Root>
    )
}

export default ShowcaseTabs
