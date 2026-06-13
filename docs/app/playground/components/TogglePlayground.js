'use client'

import { Bold, Italic } from "lucide-react"
import Toggle from "@radui/ui/Toggle"
import ColorLooper from "../helpers/ColorLooper"

const TogglePlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Toggle"
            docsLink="/docs/components/toggle"
            description="Pressable on/off control for formatting, filters, and simple state toggles."
        >
            <div className='flex flex-wrap gap-3'>
                <Toggle defaultPressed onPressedChange={() => {}}>
                    <Bold size={16} />
                    <span>Bold</span>
                </Toggle>
                <Toggle onPressedChange={() => {}}>
                    <Italic size={16} />
                    <span>Italic</span>
                </Toggle>
            </div>
        </ColorLooper>
    </div>
)

export default TogglePlayground
