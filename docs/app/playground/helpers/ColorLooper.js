'use client'

import Heading from "@radui/ui/Heading"
import Link from "@radui/ui/Link"
import Text from "@radui/ui/Text"

const ColorLooper = ({ title = "", docsLink = "", description = "", controls, children }) => {
    return (
        <section className='border-t border-gray-300 py-10 first:border-t-0'>
            <div className='mb-7 flex flex-wrap items-start justify-between gap-4'>
                <div className='max-w-2xl space-y-1'>
                    <Heading className="text-gray-950" as="h2" size="large">{title}</Heading>
                    {description ? <Text className="text-gray-700" size="small">{description}</Text> : null}
                </div>
                {docsLink ? <Link href={docsLink}>View in docs</Link> : null}
            </div>
            {controls ? <div className='mb-6 flex flex-wrap items-center gap-2'>{controls}</div> : null}
            <div className='min-w-0'>{children}</div>
        </section>
    )
}

export default ColorLooper
