"use client"

import { usePathname } from "next/navigation"

import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

import { getShowcaseDemo } from "../showcaseDemos"

const ShowcaseHeader = () => {
    const pathname = usePathname()
    const demo = getShowcaseDemo(pathname)

    return (
        <header className="max-w-3xl">
            <Heading as="h1" className="text-[1.75rem]! leading-tight! tracking-[-0.02em]! text-gray-1000! sm:text-[2rem]!">
                {demo ? demo.title : "Showcase"}
            </Heading>
            <Text className="mt-2 text-[15px]! leading-relaxed! text-gray-950">
                {demo
                    ? demo.summary
                    : "Real product surfaces built entirely from Rad UI components."}
            </Text>
            {demo ? (
                <p className="mt-3 text-[13px] text-gray-900">
                    <span className="font-medium text-gray-950">Built with </span>
                    {demo.components.join(" · ")}
                </p>
            ) : null}
        </header>
    )
}

export default ShowcaseHeader
