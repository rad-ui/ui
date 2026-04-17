'use client'

import ColorLooper from "../helpers/ColorLooper"
import BlockQuote from "@radui/ui/BlockQuote"
import Em from "@radui/ui/Em"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="BlockQuote"
            docsLink="/docs/components/blockquote"
            description="Supported size and variant combinations for longer content blocks."
            loop={false}
        >
            <div className='space-y-4'>
                <BlockQuote className="text-gray-1000">
                    Thoughtful defaults make design systems faster to adopt, but <Em>predictable APIs</Em> are what keep teams on them.
                </BlockQuote>
                <BlockQuote variant="soft" size="large">
                    Ship demos that show the happy path first, then layer on the color and sizing matrix once the base component is stable.
                </BlockQuote>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
