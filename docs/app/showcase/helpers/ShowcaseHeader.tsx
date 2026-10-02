"use client"

import { usePathname } from "next/navigation"

import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

import showcaseDemos, { getShowcaseDemo } from "../showcaseDemos"

const ShowcaseHeader = () => {
    const pathname = usePathname()
    const demo = getShowcaseDemo(pathname)
    const index = showcaseDemos.findIndex((item) => item.href === pathname)

    return (
        <div className="min-w-0">
            <Text className="mb-2 uppercase tracking-[0.35em] text-[11px]! text-gray-1000/60">
                Showcase
                {index >= 0 ? ` · ${String(index + 1).padStart(2, "0")}/${String(showcaseDemos.length).padStart(2, "0")}` : ""}
            </Text>
            <Heading as="h4" className="!text-gray-1000">
                {demo ? demo.title : "Demo Gallery"}
            </Heading>
            <Text className="mt-1 max-w-2xl text-base! text-gray-1000/60">
                {demo
                    ? demo.summary
                    : "Switch between multi-surface demos to preview how Rad UI handles very different product shapes from the same component foundation."}
            </Text>
            {demo ? (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <Text className="text-[11px]! uppercase tracking-[0.2em] text-gray-1000/60">
                        Uses
                    </Text>
                    {demo.components.map((component) => (
                        <span
                            key={component}
                            className="rounded-full border border-gray-600 bg-gray-1000/[0.04] px-2 py-0.5 text-[11px] font-medium text-gray-1000/70"
                        >
                            {component}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default ShowcaseHeader
