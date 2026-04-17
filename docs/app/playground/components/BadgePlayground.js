'use client'

import ColorLooper from "../helpers/ColorLooper"
import Badge from "@radui/ui/Badge"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Badge"
            docsLink="/docs/components/badge"
            description="Variants, sizes, and semantic labels with current badge props."
        >
            <div className='flex flex-wrap items-center gap-2'>
                <Badge>Stable</Badge>
                <Badge variant="soft">Beta</Badge>
                <Badge variant="surface">Preview</Badge>
                <Badge variant="outline">Docs</Badge>
                <Badge variant="ghost">Ghost</Badge>
            </div>
            <div className='mt-4 flex flex-wrap items-center gap-2'>
                <Badge size="small">Small</Badge>
                <Badge size="medium">Medium</Badge>
                <Badge size="large">Large</Badge>
                <Badge size="x-large">XL</Badge>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
