'use client'

import Heading from "@radui/ui/Heading"
import Link from "@radui/ui/Link"
import Separator from "@radui/ui/Separator"
import Text from "@radui/ui/Text"

const ColorLooper = ({ title = "", docsLink = "", description = "", children }) => {
    return (
        <section className='rounded-3xl bg-gray-50 p-6 shadow-sm'>
            <div className='flex flex-wrap items-end justify-between gap-3'>
                <div className='space-y-1'>
                    <Heading className="text-gray-950" as="h2">{title}</Heading>
                    {description ? <Text className="text-gray-700">{description}</Text> : null}
                </div>
                {docsLink ? <Link href={docsLink}>Open docs</Link> : null}
            </div>
            <Separator className="mt-4" decorative />
            <div className='pt-4'>
                <div className='rounded-2xl border border-gray-200 bg-gray-50 p-5'>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default ColorLooper
