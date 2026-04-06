'use client'

import { Info, TriangleAlert } from "lucide-react"
import Callout from "@radui/ui/Callout"
import ColorLooper from "../helpers/ColorLooper"

const CalloutPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Callout"
            docsLink="/docs/components/callout"
            description="Structured messaging blocks for status, guidance, and warnings."
        >
            <div className='space-y-4'>
                <Callout.Root>
                    <Callout.Icon>
                        <Info size={18} strokeWidth={2} />
                    </Callout.Icon>
                    <Callout.Text>
                        Playground examples are intentionally minimal so the component behavior stays obvious.
                    </Callout.Text>
                </Callout.Root>
                <Callout.Root variant="outline">
                    <Callout.Icon>
                        <TriangleAlert size={18} strokeWidth={2} />
                    </Callout.Icon>
                    <Callout.Text>
                        Keep dense copy short inside callouts or the page turns into documentation inside documentation.
                    </Callout.Text>
                </Callout.Root>
            </div>
        </ColorLooper>
    </div>
)

export default CalloutPlayground
