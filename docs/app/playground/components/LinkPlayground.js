'use client'

import ColorLooper from "../helpers/ColorLooper"
import Link from "@radui/ui/Link"
import Text from "@radui/ui/Text"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            loop={false}
            title="Link"
            description="Links now include real destinations and size variants instead of placeholder anchors."
        >
            <div className='space-y-4'>
                <Text className="text-gray-950">
                    Pair inline links with supporting copy so users know what they are leaving for, like the{" "}
                    <Link href="/docs/components/button">button documentation</Link> or the{" "}
                    <Link href="/docs/components/badge" size="large">badge examples</Link>.
                </Text>
                <div className='flex flex-wrap items-center gap-4'>
                    <Link href="/docs/components/avatar" size="small">Small link</Link>
                    <Link href="/docs/components/text">Default link</Link>
                    <Link href="/docs/components/separator" size="large">Large link</Link>
                </div>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
